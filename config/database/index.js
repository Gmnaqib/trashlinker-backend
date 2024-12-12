const mysql = require('mysql2/promise');
require ('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/trash_linker';
const pool = mysql.createPool(DATABASE_URL);

module.exports = pool;