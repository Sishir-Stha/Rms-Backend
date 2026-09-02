import { Router } from "express";
import * as repairsEndpoint from './reports.controller';

export const reportsRouter = Router();

reportsRouter.get('/repairs', repairsEndpoint.getMonthlyRepairReport);
reportsRouter.get('/device', repairsEndpoint.getDepartmentRequestReport); 

reportsRouter.get('/devices/summary', repairsEndpoint.getMonthlyDeviceSummary);
reportsRouter.get('/devices/expenses', repairsEndpoint.getDeviceExpenses);
reportsRouter.get('/repairs/summary', repairsEndpoint.getMonthlyRepairsSummary);
reportsRouter.get('/repairs/costs', repairsEndpoint.getRepairCosts);
reportsRouter.get('/repairs/department-summary', repairsEndpoint.getDepartmentRepairsSummary);
export default reportsRouter;