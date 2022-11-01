const mysql = require('mysql2/promise')
const config = require('./config')


const query = async (sql, params) => {
    const connection = await mysql.createConnection(config.db);
    const [res, ] = await connection.execute(sql, params)
    return res;
}

const pool = mysql.createPool(config.db)

module.exports = {
    pool
}