"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRepair = exports.updateKanbanColumn = exports.updateRepairsById = exports.getRepairsById = exports.getRepairs = exports.createRepair = void 0;
const pool_1 = require("../utills/pool");
// ── CREATE ────────────────────────────────────────────────────────────────────
const createRepair = async (device_name, category_id, serial_no, department_id, issue, notes, reported_by, vendor_id, priority, expected_completion) => {
    const query = `
        INSERT INTO public.repairs (
            device_name, category_id, serial_no, department_id,
            issue, notes, reported_by, vendor_id, priority,
            expected_completion, status,  costs
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Open',0)
        RETURNING repair_id;
    `;
    const result = await pool_1.pool.query(query, [
        device_name, category_id, serial_no, department_id,
        issue, notes, reported_by, vendor_id, priority, expected_completion,
    ]);
    return result.rows[0]?.repair_id;
};
exports.createRepair = createRepair;
// ── GET WITH FILTERS (via DB function) ───────────────────────────────────────
const getRepairs = async (status, device_name) => {
    const result = await pool_1.pool.query(`SELECT * FROM get_repairs($1, $2);`, [status, device_name]);
    return result.rows;
};
exports.getRepairs = getRepairs;
// ── GET BY ID ─────────────────────────────────────────────────────────────────
const getRepairsById = async (repair_id) => {
    const result = await pool_1.pool.query(`SELECT * FROM repairs WHERE repair_id = $1;`, [repair_id]);
    return result.rows[0];
};
exports.getRepairsById = getRepairsById;
// ── UPDATE (via DB function update_repair) ────────────────────────────────────
const updateRepairsById = async (repair_id, device_name, category_id, serial_no, department_id, issue, notes, reported_by, reported_date, vendor_id, status, priority, expected_completion, resolved_date, cost) => {
    const result = await pool_1.pool.query(`SELECT update_repair(
            $1::int, $2::varchar, $3::int,  $4::varchar, $5::int,
            $6::text, $7::text,  $8::int,  $9::date,   $10::int,
            $11::varchar, $12::varchar, $13::date, $14::date, $15::numeric
        ) AS success;`, [
        repair_id, device_name, category_id, serial_no, department_id,
        issue, notes, reported_by, reported_date, vendor_id,
        status, priority, expected_completion, resolved_date, cost,
    ]);
    return result.rows[0]?.success ?? false;
};
exports.updateRepairsById = updateRepairsById;
// ── MOVE KANBAN COLUMN ────────────────────────────────────────────────────────
const updateKanbanColumn = async (repair_id, status) => {
    const result = await pool_1.pool.query(`UPDATE repairs SET status = $2 WHERE repair_id = $1 RETURNING *;`, [repair_id, status]);
    return result.rows[0];
};
exports.updateKanbanColumn = updateKanbanColumn;
// ── DELETE ────────────────────────────────────────────────────────────────────
const deleteRepair = async (repair_id) => {
    await pool_1.pool.query(`DELETE FROM repairs WHERE repair_id = $1;`, [repair_id]);
};
exports.deleteRepair = deleteRepair;
//# sourceMappingURL=repairs.service.js.map