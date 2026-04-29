import { pool } from "../utills/pool";
import * as types from "../types/reports.types";

const getRepairMonthlyReport = `
    SELECT * FROM fn_monthly_repair_summary();
`;

const getDeviceRequestReport = `
    SELECT * FROM fn_department_request_report();
`;

export const getMonthlyRepairReport = async (): Promise<types.RepairMonthlyReport[]> => {
    const result = await pool.query(getRepairMonthlyReport);
    return result.rows;
};

export const getDepartmentRequestReport = async (): Promise<types.DeviceRequestReport[]> => {
    const result = await pool.query(getDeviceRequestReport);
    return result.rows;
}