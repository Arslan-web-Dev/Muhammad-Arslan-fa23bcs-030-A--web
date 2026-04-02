const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

const connect = async () => {
    try {
        const host = process.env.MYSQL_HOST || 'localhost';
        const user = process.env.MYSQL_USER || 'root';
        const password = process.env.MYSQL_PASSWORD || '';
        const database = process.env.MYSQL_DATABASE || 'crud_db';

        // First connect without database to ensure it exists
        const connectionWithoutDB = await mysql.createConnection({ host, user, password });
        await connectionWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await connectionWithoutDB.end();

        connection = await mysql.createConnection({
            host,
            user,
            password,
            database
        });

        console.log('Connected to the MySQL database.');

        // Create table if not exists
        await connection.execute(`CREATE TABLE IF NOT EXISTS records (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            role VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err.message);
        throw err;
    }
};

const getAll = async () => {
    const [rows] = await connection.execute("SELECT * FROM records ORDER BY created_at DESC");
    return rows;
};

const create = async (data) => {
    const { name, email, phone, role } = data;
    const [result] = await connection.execute(
        "INSERT INTO records (name, email, phone, role) VALUES (?, ?, ?, ?)",
        [name, email, phone, role]
    );
    return { id: result.insertId, ...data };
};

const update = async (id, data) => {
    const { name, email, phone, role } = data;
    await connection.execute(
        "UPDATE records SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?",
        [name, email, phone, role, id]
    );
    return { id, ...data };
};

const remove = async (id) => {
    await connection.execute("DELETE FROM records WHERE id = ?", [id]);
    return { id };
};

module.exports = { connect, getAll, create, update, remove };
