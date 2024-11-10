Task Dashboard Backend
This backend for the Task Dashboard app is built with Express, TypeScript, and MongoDB, providing API endpoints for managing tasks, including creation, updating, and deletion.

Features
Task Management: Create, update, delete, and retrieve tasks.
Type Safety: Developed in TypeScript.
Authentication Support (if needed): JWT-based user authentication.
Getting Started
Prerequisites
Node.js (v14 or later)
MongoDB (local or cloud instance)
Installation
Clone the repository

bash
Copy code
git clone https://github.com/your-username/task-dashboard-backend.git
cd task-dashboard-backend
Install dependencies

bash
Copy code
npm install
Setup MongoDB

Ensure a MongoDB instance is running. Use the default URL mongodb://localhost:27017/your-database or a cloud option like MongoDB Atlas.

Configure Environment Variables

Create a .env file in the root with:

env
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database

Scripts
npm run dev: Starts the server in development mode.
npm run build: Compiles TypeScript into JavaScript for production.
npm start: Runs compiled code in production.
npm run lint: Lints the codebase.
API Endpoints
HTTP  Method	Endpoint	 Description
POST	/tasks	Create a new task
GET	/tasks	Retrieve all tasks
GET	/tasks/:id	Retrieve task by ID
PUT	/tasks/:id	Update task by ID
DELETE	/tasks/:id	Delete task by ID
Contributing
Fork the repository
Create a branch (git checkout -b feature/your-feature)
Commit changes (git commit -m 'Add feature')
Push to branch (git push origin feature/your-feature)
Create a Pull Request
