"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceCategory = exports.updateDeviceCategoryById = exports.getDeviceCategoryById = exports.getDeviceCategories = exports.createDeviceCategory = void 0;
const pool_1 = require("../utills/pool");
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
const createDeviceCategory = async (category_name, description, device_count) => {
    const result = await pool_1.pool.query(createDeviceCategoryQuery, [category_name, description, device_count]);
    return result.rows[0]?.category_id;
};
exports.createDeviceCategory = createDeviceCategory;
const getDeviceCategories = async (category_name) => {
    const result = await pool_1.pool.query(getDeviceCategoriesQuery, [category_name]);
    return result.rows;
};
exports.getDeviceCategories = getDeviceCategories;
const getDeviceCategoryById = async (category_id) => {
    const result = await pool_1.pool.query(getDeviceCategoryByIdQuery, [category_id]);
    return result.rows[0];
};
exports.getDeviceCategoryById = getDeviceCategoryById;
const updateDeviceCategoryById = async (category_id, category_name, description, device_count) => {
    const result = await pool_1.pool.query(updateDeviceCategoryQuery, [category_id, category_name, description, device_count]);
    return result.rows[0]?.success ?? false;
};
exports.updateDeviceCategoryById = updateDeviceCategoryById;
const deleteDeviceCategory = async (category_id) => {
    await pool_1.pool.query(deleteDeviceCategoryQuery, [category_id]);
};
exports.deleteDeviceCategory = deleteDeviceCategory;
//# sourceMappingURL=device_categories.service.js.map