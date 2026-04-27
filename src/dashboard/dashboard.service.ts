import { pool } from '../utills/pool';
import { DashboardMetrics } from '../types/dashboard.types';

const getDashboardMetricsQuery = `
    SELECT * FROM public.get_dashboard_metrics();
`;

export const getDashboardMetrics = async (): Promise<DashboardMetrics | undefined> => {
    const result = await pool.query(getDashboardMetricsQuery);
    return result.rows[0];
};