import { Response, Request } from 'express';
import * as repairService from './repairs.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

// ── POST /repairs ─────────────────────────────────────────────────────────────
export const createRepair = async (req: Request, res: Response) => {
    try {
        const {
            device_name, category_id, serial_no, department_id,
            issue, notes, reported_by, vendor_id, priority, expected_completion,
        } = req.body;

        const repair_id = await repairService.createRepair(
            device_name, category_id, serial_no, department_id,
            issue, notes, reported_by, vendor_id, priority, expected_completion
        );

        if (!repair_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create repair')({});
        }
        return successResponse(HttpStatus.CREATED)(res, 'Repair created successfully')({ repair_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

// ── GET /repairs  (filters via query params) ──────────────────────────────────
export const getRepairs = async (req: Request, res: Response) => {
    try {
        // Accept filters from either query-string (?status=Open) or body — body wins if present
        const status      = (req.body.status      ?? req.query.status      ?? '') as string;
        const device_name = (req.body.device_name ?? req.query.device_name ?? '') as string;

        const result = await repairService.getRepairs(status, device_name);
        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No repairs found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Repairs fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

// ── GET /repairs/:repair_id ───────────────────────────────────────────────────
export const getRepairsById = async (req: Request, res: Response) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const result    = await repairService.getRepairsById(repair_id);
        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Repair not found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Repair fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

// ── PUT /repairs/:repair_id ───────────────────────────────────────────────────
export const updateRepairsById = async (req: Request, res: Response) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing  = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Repair not found')({});
        }

        const updateResult = await repairService.updateRepairsById(
            repair_id,
            req.body.device_name         ?? null,
            req.body.category_id         ?? null,
            req.body.serial_no           ?? null,
            req.body.department_id       ?? null,
            req.body.issue               ?? null,
            req.body.notes               ?? null,
            req.body.reported_by         ?? null,
            req.body.reported_date       ?? null,
            req.body.vendor_id           ?? null,
            req.body.status              ?? null,
            req.body.priority            ?? null,
            req.body.expected_completion ?? null,
            req.body.resolved_date       ?? null,
            req.body.cost                ?? null,
        );
        return successResponse(HttpStatus.OK)(res, 'Repair updated successfully')({ result: updateResult });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

// ── PATCH /repairs/:repair_id/move ────────────────────────────────────────────
export const updateKanbanColumn = async (req: Request, res: Response) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing  = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Repair not found')({});
        }
        const result = await repairService.updateKanbanColumn(repair_id, req.body.kanban_column);
        return successResponse(HttpStatus.OK)(res, 'Kanban column updated successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

// ── DELETE /repairs/:repair_id ────────────────────────────────────────────────
export const deleteRepair = async (req: Request, res: Response) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing  = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Repair not found')({});
        }
        await repairService.deleteRepair(repair_id);
        return successResponse(HttpStatus.OK)(res, 'Repair deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
