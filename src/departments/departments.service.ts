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

export const departmentSql = {
    createDepartmentQuery,
    getDepartmentsFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.get_departments(
            p_department_name varchar DEFAULT '',
            p_department_code varchar DEFAULT ''
        )
        RETURNS TABLE (
            department_id integer,
            department_name varchar,
            department_code varchar,
            head_count integer
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT
                d.department_id,
                d.department_name,
                d.department_code,
                d.head_count
            FROM public.departments d
            WHERE
                (COALESCE(p_department_name, '') = '' OR d.department_name ILIKE '%' || p_department_name || '%')
                AND
                (COALESCE(p_department_code, '') = '' OR d.department_code ILIKE '%' || p_department_code || '%')
            ORDER BY d.department_id DESC;
        END;
        $$;
    `,
    getDepartmentsQuery,
    updateDepartmentFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.update_department(
            p_department_id integer,
            p_department_name varchar DEFAULT NULL,
            p_department_code varchar DEFAULT NULL,
            p_head_count integer DEFAULT NULL
        )
        RETURNS boolean
        LANGUAGE plpgsql
        AS $$
        DECLARE
            v_updated_rows INT;
        BEGIN
            UPDATE public.departments
            SET
                department_name = COALESCE(NULLIF(p_department_name, ''), department_name),
                department_code = COALESCE(NULLIF(p_department_code, ''), department_code),
                head_count      = COALESCE(p_head_count, head_count)
            WHERE department_id = p_department_id;

            GET DIAGNOSTICS v_updated_rows = ROW_COUNT;
            RETURN v_updated_rows > 0;
        END;
        $$;
    `,
    updateDepartmentQuery,
    deleteDepartmentQuery,
};

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
