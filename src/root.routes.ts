import { Router } from "express";
import { authrouter } from "./auth/auth.routes"
import { userRouter } from "./user/user.routes";
import { repairsRouter } from './repairs/repairs.routes';
import { deviceRequestsRouter } from './devices/device_requests.routes';

export const router = Router();


router.use("/auth", authrouter);
router.use("/users", userRouter);
router.use('/repairs', repairsRouter);
router.use('/device-requests', deviceRequestsRouter);
