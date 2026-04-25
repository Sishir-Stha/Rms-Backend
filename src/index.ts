import express from "express"
import dotenv from "dotenv"
import { pool } from "../src/utills/pool"
import { router } from "./root.routes"
import cors from "cors";

dotenv.config();

const app = express();

/* Only THIS is needed */

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

/* Keep everything else same */

app.use(express.json());

app.use('/api/v1', router)

const PORT = parseInt(process.env.PORTV || '4000');
const HOST = process.env.HOST || 'localhost';

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