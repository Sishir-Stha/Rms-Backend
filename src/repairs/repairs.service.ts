import { pool } from "../utills/pool";

export const getRepairs = async (
    status : string,
    device_name : string) => {
        const query = `SELECT * FROM get_repairs($1, $2);`
        const values=[status,device_name]
        const result = await pool.query(query,values)
        return result.rows;

}