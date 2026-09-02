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


export const getMonthlyDeviceSummary = async () => {
    const query = `
        SELECT 
            TO_CHAR(
                CASE 
                    WHEN dr.approval_status = 'Pending' THEN COALESCE(dr.recommended_date, dr.request_date)
                    WHEN dr.approval_status IN ('Approved', 'Rejected') THEN COALESCE(dr.approval_date, dr.request_date)
                    WHEN dr.approval_status = 'Fulfilled' THEN COALESCE(dr.fulfilled_date, dr.approval_date, dr.request_date)
                    ELSE dr.request_date
                END, 'YYYY-MM'
            ) as month,
            d.department_name,
            COUNT(CASE WHEN dr.approval_status = 'Approved' THEN 1 END) as "Approved",
            COUNT(CASE WHEN dr.approval_status = 'Pending' THEN 1 END) as "Pending",
            COUNT(CASE WHEN dr.approval_status = 'Rejected' THEN 1 END) as "Rejected",
            COUNT(CASE WHEN dr.approval_status = 'Fulfilled' THEN 1 END) as "Fulfilled"
        FROM public.device_requests dr
        JOIN public.departments d ON dr.department_id = d.department_id
        GROUP BY month, d.department_name
        ORDER BY month DESC, d.department_name;
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const getDeviceExpenses = async (month: string) => {
    const query = `
        SELECT 
            dr.request_id, 
            dr.request_id::text as id,
            dr.device_type, 
            dr.brand, 
            d.department_name,
            COALESCE(dr.expense_without_vat, 0) as expense_without_vat, 
            COALESCE(dr.expense_with_vat, 0) as expense_with_vat
        FROM public.device_requests dr
        JOIN public.departments d ON dr.department_id = d.department_id
        WHERE dr.approval_status = 'Fulfilled'
        AND TO_CHAR(COALESCE(dr.fulfilled_date, dr.approval_date, dr.request_date), 'YYYY-MM') = $1
        ORDER BY dr.request_id DESC;
    `;
    const result = await pool.query(query, [month]);
    return result.rows;
};

export const getMonthlyRepairsSummary = async () => {
    const query = `
        SELECT 
            TO_CHAR(
                CASE 
                    WHEN status IN ('Resolved', 'Closed') 
                    THEN COALESCE(resolved_date, request_date)
                    ELSE request_date
                END, 'YYYY-MM'
            ) as month,
            COUNT(CASE WHEN status = 'Open' THEN 1 END) as "Open",
            COUNT(CASE WHEN status = 'InProgress' THEN 1 END) as "InProgress",
            COUNT(CASE WHEN status = 'Resolved' THEN 1 END) as "Resolved",
            COUNT(CASE WHEN status = 'Closed' THEN 1 END) as "Closed"
        FROM public.repairs
        GROUP BY month
        ORDER BY month DESC;
    `;
    const result = await pool.query(query);
    
    return result.rows.map((row: any) => ({
        month: row.month,
        monthly_repair_summary: {
            Open: parseInt(row.Open || '0', 10),
            InProgress: parseInt(row.InProgress || '0', 10),
            Resolved: parseInt(row.Resolved || '0', 10),
            Closed: parseInt(row.Closed || '0', 10),
        }
    }));
};

export const getRepairCosts = async (month: string) => {
    const query = `
        SELECT 
            r.repair_id, 
            r.device_name, 
            d.department_name, 
            COALESCE(r.costs, 0) as cost
        FROM public.repairs r
        JOIN public.departments d ON r.department_id = d.department_id
        WHERE r.status IN ('Resolved', 'Closed')
        AND TO_CHAR(r.resolved_date, 'YYYY-MM') = $1
        ORDER BY r.resolved_date DESC;
    `;
    const result = await pool.query(query, [month]);
    return result.rows;
};

export const getDepartmentRepairsSummary = async () => {
    const query = `
        SELECT 
            TO_CHAR(
                CASE 
                    WHEN r.status IN ('Resolved', 'Closed') 
                    THEN COALESCE(r.resolved_date, r.created_at)
                    ELSE r.created_at
                END, 'YYYY-MM'
            ) as month,
            d.department_name,
            COUNT(CASE WHEN r.status = 'Open' THEN 1 END) as "Open",
            COUNT(CASE WHEN r.status = 'InProgress' THEN 1 END) as "InProgress",
            COUNT(CASE WHEN r.status = 'Resolved' THEN 1 END) as "Resolved",
            COUNT(CASE WHEN r.status = 'Closed' THEN 1 END) as "Closed"
        FROM public.repairs r
        JOIN public.departments d ON r.department_id = d.department_id
        GROUP BY month, d.department_name
        ORDER BY month DESC, d.department_name;
    `;
    const result = await pool.query(query);
    return result.rows;
};