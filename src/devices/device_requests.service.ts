import { pool } from '../utills/pool';

export const createDeviceRequest = async (
    requested_by  : number,
    department_id : number,
    device_type   : string,
    brand         : string,
    reason        : string,
    quantity      : number,
    priority      : string
): Promise<number | undefined> => {
    const result = await pool.query(
        `INSERT INTO public.device_requests
            (requested_by, department_id, device_type, brand, reason,
             quantity, priority, approval_status, kanban_column)
         VALUES ($1,$2,$3,$4,$5,$6,$7,'Requested','Requested')
         RETURNING request_id;`,
        [requested_by, department_id, device_type, brand, reason, quantity, priority]
    );
    return result.rows[0]?.request_id;
};

export const getDeviceRequests = async (
    approval_status: string,
    device_type    : string
): Promise<Record<string, unknown>[]> => {
    const result = await pool.query(
        `SELECT * FROM get_device_requests($1, $2);`,
        [approval_status, device_type]
    );
    return result.rows;
};

export const getDeviceRequestById = async (
    request_id: number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(
        `SELECT
            dr.request_id,
            dr.requested_by,
            u_req.user_name     AS requester_name,
            dr.department_id,
            d.department_name,
            dr.device_type,
            dr.brand,
            dr.reason,
            dr.quantity,
            dr.priority,
            dr.request_date,
            dr.approval_status,
            dr.approved_by,
            u_apr.user_name     AS approver_name,
            dr.approval_date,
            dr.kanban_column,
            dr.created_at,
            dr.updated_at
         FROM   public.device_requests dr
         JOIN   public.users       u_req ON u_req.user_id   = dr.requested_by
         JOIN   public.departments d     ON d.department_id = dr.department_id
         LEFT   JOIN public.users  u_apr ON u_apr.user_id   = dr.approved_by
         WHERE  dr.request_id = $1;`,
        [request_id]
    );
    return result.rows[0];
};

export const updateDeviceRequestById = async (
    request_id      : number,
    requested_by    : number | null,
    department_id   : number | null,
    device_type     : string | null,
    brand           : string | null,
    reason          : string | null,
    quantity        : number | null,
    priority        : string | null,
    request_date    : Date   | null,
    approval_status : string | null,
    approved_by     : number | null,
    approval_date   : Date   | null,
    kanban_column   : string | null
): Promise<boolean> => {
    const result = await pool.query(
        `SELECT update_device_request(
            $1::int,  $2::int,     $3::int,     $4::varchar,
            $5::varchar, $6::text, $7::int,     $8::varchar,
            $9::date, $10::varchar, $11::int,   $12::date, $13::varchar
         ) AS success;`,
        [
            request_id, requested_by, department_id, device_type,
            brand, reason, quantity, priority,
            request_date, approval_status, approved_by, approval_date, kanban_column,
        ]
    );
    return result.rows[0]?.success ?? false;
};

export const moveKanbanColumn = async (
    request_id   : number,
    kanban_column: string
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(
        `UPDATE public.device_requests
         SET    kanban_column = $2
         WHERE  request_id   = $1
         RETURNING *;`,
        [request_id, kanban_column]
    );
    return result.rows[0];
};

export const approveDeviceRequest = async (
    request_id     : number,
    approval_status: string,
    approved_by    : number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(
        `UPDATE public.device_requests
         SET
             approval_status = $2,
             approved_by     = $3,
             approval_date   = CURRENT_DATE
         WHERE request_id = $1
         RETURNING *;`,
        [request_id, approval_status, approved_by]
    );
    return result.rows[0];
};

export const deleteDeviceRequest = async (request_id: number): Promise<void> => {
    await pool.query(
        `DELETE FROM public.device_requests WHERE request_id = $1;`,
        [request_id]
    );
};
