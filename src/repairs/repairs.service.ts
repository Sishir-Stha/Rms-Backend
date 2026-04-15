import { pool } from "../utills/pool";

export const getRepairs = async (
    status : string,
    device_name : string) => {
        const query = `SELECT * FROM get_repairs($1, $2);`
        const values=[status,device_name]
        const result = await pool.query(query,values)
        return result.rows;
}

export const getRepairsById = async ( repair_id : number ) => {
    const query = `SELECT * from repairs where repair_id = $1;`
    const values = [repair_id]
    const result = await pool.query(query,values)
    return result.rows[0];
}

export const updateRepairsById = async ( repair_id : number ) =>{
    const query = ``
}