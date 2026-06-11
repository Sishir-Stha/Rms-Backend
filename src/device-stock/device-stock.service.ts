import { pool } from '../utills/pool';

export interface DeviceStock {
    stock_id: number;
    device_category_id: number;
    category_name?: string;

    device_code: string | null;
    issue: string | null;
    date: Date | null;

    origin_sector: string | null;
    origin_department: number;
    origin_department_name?: string;

    destination_sector: string | null;
    destination_department: number | null;
    destination_department_name?: string | null;

    device_quantity: number;
    status: 'IN' | 'OUT';

    created_by: number;
    created_by_name?: string;

    updated_by: number | null;
    updated_by_name?: string | null;

    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
}

export const createDeviceStock = async (
    device_category_id: number,
    device_code: string | null,
    issue: string | null,
    date: Date | null,
    origin_sector: string | null,
    origin_department: number,
    destination_sector: string | null,
    destination_department: number | null,
    device_quantity: number,
    status: 'IN' | 'OUT',
    created_by: number
): Promise<number | undefined> => {
    const result = await pool.query(
        `INSERT INTO public.device_stock
            (
                device_category_id,
                device_code,
                issue,
                date,
                origin_sector,
                origin_department,
                destination_sector,
                destination_department,
                device_quantity,
                status,
                created_by
            )
         VALUES
            ($1,$2,$3,COALESCE($4, CURRENT_DATE),$5,$6,$7,$8,$9,$10,$11)
         RETURNING stock_id;`,
        [
            device_category_id,
            device_code,
            issue,
            date,
            origin_sector,
            origin_department,
            destination_sector,
            destination_department,
            device_quantity,
            status,
            created_by
        ]
    );

    return result.rows[0]?.stock_id;
};

export const getDeviceStocks = async (
    status: string | null,
    device_category_id: number | null,
    origin_department: number | null,
    destination_department: number | null
): Promise<DeviceStock[]> => {
    const result = await pool.query(
        `SELECT
            ds.stock_id,
            ds.device_category_id,
            dc.category_name,

            ds.device_code,
            ds.issue,
            ds.date,

            ds.origin_sector,
            ds.origin_department,
            od.department_name AS origin_department_name,

            ds.destination_sector,
            ds.destination_department,
            dd.department_name AS destination_department_name,

            ds.device_quantity,
            ds.status

         FROM public.device_stock ds

         JOIN public.device_categories dc
              ON dc.category_id = ds.device_category_id

         JOIN public.departments od
              ON od.department_id = ds.origin_department

         LEFT JOIN public.departments dd
              ON dd.department_id = ds.destination_department

         WHERE ds.deleted_at IS NULL
           AND ($1::varchar IS NULL OR ds.status = $1)
           AND ($2::int IS NULL OR ds.device_category_id = $2)
           AND ($3::int IS NULL OR ds.origin_department = $3)
           AND ($4::int IS NULL OR ds.destination_department = $4)

         ORDER BY ds.stock_id DESC;`,
        [
            status,
            device_category_id,
            origin_department,
            destination_department
        ]
    );

    return result.rows;
};

export const getDeviceStockById = async (
    stock_id: number
): Promise<DeviceStock | undefined> => {
    const result = await pool.query(
        `SELECT
            ds.stock_id,
            ds.device_category_id,
            dc.category_name,

            ds.device_code,
            ds.issue,
            ds.date,

            ds.origin_sector,
            ds.origin_department,
            od.department_name AS origin_department_name,

            ds.destination_sector,
            ds.destination_department,
            dd.department_name AS destination_department_name,

            ds.device_quantity,
            ds.status,

            ds.created_by,
            cu.user_name AS created_by_name,

            ds.updated_by,
            uu.user_name AS updated_by_name,

            ds.created_at,
            ds.updated_at,
            ds.deleted_at

         FROM public.device_stock ds

         JOIN public.device_categories dc
              ON dc.category_id = ds.device_category_id

         JOIN public.departments od
              ON od.department_id = ds.origin_department

         LEFT JOIN public.departments dd
              ON dd.department_id = ds.destination_department

         JOIN public.users cu
              ON cu.user_id = ds.created_by

         LEFT JOIN public.users uu
              ON uu.user_id = ds.updated_by

         WHERE ds.stock_id = $1
           AND ds.deleted_at IS NULL;`,
        [stock_id]
    );

    return result.rows[0];
};

export const updateDeviceStockById = async (
    stock_id: number,
    device_category_id: number | null,
    device_code: string | null,
    issue: string | null,
    date: Date | null,
    origin_sector: string | null,
    origin_department: number | null,
    destination_sector: string | null,
    destination_department: number | null,
    device_quantity: number | null,
    status: 'IN' | 'OUT' | null,
    updated_by: number
): Promise<DeviceStock | undefined> => {
    const result = await pool.query(
        `UPDATE public.device_stock
         SET
            device_category_id = COALESCE($2, device_category_id),
            device_code = COALESCE($3, device_code),
            issue = COALESCE($4, issue),
            date = COALESCE($5, date),
            origin_sector = COALESCE($6, origin_sector),
            origin_department = COALESCE($7, origin_department),
            destination_sector = COALESCE($8, destination_sector),
            destination_department = COALESCE($9, destination_department),
            device_quantity = COALESCE($10, device_quantity),
            status = COALESCE($11, status),
            updated_by = $12,
            updated_at = CURRENT_TIMESTAMP
         WHERE stock_id = $1
           AND deleted_at IS NULL
         RETURNING *;`,
        [
            stock_id,
            device_category_id,
            device_code,
            issue,
            date,
            origin_sector,
            origin_department,
            destination_sector,
            destination_department,
            device_quantity,
            status,
            updated_by
        ]
    );

    return result.rows[0];
};

export const updateDeviceStockStatus = async (
    stock_id: number,
    status: 'IN' | 'OUT',
    updated_by: number
): Promise<DeviceStock | undefined> => {
    const result = await pool.query(
        `UPDATE public.device_stock
         SET
            status = $2,
            updated_by = $3,
            updated_at = CURRENT_TIMESTAMP
         WHERE stock_id = $1
           AND deleted_at IS NULL
         RETURNING *;`,
        [stock_id, status, updated_by]
    );

    return result.rows[0];
};

export const transferDeviceStock = async (
    stock_id: number,
    destination_sector: string | null,
    destination_department: number,
    updated_by: number
): Promise<DeviceStock | undefined> => {
    const result = await pool.query(
        `UPDATE public.device_stock
         SET
            destination_sector = $2,
            destination_department = $3,
            status = 'OUT',
            updated_by = $4,
            updated_at = CURRENT_TIMESTAMP
         WHERE stock_id = $1
           AND deleted_at IS NULL
         RETURNING *;`,
        [
            stock_id,
            destination_sector,
            destination_department,
            updated_by
        ]
    );

    return result.rows[0];
};

export const deleteDeviceStock = async (
    stock_id: number,
    updated_by: number
): Promise<boolean> => {
    const result = await pool.query(
        `UPDATE public.device_stock
         SET
            deleted_at = CURRENT_TIMESTAMP,
            updated_by = $2,
            updated_at = CURRENT_TIMESTAMP
         WHERE stock_id = $1
           AND deleted_at IS NULL
         RETURNING stock_id;`,
        [stock_id, updated_by]
    );

    return (result.rowCount ?? 0) > 0;
};