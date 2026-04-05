import express from "express"
import dotenv from "dotenv"
import {pool} from "../src/utills/pool"
import { router } from "./root.routes"

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1', router)

const PORT = parseInt(process.env.PORTV || '4000');
const HOST = process.env.HOST || 'localhost';


const startServer = async() =>{
    try{
        await pool.connect();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on the http://${HOST}:${PORT}`);
        })

    }catch(err){
        console.error('Failed to connect to the database:', err);
        process.exit(1);         
    }
}

startServer();
