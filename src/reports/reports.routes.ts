import { Router } from "express";
import * as repairsEndpoint from './reports.controller';

export const reportsRouter = Router();

reportsRouter.get('/repairs',repairsEndpoint.getMonthlyRepairReport);
reportsRouter.get('/device',repairsEndpoint.getDepartmentRequestReport); 