[English](https://github.com/quypq147/efood-menu/blob/main/README.md)     [Vietnamese](https://github.com/quypq147/efood-menu/blob/main/README_vi.md)
# 🍽️ Efood – Ứng dụng quản lý thực đơn quán ăn  
**Efood – A Menu Management System for Restaurants**

> Hệ thống được xây dựng với **NestJS** (backend), **Next.js** (frontend), **Prisma ORM** và **PostgreSQL**.  
> Built using **NestJS** (backend), **Next.js** (frontend), **Prisma ORM**, and **PostgreSQL**.

---

## 📂 Mục lục | Table of Contents

- [🧾 Giới thiệu | Introduction](#-giới-thiệu--introduction)
- [🗂️ Cấu trúc dự án | Project Structure](#-cấu-trúc-dự-án--project-structure)
- [⚙️ Cài đặt | Installation](#️-cài-đặt--installation)
- [🚀 Chạy dự án | Running the Project](#-chạy-dự-án--running-the-project)
- [🧩 Tính năng | Features](#-tính-năng--features)
- [📚 Tài liệu tham khảo | References](#-tài-liệu-tham-khảo--references)

---

## 🧾 Giới thiệu | Introduction

**Efood** giúp quản lý người dùng, vai trò, quyền hạn và thực đơn trong nhà hàng/quán ăn.  
**Efood** allows restaurants to manage users, roles, permissions, and menu items easily.

---

## 🗂️ Cấu trúc dự án | Project Structure

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

## ⚙️ Cài đặt | Installation

### 🔧 Yêu cầu | Requirements

- Node.js >= 16.x  
- Docker (optional)  
- PostgreSQL

### ⬇️ Cài đặt | Install

\`\`\`bash
git clone https://github.com/your-repo/efood.git
cd efood
\`\`\`

\`\`\`bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
\`\`\`

---

## 🌍 Cấu hình môi trường | Environment Setup

Tạo các file môi trường:

\`\`\`bash
# Backend
cp .env.example .env

# Frontend
cp .env.local.example .env.local
\`\`\`

Cấu hình biến: \`DATABASE_URL\`, \`JWT_SECRET\`, \`NEXT_PUBLIC_API_URL\`,...

---

## 🚀 Chạy dự án | Run the Project

### 🐳 Với Docker | With Docker

\`\`\`bash
docker-compose up --build
\`\`\`

- Frontend: http://localhost:3000  
- Backend: http://localhost:30

---

### ⚙️ Thủ công | Manual

\`\`\`bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
\`\`\`

---

## 🧩 Tính năng | Features

### 👥 Người dùng | Users

- Đăng ký / đăng nhập / xác minh email / quên mật khẩu  
- Cập nhật hồ sơ cá nhân

### 🛠️ Quản trị viên | Admin

- Gán và chỉnh sửa vai trò người dùng  
- Quản lý quyền và vai trò  
- Quản lý thực đơn món ăn

### 🍴 Khách hàng | Customers

- Xem thực đơn  
- Đặt món  
- Đánh giá món ăn

---

## 📚 Tài liệu tham khảo | References

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
