import { Router } from 'express';
import * as validators from './device_requests.validator';
import * as controller from './device_requests.controller';

export const deviceRequestsRouter = Router();

deviceRequestsRouter.post(   '/',                          validators.createDeviceRequestValidator,  controller.createDeviceRequest);
deviceRequestsRouter.get(    '/',                          validators.filterDeviceRequestsValidator,  controller.getDeviceRequests);
deviceRequestsRouter.get(    '/:request_id',               validators.deviceRequestByIdValidator,     controller.getDeviceRequestById);
deviceRequestsRouter.put(    '/:request_id',               validators.updateDeviceRequestValidator,   controller.updateDeviceRequestById);
deviceRequestsRouter.delete( '/:request_id',               validators.deviceRequestByIdValidator,     controller.deleteDeviceRequest);
deviceRequestsRouter.patch(  '/:request_id/move',          validators.moveKanbanColumnValidator,      controller.moveKanbanColumn);
deviceRequestsRouter.patch(  '/:request_id/approve',       validators.approveDeviceRequestValidator,  controller.approveDeviceRequest);
