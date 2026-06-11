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
exports.loginUser = void 0;
const authService = __importStar(require("../user/user.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const departments_service_1 = require("../departments/departments.service");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.getUserByEmail(email);
        if (!user) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'User doesnt exists')({});
        }
        let pass = password;
        const department = await (0, departments_service_1.getDepartmentById)(user.department_id);
        const response = {
            user_id: user.user_id,
            username: user.user_name,
            "email": user.email,
            "department": department?.department_name || 'Error',
            "status": user.status
        };
        if (pass === user.password) {
            return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Login Sucessfully')({ response });
        }
        else {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Incorrect password')({});
        }
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.UNAUTHORIZED)(res, 'Server Error')({});
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map