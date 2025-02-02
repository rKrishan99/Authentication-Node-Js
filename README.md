 Node.js Authentication Project

📋 Project Overview

This project is a simple Node.js authentication system that implements user registration, login, role-based access control, and protected routes using JWT (JSON Web Tokens). It connects to a MongoDB database to manage user data.

🚀 Features

User Registration ✅

User Login with JWT Authentication 🔑

Role-Based Access Control (Admin/User) 🔐

Protected Routes with Middleware 🛡️

MongoDB Database Integration 🌐

🏗️ Project Structure

├── controller
│   └── auth-controller.js
├── database
│   └── db.js
├── middleware
│   ├── admin-middleware.js
│   └── auth-middleware.js
├── model
│   └── User.js
├── routes
│   ├── admin-routes.js
│   ├── auth-routes.js
│   └── home-routes.js
├── .env
├── server.js
└── package.json

⚙️ Installation and Setup

Clone the Repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Install Dependencies:

npm install

Environment Configuration (.env):

PORT=3000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET_KEY=your_secret_key

Start the Server:

npm start

API Base URL:

http://localhost:3000/api

📡 API Endpoints

1️⃣ Authentication Routes (/api/auth)

POST /register - Register a new user.

POST /login - Login user and get JWT token.

2️⃣ Home Routes (/api/home)

GET /welcome - Protected route (requires authentication).

3️⃣ Admin Routes (/api/admin)

GET /welcome - Admin-only protected route (requires admin role).

🗂️ Key Components Explained

1️⃣ server.js

Sets up the Express server.

Connects to MongoDB.

Uses middleware for JSON parsing.

Registers routes.

2️⃣ auth-controller.js

Handles user registration and login.

Hashes passwords using bcrypt.

Generates JWT tokens.

3️⃣ middleware

auth-middleware.js: Verifies JWT token and protects routes.

admin-middleware.js: Checks if the authenticated user has admin privileges.

4️⃣ User Model (User.js)

Defines user schema with fields like username, email, password, and role.

5️⃣ Routes

auth-routes.js: Manages registration and login.

home-routes.js: Protected route accessible to authenticated users.

admin-routes.js: Protected route accessible to admins only.

6️⃣ Database Connection (db.js)

Connects to MongoDB using Mongoose.

🔑 JWT Authentication Flow

User registers or logs in.

Server validates credentials.

Server generates JWT token.

Client stores the token (usually in localStorage).

Client sends the token with API requests in the Authorization header.

Middleware verifies the token before granting access to protected routes.

Example Token Header:

Authorization: Bearer <token>

❗ Usage Notes

Always secure your JWT secret key.

Use HTTPS in production.

Tokens expire in 15 minutes (as configured).

Passwords are hashed using bcrypt for security.

📝 License

This project is licensed under the MIT License.

🙌 Contributing

Contributions are welcome! Feel free to open issues, fork the repo, and submit pull requests.

💬 Contact

For any inquiries, reach out at: your-email@example.com

Happy Coding! 🚀
