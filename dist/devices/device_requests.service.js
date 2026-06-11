"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceRequest = exports.approveDeviceRequest = exports.moveKanbanColumn = exports.updateDeviceRequestById = exports.getDeviceRequestById = exports.getDeviceRequests = exports.createDeviceRequest = void 0;
const pool_1 = require("../utills/pool");
const createDeviceRequest = async (requested_by, department_id, device_type, brand, reason, quantity, priority, requested_for) => {
    const result = await pool_1.pool.query(`INSERT INTO public.device_requests
            (requested_by, department_id, device_type, brand, reason,
             quantity, priority, approval_status,requested_for)
         VALUES ($1,$2,$3,$4,$5,$6,$7,'Requested',$8)
         RETURNING request_id;`, [requested_by, department_id, device_type, brand, reason, quantity, priority, requested_for]);
    return result.rows[0]?.request_id;
};
exports.createDeviceRequest = createDeviceRequest;
const getDeviceRequests = async (approval_status, device_type) => {
    const result = await pool_1.pool.query(`SELECT * FROM get_device_requests($1, $2);`, [approval_status, device_type]);
    return result.rows;
};
exports.getDeviceRequests = getDeviceRequests;
const getDeviceRequestById = async (request_id) => {
    const result = await pool_1.pool.query(`SELECT
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
            dr.created_at,
            dr.updated_at,
            dr.requested_for
         FROM   public.device_requests dr
         JOIN   public.users       u_req ON u_req.user_id   = dr.requested_by
         JOIN   public.departments d     ON d.department_id = dr.department_id
         LEFT   JOIN public.users  u_apr ON u_apr.user_id   = dr.approved_by
         WHERE  dr.request_id = $1;`, [request_id]);
    return result.rows[0];
};
exports.getDeviceRequestById = getDeviceRequestById;
const updateDeviceRequestById = async (request_id, requested_by, department_id, device_type, brand, reason, quantity, priority, request_date, approval_status, approved_by, approval_date, requested_for) => {
    const result = await pool_1.pool.query(`SELECT update_device_request(
            $1::int,  $2::int,     $3::int,     $4::varchar,
            $5::varchar, $6::text, $7::int,     $8::varchar,
            $9::date, $10::varchar, $11::int,   $12::date, $13::varchar
         ) AS success;`, [
        request_id, requested_by, department_id, device_type,
        brand, reason, quantity, priority,
        request_date, approval_status, approved_by, approval_date, requested_for
    ]);
    return result.rows[0]?.success ?? false;
};
exports.updateDeviceRequestById = updateDeviceRequestById;
const moveKanbanColumn = async (request_id, status) => {
    const result = await pool_1.pool.query(`UPDATE public.device_requests
         SET    approval_status = $2
         WHERE  request_id   = $1
         RETURNING *;`, [request_id, status]);
    return result.rows[0];
};
exports.moveKanbanColumn = moveKanbanColumn;
const approveDeviceRequest = async (request_id, approval_status, approved_by) => {
    const result = await pool_1.pool.query(`UPDATE public.device_requests
         SET
             approval_status = $2,
             approved_by     = $3,
             approval_date   = CURRENT_DATE
         WHERE request_id = $1
         RETURNING *;`, [request_id, approval_status, approved_by]);
    return result.rows[0];
};
exports.approveDeviceRequest = approveDeviceRequest;
const deleteDeviceRequest = async (request_id) => {
    await pool_1.pool.query(`DELETE FROM public.device_requests WHERE request_id = $1;`, [request_id]);
};
exports.deleteDeviceRequest = deleteDeviceRequest;
//# sourceMappingURL=device_requests.service.js.map