"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.updateVendorById = exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const pool_1 = require("../utills/pool");
const createVendorQuery = `
    INSERT INTO public.vendors
        (vendor_name, contact, phone, specialization, rating)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING vendor_id;
`;
const getVendorsQuery = `
   select * from get_vendors($1,$2);
`;
const getVendorByIdQuery = `
    SELECT * FROM public.vendors WHERE vendor_id = $1;
`;
const updateVendorQuery = `
    SELECT update_vendor(
        $1::int, $2::varchar, $3::varchar,
        $4::varchar, $5::varchar, $6::numeric
    ) AS success;
`;
const deleteVendorQuery = `
    DELETE FROM public.vendors WHERE vendor_id = $1;
`;
const createVendor = async (vendor_name, contact, phone, specialization, rating) => {
    const result = await pool_1.pool.query(createVendorQuery, [vendor_name, contact, phone, specialization, rating]);
    return result.rows[0]?.vendor_id;
};
exports.createVendor = createVendor;
const getVendors = async (vendor_name, specialization) => {
    const result = await pool_1.pool.query(getVendorsQuery, [vendor_name, specialization]);
    return result.rows;
};
exports.getVendors = getVendors;
const getVendorById = async (vendor_id) => {
    const result = await pool_1.pool.query(getVendorByIdQuery, [vendor_id]);
    return result.rows[0];
};
exports.getVendorById = getVendorById;
const updateVendorById = async (vendor_id, vendor_name, contact, phone, specialization, rating) => {
    const result = await pool_1.pool.query(updateVendorQuery, [vendor_id, vendor_name, contact, phone, specialization, rating]);
    return result.rows[0]?.success ?? false;
};
exports.updateVendorById = updateVendorById;
const deleteVendor = async (vendor_id) => {
    await pool_1.pool.query(deleteVendorQuery, [vendor_id]);
};
exports.deleteVendor = deleteVendor;
//# sourceMappingURL=vendors.service.js.map