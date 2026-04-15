import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './repairs.schema';
import { TfilterReports, TupdateKanbanColumn, TupdateRepairs, TcreateRepair } from '../types/repairs.types';

// ── POST /repairs ─────────────────────────────────────────────────────────────
export const createRepairValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TcreateRepair>(req.body, schemas.createRepairSchema)
        .then(() => next())
        .catch(next);

// ── GET /repairs  (merge query-string so ?status= and body both work) ──────────
export const repairsFilterValidator = (req: Request, _res: Response, next: NextFunction) => {
    const payload = { ...req.query, ...req.body };
    return validate<TfilterReports>(payload, schemas.repairsFilterSchema)
        .then((validated) => {
            req.body = validated;   // normalise: controller always reads req.body
            next();
        })
        .catch(next);
};

// ── GET|DELETE /repairs/:repair_id ────────────────────────────────────────────
export const repairByIdValidator = (req: Request, _res: Response, next: NextFunction) => {
    const params = { repair_id: Number(req.params.repair_id) };
    return validate<{ repair_id: number }>(params, schemas.repairByIdSchema)
        .then(() => next())
        .catch(next);
};

// ── PUT /repairs/:repair_id ───────────────────────────────────────────────────
export const updateRepairValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateRepairs>(req.body, schemas.updateRepairsSchema)
        .then(() => next())
        .catch(next);

// ── PATCH /repairs/:repair_id/move ────────────────────────────────────────────
export const updateKanbanColumnValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateKanbanColumn>(req.body, schemas.updateKanbanSchema)
        .then(() => next())
        .catch(next);