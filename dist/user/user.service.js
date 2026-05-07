"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.getUserById = exports.getUserByEmail = exports.updateUserById = exports.createUser = void 0;
const pool_1 = require("../utills/pool");
const createUser = async (user_name, email, password, department_id, status, join_date) => {
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
    const result = await pool_1.pool.query(query, values);
    return result.rows[0];
};
exports.createUser = createUser;
const updateUserById = async (user_id, user_name, department_id, status, email) => {
    const query = "update users set user_name = $1 , department_id = $2, status =$3, email = $4 where user_id = $5 Returning *;";
    const values = [user_name, department_id, status, email, user_id];
    const result = await pool_1.pool.query(query, values);
    return result.rows[0];
};
exports.updateUserById = updateUserById;
const getUserByEmail = async (email) => {
    const query = "select * from users where email = $1 ";
    const values = [email];
    const result = await pool_1.pool.query(query, values);
    return result.rows[0];
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (user_id) => {
    const query = "select * from users where user_id = $1 ";
    const values = [user_id];
    const result = await pool_1.pool.query(query, values);
    return result.rows[0];
};
exports.getUserById = getUserById;
const getAllUsers = async () => {
    const query = "select u.user_id,u.user_name ,u.email , json_build_object('department_id', d.department_id  ,'department_name', d.department_name )as department ,u.status ,u.join_date ,u.created_at   from users u inner join departments d  on u.department_id  = d.department_id ;";
    const result = await pool_1.pool.query(query);
    return result.rows;
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (user_id) => {
    const query = "update users  set status = 'Delete' where user_id = $1 Returning *;";
    const values = [user_id];
    const result = await pool_1.pool.query(query, values);
    return result.rows[0];
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map