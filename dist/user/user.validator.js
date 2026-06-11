"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserByIdValidator = exports.UpdateUserValidator = exports.InsertUserValidator = void 0;
const validators_1 = require("../utills/validators");
const user_schema_1 = require("./user.schema");
const InsertUserValidator = (req, res, next) => {
    return (0, validators_1.validate)(req.body, user_schema_1.insertUserSchema)
        .then(() => next())
        .catch((err) => next(err));
};
exports.InsertUserValidator = InsertUserValidator;
const UpdateUserValidator = (req, res, next) => {
    return (0, validators_1.validate)(req.body, user_schema_1.updateUserSchema)
        .then(() => next())
        .catch((err) => next(err));
};
exports.UpdateUserValidator = UpdateUserValidator;
const UserByIdValidator = (req, res, next) => {
    const params = { user_id: Number(req.params.user_id) };
    return (0, validators_1.validate)(params, user_schema_1.userByIdSchema)
        .then(() => next())
        .catch((err) => next(err));
};
exports.UserByIdValidator = UserByIdValidator;
//# sourceMappingURL=user.validator.js.map