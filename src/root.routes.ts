import { Router } from "express";
import { authrouter } from "./auth/auth.routes"
import { userRouter } from "./user/user.routes";
import { repairsRouter } from './repairs/repairs.routes';
import { deviceRequestsRouter } from './devices/device_requests.routes';
import { vendorsRouter } from './vendors/vendors.routes';
import { departmentsRouter } from './departments/departments.routes';
import { deviceCategoriesRouter } from './device_categories/device_categories.routes';
import { dashboardRouter } from './dashboard/dashboard.routes';

export const router = Router();


router.use("/auth", authrouter);
router.use("/users", userRouter);
router.use('/repairs', repairsRouter);
router.use('/device-requests', deviceRequestsRouter);
router.use('/vendors', vendorsRouter);
router.use('/departments', departmentsRouter);
router.use('/device-categories', deviceCategoriesRouter);
router.use('/dashboard', dashboardRouter);
