import { Router } from 'express';
import * as departmentsValidators from './departments.validator';
import * as departmentsEndpoints from './departments.controller';

export const departmentsRouter = Router();

departmentsRouter.post('/', departmentsValidators.createDepartmentValidator, departmentsEndpoints.createDepartment);
departmentsRouter.post('/get', departmentsValidators.departmentsFilterValidator, departmentsEndpoints.getDepartments);
departmentsRouter.put('/:department_id', departmentsValidators.updateDepartmentValidator, departmentsEndpoints.updateDepartmentById);
departmentsRouter.delete('/:department_id', departmentsValidators.departmentByIdValidator, departmentsEndpoints.deleteDepartment);
