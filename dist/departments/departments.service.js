"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartmentById = exports.getDepartmentById = exports.getDepartments = exports.createDepartment = void 0;
const pool_1 = require("../utills/pool");
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
const createDepartment = async (department_name, department_code, head_count) => {
    const result = await pool_1.pool.query(createDepartmentQuery, [department_name, department_code, head_count]);
    return result.rows[0]?.department_id;
};
exports.createDepartment = createDepartment;
const getDepartments = async (department_name, department_code) => {
    const result = await pool_1.pool.query(getDepartmentsQuery, [department_name, department_code]);
    return result.rows;
};
exports.getDepartments = getDepartments;
const getDepartmentById = async (department_id) => {
    const result = await pool_1.pool.query(getDepartmentByIdQuery, [department_id]);
    return result.rows[0];
};
exports.getDepartmentById = getDepartmentById;
const updateDepartmentById = async (department_id, department_name, department_code, head_count) => {
    const result = await pool_1.pool.query(updateDepartmentQuery, [department_id, department_name, department_code, head_count]);
    return result.rows[0]?.success ?? false;
};
exports.updateDepartmentById = updateDepartmentById;
const deleteDepartment = async (department_id) => {
    await pool_1.pool.query(deleteDepartmentQuery, [department_id]);
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=departments.service.js.map