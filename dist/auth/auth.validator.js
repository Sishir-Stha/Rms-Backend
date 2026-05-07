"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const validators_1 = require("../utills/validators");
const auth_schema_1 = require("./auth.schema");
const loginValidator = (req, res, next) => {
    return (0, validators_1.validate)(req.body, auth_schema_1.loginSchema)
        .then(() => next())
        .catch((err) => next(err));
};
exports.loginValidator = loginValidator;
//# sourceMappingURL=auth.validator.js.map