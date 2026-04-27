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
