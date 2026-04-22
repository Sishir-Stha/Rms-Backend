import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './departments.schema';
import { TcreateDepartment, TfilterDepartments, TupdateDepartment } from '../types/department.types';

export const createDepartmentValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TcreateDepartment>(req.body, schemas.createDepartmentSchema)
        .then(() => next())
        .catch(next);

export const departmentsFilterValidator = (req: Request, _res: Response, next: NextFunction) => {
    const payload = { ...req.query, ...req.body };
    return validate<TfilterDepartments>(payload, schemas.departmentsFilterSchema)
        .then((validated) => {
            req.body = validated;
            next();
        })
        .catch(next);
};

export const departmentByIdValidator = (req: Request, _res: Response, next: NextFunction) => {
    const params = { department_id: Number(req.params.department_id) };
    return validate<{ department_id: number }>(params, schemas.departmentByIdSchema)
        .then(() => next())
        .catch(next);
};

export const updateDepartmentValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateDepartment>(req.body, schemas.updateDepartmentSchema)
        .then(() => next())
        .catch(next);
