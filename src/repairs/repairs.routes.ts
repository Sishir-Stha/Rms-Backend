import { Router } from "express";
import * as repairsValidators from "./repairs.validator";
import * as repairsEndpoints from "./repairs.controller"

export const repairsRouter = Router();

repairsRouter.get('/',repairsValidators.repairsFilterValidator,repairsEndpoints.getRepairs);
