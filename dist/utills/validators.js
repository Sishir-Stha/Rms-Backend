"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (data, schema) => {
    const { value, error } = schema.validate(data);
    if (error) {
        console.log("validation error");
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(value);
    }
};
exports.validate = validate;
//# sourceMappingURL=validators.js.map