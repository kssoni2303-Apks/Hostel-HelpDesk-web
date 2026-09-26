const mysql = require('mysql2');
const path = require('path');
// This ensures the .env is found even if you run the server from a different folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '#Mysql@2025', // Use empty string if no password
    database: process.env.DB_NAME || 'hostel_helpdesk',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();