import { Request, Response } from 'express';
import * as vendorService from './vendors.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const createVendor = async (req: Request, res: Response) => {
    try {
        const { vendor_name, contact, phone, specialization, rating } = req.body;

        const vendor_id = await vendorService.createVendor(
            vendor_name,
            contact ?? null,
            phone ?? null,
            specialization ?? null,
            rating ?? null
        );

        if (!vendor_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create vendor')({});
        }
        return successResponse(HttpStatus.CREATED)(res, 'Vendor created successfully')({ vendor_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getVendors = async (req: Request, res: Response) => {
    try {
        const vendor_name    = (req.body.vendor_name    ?? req.query.vendor_name    ?? '') as string;
        const specialization = (req.body.specialization ?? req.query.specialization ?? '') as string;

        const result = await vendorService.getVendors(vendor_name, specialization);
        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No vendors found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Vendors fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateVendorById = async (req: Request, res: Response) => {
    try {
        const vendor_id = Number(req.params.vendor_id);
        const existing  = await vendorService.getVendorById(vendor_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Vendor not found')({});
        }

        const updateResult = await vendorService.updateVendorById(
            vendor_id,
            req.body.vendor_name ?? null,
            req.body.contact ?? null,
            req.body.phone ?? null,
            req.body.specialization ?? null,
            req.body.rating ?? null
        );
        return successResponse(HttpStatus.OK)(res, 'Vendor updated successfully')({ result: updateResult });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const deleteVendor = async (req: Request, res: Response) => {
    try {
        const vendor_id = Number(req.params.vendor_id);
        const existing  = await vendorService.getVendorById(vendor_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Vendor not found')({});
        }
        await vendorService.deleteVendor(vendor_id);
        return successResponse(HttpStatus.OK)(res, 'Vendor deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
