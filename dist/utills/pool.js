"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = encodeURIComponent(process.env.DB_PASSWORD);
const connection_url = `postgresql://${process.env.DB_USER}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
exports.pool = new pg_1.default.Pool({
    connectionString: connection_url,
});
exports.pool.on('connect', () => {
    console.log("Database connection established");
});
exports.pool.on('error', (err) => {
    console.log("Database connection Error  ", err);
});
//# sourceMappingURL=pool.js.map