import { pool } from '../utills/pool';

const createDeviceCategoryQuery = `
    INSERT INTO public.device_categories
        (category_name, description, device_count)
    VALUES ($1, $2, $3)
    RETURNING category_id;
`;

const getDeviceCategoriesQuery = `
    SELECT * FROM get_device_categories($1);
`;

const getDeviceCategoryByIdQuery = `
    SELECT * FROM public.device_categories WHERE category_id = $1;
`;

const updateDeviceCategoryQuery = `
    SELECT update_device_category(
        $1::int, $2::varchar, $3::text, $4::int
    ) AS success;
`;

const deleteDeviceCategoryQuery = `
    DELETE FROM public.device_categories WHERE category_id = $1;
`;

export const deviceCategorySql = {
    createDeviceCategoryQuery,
    getDeviceCategoriesFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.get_device_categories(
            p_category_name varchar DEFAULT ''
        )
        RETURNS TABLE (
            category_id integer,
            category_name varchar,
            description text,
            device_count integer
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT
                dc.category_id,
                dc.category_name,
                dc.description,
                dc.device_count
            FROM public.device_categories dc
            WHERE
                (COALESCE(p_category_name, '') = '' OR dc.category_name ILIKE '%' || p_category_name || '%')
            ORDER BY dc.category_id DESC;
        END;
        $$;
    `,
    getDeviceCategoriesQuery,
    updateDeviceCategoryFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.update_device_category(
            p_category_id integer,
            p_category_name varchar DEFAULT NULL,
            p_description text DEFAULT NULL,
            p_device_count integer DEFAULT NULL
        )
        RETURNS boolean
        LANGUAGE plpgsql
        AS $$
        DECLARE
            v_updated_rows INT;
        BEGIN
            UPDATE public.device_categories
            SET
                category_name = COALESCE(NULLIF(p_category_name, ''), category_name),
                description   = COALESCE(NULLIF(p_description, ''), description),
                device_count  = COALESCE(p_device_count, device_count)
            WHERE category_id = p_category_id;

            GET DIAGNOSTICS v_updated_rows = ROW_COUNT;
            RETURN v_updated_rows > 0;
        END;
        $$;
    `,
    updateDeviceCategoryQuery,
    deleteDeviceCategoryQuery,
};

export const createDeviceCategory = async (
    category_name : string,
    description   : string | null,
    device_count  : number | null
): Promise<number | undefined> => {
    const result = await pool.query(createDeviceCategoryQuery, [category_name, description, device_count]);
    return result.rows[0]?.category_id;
};

export const getDeviceCategories = async (
    category_name: string
): Promise<Record<string, unknown>[]> => {
    const result = await pool.query(getDeviceCategoriesQuery, [category_name]);
    return result.rows;
};

export const getDeviceCategoryById = async (
    category_id: number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(getDeviceCategoryByIdQuery, [category_id]);
    return result.rows[0];
};

export const updateDeviceCategoryById = async (
    category_id    : number,
    category_name  : string | null,
    description    : string | null,
    device_count   : number | null
): Promise<boolean> => {
    const result = await pool.query(updateDeviceCategoryQuery, [category_id, category_name, description, device_count]);
    return result.rows[0]?.success ?? false;
};

export const deleteDeviceCategory = async (category_id: number): Promise<void> => {
    await pool.query(deleteDeviceCategoryQuery, [category_id]);
};
