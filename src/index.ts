import express from "express"
import dotenv from "dotenv"
import { router } from "./root.routes"
import cors from "cors";
import reportRoutes from './reports/reports.routes';

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) return callback(null, true);
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isLocalNetwork = /^https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(origin);
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

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1', router)
app.use('/api/v1/reports', reportRoutes);

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
    console.log(`Access locally via: http://localhost:${PORT}`);
    console.log(`Access via network via: http://<YOUR-LOCAL-IP>:${PORT}`);
});