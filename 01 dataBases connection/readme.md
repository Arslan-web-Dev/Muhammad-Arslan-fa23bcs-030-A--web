# 🗄️ UniCRUD — Universal CRUD Management System

<div align="center">

![UniCRUD Banner](https://img.shields.io/badge/UniCRUD-Management%20System-7c3aed?style=for-the-badge&logo=database&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**A premium, multi-database CRUD management application with a stunning dark UI.**  
Manage users and records across MongoDB, MySQL, and SQLite — all from a single unified dashboard.

</div>

---

## 📸 Screenshots

### 🔐 Login Screen
A sleek dark-themed login interface with secure authentication.

![Login Screen](screenshots/login.png)

---

### 📊 Dashboard — MongoDB Mode
Real-time dashboard showing total records, active database, and system health status while connected to **MongoDB**.

![Dashboard MongoDB](screenshots/dashboard-mongodb.png)

---

### 📊 Dashboard — MySQL Mode
Same intuitive dashboard when switched to **MySQL** as the active database.

![Dashboard MySQL](screenshots/dashboard-mysql.png)

---

### 📊 Dashboard — SQLite Mode
Full CRUD interface while operating on the **SQLite** database with secure multi-database sync.

![Dashboard SQLite](screenshots/dashboard-sqlite.png)

---

## ✨ Features

### 🔗 Multi-Database Support
- Seamlessly switch between **MongoDB**, **MySQL**, and **SQLite** from the dashboard
- Real-time database connectivity indicator (green dot = connected)
- Database-specific record management with synchronized indexing

### 📋 Record Management
- **Create** new user records with name, email, phone, and access level
- **Read** and display all records in a clean tabular format with user avatars
- **Update** existing records with an inline edit action
- **Delete** records with a single click trash icon
- Export records with the **Export** button

### 📊 Live Dashboard Stats
| Stat Card | Description |
|---|---|
| **Total Records** | Real-time count of records in the active database |
| **Active Database** | Currently selected database (MongoDB / MySQL / SQLite) |
| **System Status** | Health status of the system (e.g., Healthy) |
| **Last Updated** | Timestamp of the last data refresh |

### 🧭 Navigation Sidebar
- **Dashboard** – Main overview and record table
- **Users** – User management section
- **Products** – Product record management
- **Database Manager** – Switch and manage database connections
- **Settings** – Application configuration
- **Log Out** – Secure session logout

### 🎨 UI/UX Highlights
- Premium **dark mode** design with deep navy background
- Purple accent color theme throughout the interface
- Avatar initials auto-generated from user names
- Collapsible sidebar for expanded workspace
- Global search bar for finding records instantly
- Light/Dark mode toggle in the top bar
- Admin profile displayed in the top-right corner

### 🔒 Authentication
- Secure admin login with **Access Identifier** (email) and **Security Key** (password)
- Session-based access control with role-based access levels (Admin / User)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations & transitions |
| **Lucide React** | Icon library |
| **Axios** | HTTP client for API calls |
| **React Hot Toast** | Notification toasts |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Mongoose** | MongoDB ODM |
| **MySQL2** | MySQL client |
| **SQLite3** | Embedded SQLite database |
| **Dotenv** | Environment variable management |
| **Morgan** | HTTP request logging |
| **CORS** | Cross-Origin Resource Sharing |
| **Nodemon** | Auto-restart dev server |

---

## 📁 Project Structure

```
CRUD App/
├── backend/
│   ├── controllers/       # Route handler logic
│   ├── database/          # DB connection configs (MongoDB, MySQL, SQLite)
│   ├── routes/            # Express API routes
│   ├── server.js          # Express app entry point
│   └── .env               # Environment variables
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-level components
│   │   └── main.jsx       # React entry point
│   └── index.html         # HTML template
├── crud.db                # SQLite database file
├── package.json           # Root scripts (run frontend + backend together)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [MySQL](https://dev.mysql.com/downloads/) (optional — for MySQL mode)

### 1. Clone the Repository
```bash
git clone https://github.com/Abdulahad-web-dev/FA23-BCS-046.git
cd "FA23-BCS-046/CRUD App"
```

### 2. Configure Environment Variables
Create a `.env` file inside the `backend/` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/unicrud
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=unicrud
```

### 3. Install Dependencies
```bash
npm run install:all
```
This installs dependencies for the root, backend, and frontend simultaneously.

### 4. Run the Application
```bash
npm run dev
```
This starts both the **backend** (port 5000) and **frontend** (port 5173) concurrently.

### 5. Open in Browser
Navigate to: [http://localhost:5173](http://localhost:5173)

Login with your admin credentials to access the dashboard.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin authentication |
| `GET` | `/api/users` | Fetch all users |
| `POST` | `/api/users` | Create new user |
| `PUT` | `/api/users/:id` | Update a user by ID |
| `DELETE` | `/api/users/:id` | Delete a user by ID |

---

## 👨‍💻 Author

**Abdulahad Warraich**  
📧 abdulahadwarraich.web@gmail.com  
🔗 [GitHub](https://github.com/Abdulahad-web-dev)

---

## 📜 License

This project is developed for academic purposes as part of the **Advanced Web Technologies** course.

---

<div align="center">
Made with ❤️ using React, Node.js, and multi-database magic.
</div>
