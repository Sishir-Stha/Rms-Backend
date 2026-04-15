import { Router } from "express";
import * as repairsValidators from "./repairs.validator";
import * as repairsEndpoints from "./repairs.controller"

export const repairsRouter = Router();

repairsRouter.post('/',repairsValidators.createRepairValidator,repairsEndpoints.createRepair);
repairsRouter.get('/',repairsValidators.repairsFilterValidator,repairsEndpoints.getRepairs);
repairsRouter.get('/:repair_id',repairsValidators.repairByIdValidator,repairsEndpoints.getRepairsById);
repairsRouter.put('/:repair_id',repairsValidators.updateRepairValidator,repairsEndpoints.updateRepairsById);
repairsRouter.patch('/:repair_id/move',repairsValidators.updateKanbanColumnValidator,repairsEndpoints.updateKanbanColumn);
repairsRouter.delete('/:repair_id',repairsValidators.repairByIdValidator,repairsEndpoints.deleteRepair);