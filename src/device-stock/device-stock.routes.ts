import { Router } from 'express';
import * as validators from './device-stock.validator';
import * as controller from './device-stock.controller';

export const deviceStockRouter = Router();
console.log('DEVICE STOCK ROUTES FILE LOADED');

deviceStockRouter.get('/ping', (_req, res) => {
    res.json({ message: 'device stock ping working' });
});
deviceStockRouter.post(   '/',                     validators.createDeviceStockValidator,        controller.createDeviceStock);
deviceStockRouter.get(    '/',                     validators.filterDeviceStocksValidator,       controller.getDeviceStocks);
deviceStockRouter.get(    '/:stock_id',            validators.deviceStockByIdValidator,          controller.getDeviceStockById);
deviceStockRouter.put(    '/:stock_id',            validators.updateDeviceStockValidator,        controller.updateDeviceStockById);
deviceStockRouter.delete( '/:stock_id',            validators.deleteDeviceStockValidator,        controller.deleteDeviceStock);
deviceStockRouter.patch(  '/:stock_id/status',     validators.updateDeviceStockStatusValidator,  controller.updateDeviceStockStatus);
deviceStockRouter.patch(  '/:stock_id/transfer',   validators.transferDeviceStockValidator,      controller.transferDeviceStock);