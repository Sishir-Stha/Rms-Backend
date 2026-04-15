import { Request, Response } from 'express';
import * as deviceRequestService from './device_requests.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const createDeviceRequest = async (req: Request, res: Response) => {
    try {
        const { requested_by, department_id, device_type, brand, reason, quantity, priority } = req.body;

        const request_id = await deviceRequestService.createDeviceRequest(
            requested_by, department_id, device_type, brand, reason, quantity, priority
        );

        if (!request_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create device request')({});
        }
        return successResponse(HttpStatus.CREATED)(res, 'Device request created successfully')({ request_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceRequests = async (req: Request, res: Response) => {
    try {
        const approval_status = (req.body.approval_status ?? req.query.approval_status ?? '') as string;
        const device_type     = (req.body.device_type     ?? req.query.device_type     ?? '') as string;

        const result = await deviceRequestService.getDeviceRequests(approval_status, device_type);
        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No device requests found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Device requests fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceRequestById = async (req: Request, res: Response) => {
    try {
        const request_id = Number(req.params.request_id);
        const result     = await deviceRequestService.getDeviceRequestById(request_id);
        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device request not found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Device request fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateDeviceRequestById = async (req: Request, res: Response) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing   = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device request not found')({});
        }

        const updateResult = await deviceRequestService.updateDeviceRequestById(
            request_id,
            req.body.requested_by    ?? null,
            req.body.department_id   ?? null,
            req.body.device_type     ?? null,
            req.body.brand           ?? null,
            req.body.reason          ?? null,
            req.body.quantity        ?? null,
            req.body.priority        ?? null,
            req.body.request_date    ?? null,
            req.body.approval_status ?? null,
            req.body.approved_by     ?? null,
            req.body.approval_date   ?? null,
            req.body.kanban_column   ?? null,
        );
        return successResponse(HttpStatus.OK)(res, 'Device request updated successfully')({ result: updateResult });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const moveKanbanColumn = async (req: Request, res: Response) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing   = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device request not found')({});
        }
        const result = await deviceRequestService.moveKanbanColumn(request_id, req.body.kanban_column);
        return successResponse(HttpStatus.OK)(res, 'Kanban column updated successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const approveDeviceRequest = async (req: Request, res: Response) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing   = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device request not found')({});
        }
        const result = await deviceRequestService.approveDeviceRequest(
            request_id,
            req.body.approval_status,
            req.body.approved_by,
        );
        const action = (req.body.approval_status as string).toLowerCase();
        return successResponse(HttpStatus.OK)(res, `Device request ${action} successfully`)({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const deleteDeviceRequest = async (req: Request, res: Response) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing   = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device request not found')({});
        }
        await deviceRequestService.deleteDeviceRequest(request_id);
        return successResponse(HttpStatus.OK)(res, 'Device request deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
