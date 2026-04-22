import { Request, Response } from 'express';
import * as departmentService from './departments.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const createDepartment = async (req: Request, res: Response) => {
    try {
        const { department_name, department_code, head_count } = req.body;

        const department_id = await departmentService.createDepartment(
            department_name,
            department_code,
            head_count ?? null
        );

        if (!department_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create department')({});
        }
        return successResponse(HttpStatus.CREATED)(res, 'Department created successfully')({ department_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDepartments = async (req: Request, res: Response) => {
    try {
        const department_name = (req.body.department_name ?? req.query.department_name ?? '') as string;
        const department_code = (req.body.department_code ?? req.query.department_code ?? '') as string;

        const result = await departmentService.getDepartments(department_name, department_code);
        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No departments found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Departments fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateDepartmentById = async (req: Request, res: Response) => {
    try {
        const department_id = Number(req.params.department_id);
        const existing      = await departmentService.getDepartmentById(department_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Department not found')({});
        }

        const updateResult = await departmentService.updateDepartmentById(
            department_id,
            req.body.department_name ?? null,
            req.body.department_code ?? null,
            req.body.head_count ?? null
        );
        return successResponse(HttpStatus.OK)(res, 'Department updated successfully')({ result: updateResult });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const deleteDepartment = async (req: Request, res: Response) => {
    try {
        const department_id = Number(req.params.department_id);
        const existing      = await departmentService.getDepartmentById(department_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Department not found')({});
        }
        await departmentService.deleteDepartment(department_id);
        return successResponse(HttpStatus.OK)(res, 'Department deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
