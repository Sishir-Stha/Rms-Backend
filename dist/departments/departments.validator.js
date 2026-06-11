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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentValidator = exports.departmentByIdValidator = exports.departmentsFilterValidator = exports.createDepartmentValidator = void 0;
const validators_1 = require("../utills/validators");
const schemas = __importStar(require("./departments.schema"));
const createDepartmentValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.createDepartmentSchema)
    .then(() => next())
    .catch(next);
exports.createDepartmentValidator = createDepartmentValidator;
const departmentsFilterValidator = (req, _res, next) => {
    return (0, validators_1.validate)(req.body, schemas.departmentsFilterSchema)
        .then(() => next())
        .catch(next);
};
exports.departmentsFilterValidator = departmentsFilterValidator;
const departmentByIdValidator = (req, _res, next) => {
    const params = { department_id: Number(req.params.department_id) };
    return (0, validators_1.validate)(params, schemas.departmentByIdSchema)
        .then(() => next())
        .catch(next);
};
exports.departmentByIdValidator = departmentByIdValidator;
const updateDepartmentValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.updateDepartmentSchema)
    .then(() => next())
    .catch(next);
exports.updateDepartmentValidator = updateDepartmentValidator;
//# sourceMappingURL=departments.validator.js.map