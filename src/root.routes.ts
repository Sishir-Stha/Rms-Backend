import { Router } from "express";
import { authrouter } from "./auth/auth.routes"
import { userRouter } from "./user/user.routes";
//import { repairRouter } from "./repairs/repairs.routes";

export const router = Router();


router.use("/auth",authrouter);
router.use("/users",userRouter);
//router.use("/repairs",repairRouter);
