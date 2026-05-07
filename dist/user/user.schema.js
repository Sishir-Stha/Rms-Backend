"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userByIdSchema = exports.updateUserSchema = exports.insertUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.insertUserSchema = joi_1.default.object({
    user_name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
    department_id: joi_1.default.number().required(),
    status: joi_1.default.string().required(),
    join_date: joi_1.default.date().required()
});
exports.updateUserSchema = joi_1.default.object({
    user_id: joi_1.default.number().required(),
    user_name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    department_id: joi_1.default.number().required(),
    status: joi_1.default.string().required(),
});
exports.userByIdSchema = joi_1.default.object({
    user_id: joi_1.default.number().integer().required(),
});
//# sourceMappingURL=user.schema.js.map