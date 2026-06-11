"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartmentById = exports.getDepartments = exports.createDepartment = void 0;
const departmentService = __importStar(require("./departments.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDepartment = async (req, res) => {
    try {
        const { department_name, department_code, head_count } = req.body;
        const department_id = await departmentService.createDepartment(department_name, department_code, head_count ?? null);
        if (!department_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create department')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Department created successfully')({ department_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createDepartment = createDepartment;
const getDepartments = async (req, res) => {
    try {
        const department_name = (req.body.department_name ?? req.query.department_name ?? '');
        const department_code = (req.body.department_code ?? req.query.department_code ?? '');
        const result = await departmentService.getDepartments(department_name, department_code);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No departments found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Departments fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDepartments = getDepartments;
const updateDepartmentById = async (req, res) => {
    try {
        const department_id = Number(req.params.department_id);
        const existing = await departmentService.getDepartmentById(department_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Department not found')({});
        }
        const updateResult = await departmentService.updateDepartmentById(department_id, req.body.department_name ?? null, req.body.department_code ?? null, req.body.head_count ?? null);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Department updated successfully')({ result: updateResult });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateDepartmentById = updateDepartmentById;
const deleteDepartment = async (req, res) => {
    try {
        const department_id = Number(req.params.department_id);
        const existing = await departmentService.getDepartmentById(department_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Department not found')({});
        }
        await departmentService.deleteDepartment(department_id);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Department deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=departments.controller.js.map