"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeviceCategorySchema = exports.deviceCategoryByIdSchema = exports.deviceCategoriesFilterSchema = exports.createDeviceCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createDeviceCategorySchema = joi_1.default.object({
    category_name: joi_1.default.string().required(),
    description: joi_1.default.string().allow(null, '').default(''),
    device_count: joi_1.default.number().integer().min(0).allow(null).default(0),
});
exports.deviceCategoriesFilterSchema = joi_1.default.object({
    category_name: joi_1.default.string().allow(null, '').default(''),
});
exports.deviceCategoryByIdSchema = joi_1.default.object({
    category_id: joi_1.default.number().integer().required(),
});
exports.updateDeviceCategorySchema = joi_1.default.object({
    category_name: joi_1.default.string().allow(null, '').default(''),
    description: joi_1.default.string().allow(null, '').default(''),
    device_count: joi_1.default.number().integer().min(0).allow(null).default(null),
});
//# sourceMappingURL=device_categories.schema.js.map