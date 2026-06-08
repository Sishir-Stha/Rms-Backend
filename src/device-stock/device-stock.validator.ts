import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './device-stock.schema';
import {
    TcreateDeviceStock,
    TfilterDeviceStocks,
    TupdateDeviceStock,
    TupdateDeviceStockStatus,
    TtransferDeviceStock,
    TdeleteDeviceStock,
} from '../types/device_stock.types';

export const createDeviceStockValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) =>
    validate<TcreateDeviceStock>(req.body, schemas.createDeviceStockSchema)
        .then(() => next())
        .catch(next);

export const filterDeviceStocksValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const payload = { ...req.query, ...req.body };

    return validate<TfilterDeviceStocks>(payload, schemas.filterDeviceStocksSchema)
        .then((validated) => {
            req.body = validated;
            next();
        })
        .catch(next);
};

export const deviceStockByIdValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const params = { stock_id: Number(req.params.stock_id) };

    return validate<{ stock_id: number }>(params, schemas.deviceStockByIdSchema)
        .then(() => next())
        .catch(next);
};

export const updateDeviceStockValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) =>
    validate<TupdateDeviceStock>(req.body, schemas.updateDeviceStockSchema)
        .then(() => next())
        .catch(next);

export const updateDeviceStockStatusValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) =>
    validate<TupdateDeviceStockStatus>(req.body, schemas.updateDeviceStockStatusSchema)
        .then(() => next())
        .catch(next);

export const transferDeviceStockValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) =>
    validate<TtransferDeviceStock>(req.body, schemas.transferDeviceStockSchema)
        .then(() => next())
        .catch(next);

export const deleteDeviceStockValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const payload = {
        stock_id: Number(req.params.stock_id),
        updated_by: Number(req.body.updated_by),
    };

    return validate<TdeleteDeviceStock>(payload, schemas.deleteDeviceStockSchema)
        .then((validated) => {
            req.body = validated;
            next();
        })
        .catch(next);
};