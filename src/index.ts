import express from "express"
import dotenv from "dotenv"
import { pool } from "./utills/pool"
import { router } from "./root.routes"
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Dynamically allow localhost AND any local network IP (192.168.x.x, 10.x.x.x, etc.)
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // 1. Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    // 2. Allow localhost
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    
    // 3. Allow any local network IP (192.168.x.x, 10.x.x.x, 172.16.x.x)
    const isLocalNetwork = /^https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(origin);
    
    // 4. Also respect the .env file if specific domains are added
    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
    const isAllowedEnv = allowedOrigins.includes(origin);

    if (isLocalhost || isLocalNetwork || isAllowedEnv) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

console.log("✅ CORS configured to allow localhost and local network IPs");

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1', router)

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
    try {
        await pool.connect();
        app.listen(PORT, HOST, () => {
            console.log(`🚀 Server is running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
            console.log(`🌐 Access locally via: http://localhost:${PORT}`);
            console.log(`🌐 Access via network via: http://<YOUR-LOCAL-IP>:${PORT}`);
        })
    } catch (err) {
        console.error('❌ Failed to connect to the database:', err);
        process.exit(1);
    }
}

startServer();