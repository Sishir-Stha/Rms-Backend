"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (statusCode) => (res, message) => (data) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};
exports.successResponse = successResponse;
const errorResponse = (statusCode) => (res, message) => (data) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
        data: data
    });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=responseFormat.js.map