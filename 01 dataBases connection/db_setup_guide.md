# Database Setup Guide

This guide will help you connect MongoDB, MySQL, and SQLite to your CRUD Application.

## 1. SQLite (Default - No Setup Required)
SQLite is a serverless database that stores data in a local file.
- **Setup**: No installation needed.
- **Config**: Ensure `SQLITE_DB_PATH` in `backend/.env` is set (default: `./crud.db`).

## 2. MySQL
### Option A: Local Installation (Recommended for Development)
1. Download and install [XAMPP](https://www.apachefriends.org/index.html) or [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
2. Start the MySQL service (via XAMPP Control Panel or Windows Services).
3. Create a database named `crud_db` using phpMyAdmin or MySQL Shell:
   ```sql
   CREATE DATABASE crud_db;
   ```
4. **Config** in `backend/.env`:
   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password_here
   MYSQL_DATABASE=crud_db
   ```

### Option B: Cloud (e.g., Aiven, PlanetScale)
1. Create a MySQL instance.
2. Update the `.env` fields with the provided connection details.

## 3. MongoDB
### Option A: Local Installation
1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Start the MongoDB service.
3. **Config** in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crud_db
   ```

### Option B: MongoDB Atlas (Free Cloud Database)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster and a Database User.
3. Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/crud_db`).
4. **Config** in `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://your_connection_string
   ```

## Switching Databases
Once configured, you can switch databases directly from the **Universal CRUD Manager** dashboard:
1. Look for the **Database Icon** in the Navbar.
2. Select your desired database from the dropdown.
3. The indicator will turn **green** if the connection is successful.
