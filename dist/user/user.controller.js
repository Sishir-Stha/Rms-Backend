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
exports.getUserById = exports.getAllUsers = exports.deleteUsers = exports.updateUsers = exports.insertUser = void 0;
const userService = __importStar(require("../user/user.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const insertUser = async (req, res) => {
    try {
        const { user_name, email, password, department_id, status, join_date } = req.body;
        const user = await userService.getUserByEmail(email);
        if (user) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Email already exists')({});
        }
        const result = await userService.createUser(user_name, email, password, department_id, status, join_date);
        if (result) {
            const response = {
                user_id: result.user_id,
                user_name: result.user_name
            };
            return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'User created successfully')({ response });
        }
        else {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.CONFLICT)(res, 'Validation error')({});
        }
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Server Error')({});
    }
};
exports.insertUser = insertUser;
const updateUsers = async (req, res) => {
    try {
        const { user_id, user_name, email, department_id, status } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'User Not Found')({});
        }
        const updated = await userService.updateUserById(user_id, user_name, department_id, status, email);
        if (!updated || updated.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'User updating failed');
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'User updated successfully')({ updated });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({});
    }
};
exports.updateUsers = updateUsers;
const deleteUsers = async (req, res) => {
    const { user_id } = req.body;
    try {
        const check = await userService.getUserById(user_id);
        if (!check) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'User Not Found')({});
        }
        const result = await userService.deleteUser(user_id);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Deleting user failed');
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'User deleted successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error' + error)({});
    }
};
exports.deleteUsers = deleteUsers;
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, "No user found")({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, "User List fetched successfully")({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({});
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user_id = Number(req.params.user_id);
        const result = await userService.getUserById(user_id);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, "User not found")({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, "User fetched successfully")({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({});
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=user.controller.js.map