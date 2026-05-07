"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const pool_1 = require("../utills/pool");
const getDashboardMetricsQuery = `
    SELECT * FROM public.get_dashboard_metrics();
`;
const getDashboardMetrics = async () => {
    const result = await pool_1.pool.query(getDashboardMetricsQuery);
    return result.rows[0];
};
exports.getDashboardMetrics = getDashboardMetrics;
//# sourceMappingURL=dashboard.service.js.map