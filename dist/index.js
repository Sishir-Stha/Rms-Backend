"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pool_1 = require("./utills/pool");
const root_routes_1 = require("./root.routes");
const cors_1 = __importDefault(require("cors"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/v1', root_routes_1.router);
const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';
const startServer = async () => {
    try {
        await pool_1.pool.connect();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on the http://${HOST}:${PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map