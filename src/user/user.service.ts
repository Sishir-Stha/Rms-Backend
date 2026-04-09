import {pool } from '../utills/pool'

export const createUser = async (
    user_name: string,
    email: string,
    password: string,
    department_id: number,
    status: string,
    join_date: Date
) => {
    const query = `
        INSERT INTO users 
        (user_name, email, password, department_id, status, join_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [
        user_name,
        email,
        password,
        department_id,
        status,
        join_date
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};
       
export const updateUserById = async (user_id : number,
                                     user_name : string, 
                                     department_id : number , 
                                     status: string, 
                                     email: string) =>{
    const query = "update users set user_name = $1 , department_id = $2, status =$3, email = $4 where user_id = $5 Returning *;"
    const values = [user_name, department_id, status,email,user_id];
    const result = await pool.query(query,values);
   return result.rows[0];
}


export const getUserByEmail = async(email : string ) => {
    const query = "select * from users where email = $1 ";
    const values = [email];
    const result = await pool.query(query,values);
    return result.rows[0];
}


export const getUserById = async(user_id : string ) => {
    const query = "select * from users where user_id = $1 ";
    const values = [user_id];
    const result = await pool.query(query,values);
    return result.rows[0];
}


export const getAllUsers = async() =>{
    const query = "select u.user_id,u.user_name ,u.email , json_build_object('department_id', d.department_id  ,'department_name', d.department_name )as department ,u.status ,u.join_date ,u.created_at   from users u inner join departments d  on u.department_id  = d.department_id ;"
    const result = await pool.query(query);
    return result.rows;
}

export const deleteUser = async(user_id : number) => {
    const query = "update users  set status = 'Delete' where user_id = $1 Returning *;"
    const values = [user_id]
    const result = await pool.query(query,values);
  
    return result.rows[0];
}



