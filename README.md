# 📚 BookHive Manager — Library Management System

BookHive Manager is a full-stack **MERN** library management system. It handles the complete book-lending lifecycle — cataloging books, managing patrons and staff, issuing and returning books, tracking rent and late fines, and surfacing it all in an analytics dashboard. Access is role-based across **patrons, librarians and admins**, secured with JWT authentication.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black">
  <img alt="Ant Design" src="https://img.shields.io/badge/Ant_Design-5-0170FE?logo=antdesign&logoColor=white">
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?logo=redux&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## ✨ Features

- **JWT authentication** — secure registration and login with `bcryptjs` password hashing and Bearer-token sessions.
- **Role-based access control** — three roles (**patron**, **librarian**, **admin**) with tailored capabilities and an account approval workflow (`pending` → `active`/`inactive`).
- **Book catalog management** — full CRUD for books with cover image, category, author, publisher, price-per-day and copy counts.
- **Issue & return workflow** — issue books to patrons and process returns, with **automatic inventory adjustment** of available copies.
- **Financial tracking** — per-day rent plus late-fine calculation, with revenue aggregation.
- **Analytics dashboard** — reports on total books/copies, users by role, issued vs. returned, and revenue collected vs. pending.
- **Protected routes** — frontend route guards validate the token and log out on expiry.

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 18, React Router 6, Ant Design 5 |
| State | Redux Toolkit + React-Redux |
| HTTP | Axios |
| Utilities | Moment.js (dates) |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose 6 |
| Auth | JWT, bcryptjs |

## 🗂️ Data Models

| Model | Key fields |
|-------|------------|
| **User** | name, email *(unique)*, phone *(unique)*, password *(hashed)*, role `patron\|librarian\|admin`, status `pending\|active\|inactive` |
| **Book** | title, description, category, author, publisher, image, publishedDate, rentPerDay, totalCopies, availableCopies, createdBy |
| **Issue** | book → user, issueDate, returnDate, returnedDate, rent, fine, status, issuedBy |

## 🔌 API Overview

| Group | Endpoints |
|-------|-----------|
| **Users** | `POST /api/users/register`, `POST /api/users/login`, `GET /api/users/get-logged-in-user`, `GET /api/users/get-all-users/:role`, `GET /api/users/get-user-by-id/:id` |
| **Books** | `POST /api/books/add-book`, `PUT /api/books/update-book/:id`, `DELETE /api/books/delete-book/:id`, `GET /api/books/get-all-books`, `GET /api/books/get-book-by-id/:id` |
| **Issues** | `POST /api/issues/issue-new-book`, `POST /api/issues/get-issues`, `POST /api/issues/return-book`, `POST /api/issues/edit-issue`, `POST /api/issues/delete-issue` |
| **Reports** | `GET /api/reports/get-reports` |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- A MongoDB connection string
- A `.env` file in `server/` with `jwt_secret` and `mongo_url`

### Run locally

```bash
# clone
git clone https://github.com/vivektangudu123/BookHive-Manager.git
cd BookHive-Manager

# 1) backend  (http://localhost:5002)
cd server && npm install && node server.js

# 2) frontend (http://localhost:3000)  — in a second terminal
cd client && npm install && npm start
```

## 📁 Project Structure

```
BookHive-Manager/
├── client/                 # React + Ant Design frontend
│   └── src/
│       ├── pages/          # Home, Login, Register, Profile, BookDescription
│       └── components/     # ProtectedRoute, Loader, Button
└── server/                 # Express API
    ├── routes/             # users, books, issues, reports
    ├── models/             # users, books, issues
    ├── middlewares/        # authMiddleware (JWT)
    └── config/             # dbConfig
```

## 👤 Author

**Vivek Tangudu**

- GitHub: [@vivektangudu123](https://github.com/vivektangudu123)

## 📄 License

Released under the MIT License.
