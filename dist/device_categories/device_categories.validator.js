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
exports.updateDeviceCategoryValidator = exports.deviceCategoryByIdValidator = exports.deviceCategoriesFilterValidator = exports.createDeviceCategoryValidator = void 0;
const validators_1 = require("../utills/validators");
const schemas = __importStar(require("./device_categories.schema"));
const createDeviceCategoryValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.createDeviceCategorySchema)
    .then(() => next())
    .catch(next);
exports.createDeviceCategoryValidator = createDeviceCategoryValidator;
const deviceCategoriesFilterValidator = (req, _res, next) => {
    return (0, validators_1.validate)(req.body, schemas.deviceCategoriesFilterSchema)
        .then(() => next())
        .catch(next);
};
exports.deviceCategoriesFilterValidator = deviceCategoriesFilterValidator;
const deviceCategoryByIdValidator = (req, _res, next) => {
    const params = { category_id: Number(req.params.category_id) };
    return (0, validators_1.validate)(params, schemas.deviceCategoryByIdSchema)
        .then(() => next())
        .catch(next);
};
exports.deviceCategoryByIdValidator = deviceCategoryByIdValidator;
const updateDeviceCategoryValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.updateDeviceCategorySchema)
    .then(() => next())
    .catch(next);
exports.updateDeviceCategoryValidator = updateDeviceCategoryValidator;
//# sourceMappingURL=device_categories.validator.js.map