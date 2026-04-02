# Professional AI-Powered Developer Portfolio & CMS

A sophisticated, full-stack portfolio application featuring a robust Content Management System (CMS), dual-database synchronization, and advanced AI integration for automated content generation.

## 🚀 Live Demo
**[Live Website](https://full-stack-resume-v2.vercel.app)**

---

## 🛠️ Technology Stack & Architecture

This project follows the **Model-View-Controller (MVC)** architectural pattern, ensuring a clean separation of concerns and high maintainability.

### **Backend Core: Node.js & Express.js**
- **Process Orchestration:** Handled by Node.js, providing a non-blocking, event-driven environment for high-speed API performance.
- **Server Framework:** Express.js manages routing, middleware integration, and session/cookie handling.

### **Databases: Dual-Storage Strategy**
- **MongoDB Atlas (Primary):** Stores core application data including Projects, Skills, and User accounts using Mongoose schemas.
- **Supabase (Secondary/Sync):** Utilized for highly scalable data storage, real-time synchronization, and managing the AI-generated API blog repository.

### **AI Integration: Google Gemini AI**
- Leveraging `@google/generative-ai` to automate content creation.
- **Automated SEO:** Generates optimized titles, meta descriptions, and keywords for blog posts.
- **Smart Tutorials:** Automatically generates technical tutorials and JavaScript code examples for public APIs fetched dynamically.

### **Security & Authentication**
- **JWT (JSON Web Tokens):** Secure authentication mechanism with tokens stored in **HTTP-only Cookies** to prevent XSS attacks.
- **Bcrypt:** State-of-the-art password hashing for database security.
- **Protected Routes:** Custom middleware verifies user roles before allowing CRUD operations on the CMS.

### **Frontend Excellence**
- **Modular HTML5/CSS3:** A clean, responsive design using modern CSS techniques (Grid, Flexbox) and a custom design system.
- **Dynamic JavaScript:** Vanilla JS handles all state management and asynchronous API communication without the overhead of heavy frameworks.
- **Micro-Animations:** Seamless transitions and interactive elements for a premium user experience.

---

## 🏗️ Detailed Project Structure

- **`/api`**: Vercel-specific entry points for serverless function deployment.
- **`/controllers`**: Contains the core business logic (Auth, Blog, Project, Skill management).
- **`/models`**: Defines data structures for MongoDB using Mongoose.
- **`/routes`**: Maps API endpoints to their respective controllers and applies security middleware.
- **`/middleware`**: Security gatekeepers like `authMiddleware` that validate JWT tokens.
- **`/public`**: The client-side application (HTML, CSS, JS, Assets).
- **`/scripts`**: Automation scripts, including the AI content generator and API fetcher.
- **`/config`**: Configuration files for Database and Supabase clients.

---

## 🤖 Advanced Features

### **1. AI-Powered Content Management**
The system automatically fetches random public APIs and uses the **Google Gemini Pro** model to write a detailed blog post for each one. This includes a usage tutorial and a functional code snippet.

### **2. Automated Cron Jobs**
Using `node-cron`, the server performs daily maintenance:
- Fetches new APIs every day at 2:00 AM.
- Cleans up expired temporary blog posts at 3:00 AM.

### **3. Integrated Mail Panel**
A dedicated backend system using `Nodemailer` that allows the admin to:
- Read incoming contact messages.
- Reply directly via the dashboard.
- Broadcast emails to multiple contacts.

---

## 🔑 Environment Configuration

To run this project, you will need to set up the following environment variables in a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_secure_random_string
GEMINI_API_KEY=your_google_ai_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SMTP_HOST=your_smtp_server
SMTP_USER=your_email
SMTP_PASS=your_app_password
```

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arslan-web-Dev/MyResume_website-
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run locally:**
   ```bash
   npm start
   ```

---

## 📄 License
This project is licensed under the **ISC License**.

Created with ❤️ by **Muhammad Arslan**
