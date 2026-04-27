import { Router } from 'express';
import * as vendorsValidators from './vendors.validator';
import * as vendorsEndpoints from './vendors.controller';

export const vendorsRouter = Router();

vendorsRouter.post('/', vendorsValidators.createVendorValidator, vendorsEndpoints.createVendor);
vendorsRouter.get('/', vendorsValidators.vendorsFilterValidator, vendorsEndpoints.getVendors);
vendorsRouter.put('/:vendor_id', vendorsValidators.updateVendorValidator, vendorsEndpoints.updateVendorById);
vendorsRouter.delete('/:vendor_id', vendorsValidators.vendorByIdValidator, vendorsEndpoints.deleteVendor);
