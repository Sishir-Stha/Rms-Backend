import express from "express"
import dotenv from "dotenv"
import { pool } from "./utills/pool"
import { router } from "./root.routes"
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// 1. Debug the raw environment variable
console.log("🔍 DEBUG: Raw CORS_ORIGIN from .env =", process.env.CORS_ORIGIN);

// 2. Configure CORS with .split(',') to create an array
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : 'http://192.168.5.59:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// 3. Debug the parsed array
console.log("🔍 DEBUG: Parsed corsOptions.origin =", corsOptions.origin);

// 4. Apply the middleware
app.use(cors(corsOptions));


app.use(express.json());

app.use('/api/v1', router)

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
    try {
        await pool.connect();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on the http://${HOST}:${PORT}`);
        })

    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
}

startServer();