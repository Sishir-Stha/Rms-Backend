import { Router } from 'express';
import * as dashboardEndpoints from './dashboard.controller';

export const dashboardRouter = Router();

dashboardRouter.get('/metrics', dashboardEndpoints.getDashboardMetrics);
