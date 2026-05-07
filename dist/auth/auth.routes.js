"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authrouter = void 0;
const express_1 = require("express");
const auth_validator_1 = require("./auth.validator");
const auth_controller_1 = require("./auth.controller");
exports.authrouter = (0, express_1.Router)();
exports.authrouter.post("/login", auth_validator_1.loginValidator, auth_controller_1.loginUser);
//# sourceMappingURL=auth.routes.js.map