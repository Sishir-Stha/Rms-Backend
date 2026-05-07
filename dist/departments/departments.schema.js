"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.departmentByIdSchema = exports.departmentsFilterSchema = exports.createDepartmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createDepartmentSchema = joi_1.default.object({
    department_name: joi_1.default.string().required(),
    department_code: joi_1.default.string().required(),
    head_count: joi_1.default.number().integer().min(0).allow(null).default(0),
});
exports.departmentsFilterSchema = joi_1.default.object({
    department_name: joi_1.default.string().allow(null, '').default(''),
    department_code: joi_1.default.string().allow(null, '').default(''),
});
exports.departmentByIdSchema = joi_1.default.object({
    department_id: joi_1.default.number().integer().required(),
});
exports.updateDepartmentSchema = joi_1.default.object({
    department_name: joi_1.default.string().allow(null, '').default(''),
    department_code: joi_1.default.string().allow(null, '').default(''),
    head_count: joi_1.default.number().integer().min(0).allow(null).default(null),
});
//# sourceMappingURL=departments.schema.js.map