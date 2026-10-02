# Hiskel Dibera — Full-Stack Developer Portfolio

A modern, responsive, full-stack developer portfolio built with React, Tailwind CSS, Node.js, Express, and MongoDB.

The portfolio includes a public-facing website and a secure admin dashboard that allows portfolio content to be managed dynamically without editing the frontend code.

## 🌐 Overview

This portfolio was built to showcase my software engineering journey, technical skills, projects, and experience while providing a professional way for recruiters, employers, and collaborators to learn more about me.

The application follows a full-stack architecture with a React frontend, Express/Node.js backend, and MongoDB database.

## ✨ Features

### Public Portfolio

- Responsive design for mobile, tablet, and desktop
- Light and dark mode
- Dynamic Home section
- Dynamic About section
- Dynamic Skills section
- Dynamic Projects section
- Contact form
- GitHub and LinkedIn links
- CV viewing
- Smooth section navigation
- Responsive mobile navigation

### Admin Dashboard

- Secure admin authentication
- Dashboard statistics
- Manage Home information
- Manage About information
- Manage skills
- Add, edit, and delete projects
- Upload project images
- Upload CV
- View contact messages
- Mark messages as read
- Delete messages

### Backend

- RESTful API
- MongoDB database
- JWT authentication
- Password hashing with bcrypt
- Protected admin routes
- File uploads with Multer
- Email notification support with Resend

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Vite
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Resend

## 📁 Project Structure

```text
Real Portfolio/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       │   └── admin/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
