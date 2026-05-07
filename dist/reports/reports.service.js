"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentRequestReport = exports.getMonthlyRepairReport = void 0;
const pool_1 = require("../utills/pool");
const getRepairMonthlyReport = `
    SELECT * FROM fn_monthly_repair_summary();
`;
const getDeviceRequestReport = `
    SELECT * FROM fn_department_request_report();
`;
const getMonthlyRepairReport = async () => {
    const result = await pool_1.pool.query(getRepairMonthlyReport);
    return result.rows;
};
exports.getMonthlyRepairReport = getMonthlyRepairReport;
const getDepartmentRequestReport = async () => {
    const result = await pool_1.pool.query(getDeviceRequestReport);
    return result.rows;
};
exports.getDepartmentRequestReport = getDepartmentRequestReport;
//# sourceMappingURL=reports.service.js.map