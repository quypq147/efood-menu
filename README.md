[English](https://github.com/quypq147/efood-menu/blob/main/README.md)     [Vietnamese](https://github.com/quypq147/efood-menu/blob/main/README_vi.md)

# 🍽️ Efood – A Menu Management System for Restaurants

> Built using **NestJS** (backend), **Next.js** (frontend), **Prisma ORM**, and **PostgreSQL**.

---

## 📂 Table of Contents

- [🧾 Introduction](#-introduction)
- [🗂️ Project Structure](#-project-structure)
- [⚙️ Installation](#️-installation)
- [🚀 Running the Project](#-running-the-project)
- [🧩 Features](#-features)
- [📚 References](#-references)

---

## 🧾 Introduction

**Efood** helps restaurants manage users, roles, permissions, and menu items easily.

---

## 🗂️ Project Structure

```
efood/
│
├── backend/          # NestJS backend API
│   ├── prisma/       # Prisma schema and seeds
│   └── src/          # Modules: auth, user, role, mail...
│
├── frontend/         # Next.js frontend
│   └── src/          # UI components, app pages, stores...
│
├── docker-compose.yml
```

---

## ⚙️ Installation

### 🔧 Requirements

- Node.js >= 16.x  
- Docker (optional)  
- PostgreSQL

### ⬇️ Install

```bash
git clone https://github.com/your-repo/efood.git
cd efood
```

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🌍 Environment Setup

Create environment files:

```bash
# Backend
cp .env.example .env

# Frontend
cp .env.local.example .env.local
```

Configure variables: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`,...

---

## 🚀 Run the Project

### 🐳 With Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:30

---

### ⚙️ Manual

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

---

## 🧩 Features

### 👥 Users

- Register / Login / Email verification / Forgot password  
- Update personal profile

### 🛠️ Admin

- Assign and manage user roles  
- Manage permissions and roles  
- Manage menu items

### 🍴 Customers

- View menu  
- Place orders  
- Review dishes

---

## 📚 References

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
