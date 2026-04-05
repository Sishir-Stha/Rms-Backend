import pg from 'pg';    
import dotenv from 'dotenv';

dotenv.config();

const password = encodeURIComponent(process.env.DB_PASSWORD!);
const connection_url = `postgresql://${process.env.DB_USER}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


export const pool = new pg.Pool({
    connectionString : connection_url,
})

pool.on('connect',() =>{
    console.log ("Database connection established")
})

pool.on('error', (err) =>{
    console.log("Database connection Error  ",err)
})
