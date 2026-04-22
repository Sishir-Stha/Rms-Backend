import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './vendors.schema';
import { TcreateVendor, TfilterVendors, TupdateVendor } from '../types/vendor.types';

export const createVendorValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TcreateVendor>(req.body, schemas.createVendorSchema)
        .then(() => next())
        .catch(next);

export const vendorsFilterValidator = (req: Request, _res: Response, next: NextFunction) => {
    const payload = { ...req.query, ...req.body };
    return validate<TfilterVendors>(payload, schemas.vendorsFilterSchema)
        .then((validated) => {
            req.body = validated;
            next();
        })
        .catch(next);
};

export const vendorByIdValidator = (req: Request, _res: Response, next: NextFunction) => {
    const params = { vendor_id: Number(req.params.vendor_id) };
    return validate<{ vendor_id: number }>(params, schemas.vendorByIdSchema)
        .then(() => next())
        .catch(next);
};

export const updateVendorValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateVendor>(req.body, schemas.updateVendorSchema)
        .then(() => next())
        .catch(next);
