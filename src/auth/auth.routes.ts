import { Router } from "express";
import { loginValidator } from "./auth.validator";
import { loginUser } from "./auth.controller";

export const authrouter = Router();

authrouter.post("/login",loginValidator,loginUser);
