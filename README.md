# task-add

**Task management web application that helps you to organize your time.**

---

## Overview

Minimalistic, yet powerful web app built for managing personal tasks effectively and efficiently.  
The goal of this project is to provide a simple interface for creating, updating, and tracking tasks in a lightweight environment.

## Why TaskAdd ?

In today's world, the need for time organization is becoming increasingly important, both in private life and in business. For this reason, managing daily tasks is becoming a more complex process if we want to accurately and effectively plan our daily and future obligations. To efficiently track commitments, a system is required that allows for quick and easy monitoring and analysis of tasks. The aim of this work is to emphasize to the reader the importance of time organization to become more successful and productive in both private and business life, and to provide a simple system that allows the user to structurally organize their obligations and tasks through the application interface.

This project was primarily approached due to educational and personal interests. Educational interests are directed toward expanding the knowledge and skills needed to realize this work. The personal interest in choosing this topic stems from the experience and difficulties in task management, and thus, digital tools would enable easier and higher-quality work organization.

---

## Technologies

- **Svelte** – modern front-end framework for building fast and reactive user interfaces with minimal boilerplate.  
- **TypeScript** – adds static typing to JavaScript, improving maintainability and reducing runtime errors.  
- **Vite** – lightning-fast development server and build tool optimized for modern JavaScript frameworks.  
- **Bootstrap** – front-end CSS framework used for responsive design and prebuilt UI components. 
- **Node.js & npm** – used as the runtime environment and package manager for installing dependencies and running scripts.

---

## Features

- ➕ Add new tasks quickly  
- ✏️ Edit existing tasks  
- ✅ Mark tasks as completed  
- 🗑️ Delete tasks when no longer needed  
- 📱 Responsive design with Bootstrap for desktop and mobile use

---

## Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/lukadimjasevic/task-add.git
```

## Frontend Setup (client)
```bash
# Navigate into client folder
cd task-add/client

# Install dependencies
npm install
```

## Backend Setup (server)
```bash
# Navigate into server folder
cd task-add/server

# Install dependencies
npm install
```

## Database Setup

The server uses **Sequelize** as ORM with migration and seed scripts.

### 1. Initialize Configuration
Make sure your database connection is configured.  
You can run the initialization script if needed:

```bash
npm run init:config
```

### 2. Run Migrations

Create all database tables:

```bash
# Development
npm run migrate:dev


# Test
npm run migrate:test

# Production
npm run migrate:prod
```

### 3. Seed the Database

Insert initial data:

```bash
# Development
npm run seed:dev

# Test
npm run seed:test

# Production
npm run seed:prod
```

### 4. Reset the Database (if needed)

Drop all tables, re-run migrations, and reseed data:

```bash
# Development
npm run reset:dev

# Test
npm run reset:test

# Production
npm run reset:prod
```

### Notes

- Use `migrate:undo:*` to rollback all migrations.  
- Use `seed:undo:*` to remove seeded data.  
- Ensure your database server is running before executing migrations or seeds.  
- Check your `.env` file for correct database connection settings (e.g., host, port, user, password, database name).  

---

## Run the Development Server

To start the project in development mode, you need to run both the **server** (backend) and the **client** (frontend).

### 1. Start the Backend (server)

```bash
cd server
npm install
npm run dev
```

Backend will run on: 

```bash
http://localhost:PORT (PORT is defined in .env file)
```

---

### 2. Start the Frontend (client)

Open a new terminal and run:

```bash
cd client
npm install
npm run dev
```

The frontend will be available at:

```bash
http://localhost:8081
```

### 3. Access the Application

Open your browser and navigate to:

```bash
http://localhost:8081
```

The client will communicate with the server API running on http://localhost:PORT
