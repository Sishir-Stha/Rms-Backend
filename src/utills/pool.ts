import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Keep PostgreSQL DATE values as YYYY-MM-DD strings.
// PostgreSQL DATE type OID = 1082.
// This prevents dates such as 2026-08-17 from being
// converted into a UTC timestamp like 2026-08-16T18:15:00.000Z.
pg.types.setTypeParser(1082, (value) => value);

const password = encodeURIComponent(process.env.DB_PASSWORD!);

const connection_url = `postgresql://${process.env.DB_USER}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const pool = new pg.Pool({
    connectionString: connection_url,
});

pool.on('connect', () => {
    console.log('Database connection established');
});

pool.on('error', (err) => {
    console.log('Database connection Error ', err);
});