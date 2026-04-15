import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './device_requests.schema';
import {
    TcreateDeviceRequest,
    TfilterDeviceRequests,
    TupdateDeviceRequest,
    TmoveKanbanColumn,
    TapproveDeviceRequest,
} from '../types/device_requests.types';

export const createDeviceRequestValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TcreateDeviceRequest>(req.body, schemas.createDeviceRequestSchema)
        .then(() => next())
        .catch(next);

export const filterDeviceRequestsValidator = (req: Request, _res: Response, next: NextFunction) => {
    const payload = { ...req.query, ...req.body };
    return validate<TfilterDeviceRequests>(payload, schemas.filterDeviceRequestsSchema)
        .then((validated) => {
            req.body = validated;
            next();
        })
        .catch(next);
};

export const deviceRequestByIdValidator = (req: Request, _res: Response, next: NextFunction) => {
    const params = { request_id: Number(req.params.request_id) };
    return validate<{ request_id: number }>(params, schemas.deviceRequestByIdSchema)
        .then(() => next())
        .catch(next);
};

export const updateDeviceRequestValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateDeviceRequest>(req.body, schemas.updateDeviceRequestSchema)
        .then(() => next())
        .catch(next);

export const moveKanbanColumnValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TmoveKanbanColumn>(req.body, schemas.moveKanbanColumnSchema)
        .then(() => next())
        .catch(next);

export const approveDeviceRequestValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TapproveDeviceRequest>(req.body, schemas.approveDeviceRequestSchema)
        .then(() => next())
        .catch(next);

export const deleteDeviceRequestValidator = deviceRequestByIdValidator;
