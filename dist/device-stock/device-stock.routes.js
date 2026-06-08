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
exports.deviceStockRouter = void 0;
const express_1 = require("express");
const validators = __importStar(require("./device-stock.validator"));
const controller = __importStar(require("./device-stock.controller"));
exports.deviceStockRouter = (0, express_1.Router)();
console.log('DEVICE STOCK ROUTES FILE LOADED');
exports.deviceStockRouter.get('/ping', (_req, res) => {
    res.json({ message: 'device stock ping working' });
});
exports.deviceStockRouter.post('/', validators.createDeviceStockValidator, controller.createDeviceStock);
exports.deviceStockRouter.get('/', validators.filterDeviceStocksValidator, controller.getDeviceStocks);
exports.deviceStockRouter.get('/:stock_id', validators.deviceStockByIdValidator, controller.getDeviceStockById);
exports.deviceStockRouter.put('/:stock_id', validators.updateDeviceStockValidator, controller.updateDeviceStockById);
exports.deviceStockRouter.delete('/:stock_id', validators.deleteDeviceStockValidator, controller.deleteDeviceStock);
exports.deviceStockRouter.patch('/:stock_id/status', validators.updateDeviceStockStatusValidator, controller.updateDeviceStockStatus);
exports.deviceStockRouter.patch('/:stock_id/transfer', validators.transferDeviceStockValidator, controller.transferDeviceStock);
//# sourceMappingURL=device-stock.routes.js.map