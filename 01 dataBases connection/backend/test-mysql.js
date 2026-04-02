const mysql = require('./database/mysql');
require('dotenv').config();

async function test() {
    try {
        await mysql.connect();
        console.log("MySQL connection test successful!");
        process.exit(0);
    } catch (error) {
        console.error("MySQL connection test failed:", error.message);
        process.exit(1);
    }
}

test();
