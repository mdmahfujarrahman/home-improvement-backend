import mysql from "mysql";

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '45373766aA@',
    database: 'home_improvment'
})