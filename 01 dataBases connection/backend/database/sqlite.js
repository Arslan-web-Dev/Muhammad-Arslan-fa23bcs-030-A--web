const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dbPath = path.resolve(__dirname, '../../', process.env.SQLITE_DB_PATH || 'crud.db');

let db;

const connect = () => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening SQLite database:', err.message);
                reject(err);
            } else {
                console.log('Connected to the SQLite database.');
                // Create table if not exists
                db.run(`CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    p_id TEXT,
                    p_name TEXT NOT NULL,
                    p_category TEXT,
                    p_cost REAL NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err) reject(err);
                    else resolve(db);
                });
            }
        });
    });
};

const getAll = async () => {
    if (!db) await connect();
    return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products ORDER BY created_at DESC", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
    });
};

const create = (data) => {
    return new Promise((resolve, reject) => {
    const { p_id, p_name, p_category, p_cost } = data;
    db.run("INSERT INTO products (p_id, p_name, p_category, p_cost) VALUES (?, ?, ?, ?)",
        [p_id, p_name, p_category, p_cost], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, ...data });
        });
    });
};

const update = (id, data) => {
    return new Promise((resolve, reject) => {
    const { p_id, p_name, p_category, p_cost } = data;
    db.run("UPDATE products SET p_id = ?, p_name = ?, p_category = ?, p_cost = ? WHERE id = ?",
        [p_id, p_name, p_category, p_cost, id], function (err) {
            if (err) reject(err);
            else resolve({ id, ...data });
        });
    });
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve({ id });
    });
    });
};

module.exports = { connect, getAll, create, update, remove };
