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
exports.updateVendorValidator = exports.vendorByIdValidator = exports.vendorsFilterValidator = exports.createVendorValidator = void 0;
const validators_1 = require("../utills/validators");
const schemas = __importStar(require("./vendors.schema"));
const createVendorValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.createVendorSchema)
    .then(() => next())
    .catch(next);
exports.createVendorValidator = createVendorValidator;
const vendorsFilterValidator = (req, _res, next) => {
    const payload = { ...req.query, ...req.body };
    return (0, validators_1.validate)(payload, schemas.vendorsFilterSchema)
        .then((validated) => {
        req.body = validated;
        next();
    })
        .catch(next);
};
exports.vendorsFilterValidator = vendorsFilterValidator;
const vendorByIdValidator = (req, _res, next) => {
    const params = { vendor_id: Number(req.params.vendor_id) };
    return (0, validators_1.validate)(params, schemas.vendorByIdSchema)
        .then(() => next())
        .catch(next);
};
exports.vendorByIdValidator = vendorByIdValidator;
const updateVendorValidator = (req, _res, next) => (0, validators_1.validate)(req.body, schemas.updateVendorSchema)
    .then(() => next())
    .catch(next);
exports.updateVendorValidator = updateVendorValidator;
//# sourceMappingURL=vendors.validator.js.map