<div align="center">

# TypeMaster

**A modern full-stack typing speed tester built with Next.js, FastAPI, and Supabase.**

Track typing speed, accuracy, and performance with a clean, responsive, and scalable application.

<p>

<img src="https://img.shields.io/github/license/Riyan-Abdullah/TypeMaster?style=for-the-badge" />
<img src="https://img.shields.io/github/stars/Riyan-Abdullah/TypeMaster?style=for-the-badge" />
<img src="https://img.shields.io/github/forks/Riyan-Abdullah/TypeMaster?style=for-the-badge" />
<img src="https://img.shields.io/github/last-commit/Riyan-Abdullah/TypeMaster?style=for-the-badge" />

</p>

<p>

<img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=flat-square"/>
<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&style=flat-square"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&style=flat-square"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&style=flat-square"/>
<img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&style=flat-square"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&style=flat-square"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&style=flat-square"/>

</p>

</div>

---

## Overview

TypeMaster is a production-ready full-stack web application that enables users to measure and improve their typing performance through real-time statistics, secure authentication, and personalized analytics.

The project demonstrates modern full-stack development practices using a scalable architecture with a clear separation between frontend, backend, authentication, and data persistence.

---

## Key Features

* Secure authentication using Supabase Auth
* Protected routes and user sessions
* Multiple typing modes (15, 30, and 60 seconds)
* Real-time Words Per Minute (WPM) calculation
* Live accuracy tracking
* Mistake detection
* Dynamic typing paragraphs
* Personal performance dashboard
* Complete typing history
* Search, filtering, sorting, and pagination
* RESTful API architecture with FastAPI
* Responsive user interface
* Clean and modular codebase

---

## Technology Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Frontend       | Next.js 16, React 19, TypeScript |
| Styling        | Tailwind CSS                     |
| Backend        | FastAPI                          |
| Database       | Supabase PostgreSQL              |
| Authentication | Supabase Auth                    |
| Deployment     | Vercel, Render                   |

---

## Project Architecture

```text
TypeMaster
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── lib/
│   └── types/
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   └── main.py
│
└── README.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Riyan-Abdullah/TypeMaster.git
cd TypeMaster
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=
```

### Backend

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SECRET_KEY=
```

---

## REST API

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/tests`         | Save completed typing test    |
| GET    | `/api/tests/latest`  | Retrieve latest typing result |
| GET    | `/api/tests/history` | Retrieve typing history       |
| GET    | `/api/tests/stats`   | Retrieve dashboard statistics |

---

## Development Roadmap

* [x] Authentication System
* [x] Typing Test Engine
* [x] Live Performance Metrics
* [x] Result Processing
* [x] Dashboard Analytics
* [x] Typing History
* [x] Search, Filtering & Pagination


---

## License

This project is licensed under the MIT License.

---

<div align="center">

Developed by **Riyan Abdullah**

</div>
