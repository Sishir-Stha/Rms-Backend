import { pool } from '../utills/pool';

const createDepartmentQuery = `
    INSERT INTO public.departments
        (department_name, department_code, head_count)
    VALUES ($1, $2, $3)
    RETURNING department_id;
`;

const getDepartmentsQuery = `
    SELECT * FROM get_departments($1, $2);
`;

const getDepartmentByIdQuery = `
    SELECT * FROM public.departments WHERE department_id = $1;
`;

const updateDepartmentQuery = `
    SELECT update_department(
        $1::int, $2::varchar, $3::varchar, $4::int
    ) AS success;
`;

const deleteDepartmentQuery = `
    DELETE FROM public.departments WHERE department_id = $1;
`;

export const createDepartment = async (
    department_name : string,
    department_code : string,
    head_count      : number | null
): Promise<number | undefined> => {
    const result = await pool.query(createDepartmentQuery, [department_name, department_code, head_count]);
    return result.rows[0]?.department_id;
};

export const getDepartments = async (
    department_name : string,
    department_code : string
): Promise<Record<string, unknown>[]> => {
    const result = await pool.query(getDepartmentsQuery, [department_name, department_code]);
    return result.rows;
};

export const getDepartmentById = async (
    department_id: number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(getDepartmentByIdQuery, [department_id]);
    return result.rows[0];
};

export const updateDepartmentById = async (
    department_id   : number,
    department_name : string | null,
    department_code : string | null,
    head_count      : number | null
): Promise<boolean> => {
    const result = await pool.query(updateDepartmentQuery, [department_id, department_name, department_code, head_count]);
    return result.rows[0]?.success ?? false;
};

export const deleteDepartment = async (department_id: number): Promise<void> => {
    await pool.query(deleteDepartmentQuery, [department_id]);
};
