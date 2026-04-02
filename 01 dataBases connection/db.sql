-- SQL schema for CRUD MySQL example
-- run these statements in a MySQL client (mysql shell, Workbench, phpMyAdmin, etc.)

CREATE DATABASE IF NOT EXISTS crud_mysql;
USE crud_mysql;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT NOT NULL
);
