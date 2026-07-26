# ⌨️ TypeMaster — Modern Typing Speed Tester

**TypeMaster** is a production-grade, full-stack typing speed testing application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **FastAPI**, and **Supabase (PostgreSQL & Auth)**.

Designed with clean architecture, real-time metrics tracking, dark mode support, and responsive layouts for desktop, tablet, and mobile devices.

---

## 🌟 Key Features

- **⚡ Real-Time Typing Speed Test**:
  - Duration Modes: `15 Seconds`, `30 Seconds`, `60 Seconds`.
  - 35+ clean English paragraph dataset with random selection.
  - Character-by-character color feedback (**Green** for correct, **Red** for mistakes, **Pulsing Cursor** for target position).
  - Keystroke-triggered timer start (timer only runs after the first character is typed).
  - Instant reset capability (`Esc` shortcut).

- **📊 Real-Time Performance Engine**:
  - Live calculation of **Words Per Minute (WPM)**, **Accuracy Percentage**, and **Mistakes Count**.
  - Animated completion modal showing performance metrics, test duration, and timestamp.
  - Automatic background persistence to Supabase PostgreSQL via FastAPI REST API.

- **📜 Paginated Test History (`/history`)**:
  - View all past test attempts.
  - Multi-attribute sorting (`Newest`, `Oldest`, `Highest WPM`, `Lowest WPM`).
  - Mode filtering (`All`, `15s`, `30s`, `60s`).
  - Search by date or duration text.
  - Mobile-responsive layout (auto-transforms from desktop tables to stacked cards on small screens).

- **🏆 Performance Dashboard (`/dashboard`)**:
  - Summary metrics cards: **Highest WPM**, **Average WPM**, **Best Accuracy**, **Total Tests Completed**, and **Total Practice Time**.
  - Skeleton loading states.

- **🔒 Authentication & Security**:
  - Supabase Auth (Email & Password registration, login, logout).
  - JWT Bearer token authentication on FastAPI backend.
  - Next.js route protection middleware guarding `/dashboard`, `/history`, and `/profile`.

- **🎨 Modern Design & Dark Mode**:
  - System preference detection + `localStorage` preference persistence.
  - Dark/Light mode theme toggle in navigation bar.
  - Toast notification system for auth, saves, and network errors.
  - Custom 404 & 500 error pages.
  - Full SEO metadata, OpenGraph cards, Twitter cards, `robots.txt`, and `sitemap.xml`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with `darkMode: 'class'`) & Lucide Icons
- **HTTP Client**: Axios (with JWT interceptors)
- **State & Context**: React Context API (`ThemeContext`, `ToastContext`)

### Backend
- **Framework**: FastAPI & Python 3.10+
- **Validation**: Pydantic v2
- **Database & Auth Client**: Supabase Python SDK
- **Security**: PyJWT validation & HTTP Bearer authentication

### Database & Auth
- **Database**: Supabase PostgreSQL (`profiles` and `typing_tests` tables)
- **Auth Provider**: Supabase Auth

---

## 📂 Project Structure

```
TypeMaster/
├── supabase_schema.sql         # SQL schema script for Supabase tables & triggers
├── vercel.json                 # Vercel deployment configuration
├── render.yaml                 # Render deployment configuration
├── README.md                   # Application documentation
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   └── supabase.py      # Supabase client setup
│   │   ├── models/
│   │   │   ├── user.py          # User data models
│   │   │   └── typing.py        # Test data models
│   │   ├── schemas/
│   │   │   ├── user.py          # User Pydantic schemas
│   │   │   ├── dashboard.py     # Dashboard Pydantic schemas
│   │   │   └── typing.py        # Typing Pydantic schemas
│   │   ├── services/
│   │   │   ├── user_service.py  # User profile business logic
│   │   │   ├── dashboard_service.py # Dashboard stats logic
│   │   │   └── typing_service.py # Typing test DB persistence & stats
│   │   ├── utils/
│   │   │   └── auth.py          # JWT authentication dependency
│   │   ├── routers/
│   │   │   ├── user.py          # User profile endpoints
│   │   │   ├── dashboard.py     # Dashboard endpoint
│   │   │   └── typing.py        # Typing REST API endpoints
│   │   └── main.py              # FastAPI application entry point
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/page.tsx   # Login page
    │   │   └── signup/page.tsx  # Signup page
    │   ├── dashboard/page.tsx   # Dashboard page
    │   ├── history/page.tsx     # Test history page
    │   ├── profile/page.tsx     # User profile page
    │   ├── test/page.tsx        # Typing test page
    │   ├── error.tsx            # 500 error page
    │   ├── loading.tsx          # Loading page
    │   ├── not-found.tsx        # 404 page
    │   ├── robots.ts            # SEO robots.txt generator
    │   ├── sitemap.ts           # SEO sitemap.xml generator
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Landing page
    │   └── globals.css          # Tailwind directives & keyframe styles
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Input.tsx
    │   │   ├── Skeleton.tsx
    │   │   ├── ThemeToggle.tsx
    │   │   └── Toast.tsx
    │   ├── dashboard/
    │   │   ├── StatCard.tsx
    │   │   └── EmptyState.tsx
    │   ├── history/
    │   │   ├── HistoryTable.tsx
    │   │   ├── HistoryFilters.tsx
    │   │   ├── SearchBar.tsx
    │   │   └── Pagination.tsx
    │   ├── test/
    │   │   ├── TypingArea.tsx
    │   │   ├── ParagraphDisplay.tsx
    │   │   ├── TimerDisplay.tsx
    │   │   ├── ModeSelector.tsx
    │   │   ├── PerformanceStats.tsx
    │   │   └── ResultCard.tsx
    │   └── auth/
    │       └── AuthFormContainer.tsx
    ├── context/
    │   ├── ThemeContext.tsx
    │   └── ToastContext.tsx
    ├── data/
    │   └── paragraphs.ts        # 35+ typing paragraphs
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useDashboard.ts
    │   ├── useTheme.ts
    │   └── useTypingTest.ts
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts
    │   │   ├── server.ts
    │   │   └── middleware.ts
    │   └── utils.ts
    ├── services/
    │   ├── api.ts               # Axios client with JWT interceptor
    │   ├── authService.ts
    │   ├── userService.ts
    │   └── typingService.ts
    ├── types/
    │   ├── user.ts
    │   ├── auth.ts
    │   ├── dashboard.ts
    │   ├── test.ts
    │   └── history.ts
    ├── middleware.ts            # Next.js route guard middleware
    ├── package.json
    ├── tsconfig.json
    └── tailwind.config.js
```

---

## ⚡ Installation & Setup Instructions

### 1. Database Configuration (Supabase)
1. Log into your [Supabase Console](https://supabase.com).
2. Go to **SQL Editor** -> **New Query**.
3. Run the complete SQL script in `supabase_schema.sql` to create `public.profiles` and `public.typing_tests` tables along with automated triggers and RLS policies.

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` with your Supabase credentials:
```env
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Start the FastAPI server:
```bash
uvicorn app.main:app --reload --port 8000
```
FastAPI documentation will be accessible at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup (Next.js 16)
```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `frontend/.env.local` with your Supabase keys & API URL:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the Next.js development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check | No |
| `GET` | `/api/user/profile` | Get authenticated user profile | Yes |
| `GET` | `/api/dashboard` | Get dashboard metadata payload | Yes |
| `POST` | `/api/tests` | Save completed typing test result | Yes |
| `GET` | `/api/tests/latest` | Retrieve user's most recent test | Yes |
| `GET` | `/api/tests/stats` | Get aggregate user performance stats | Yes |
| `GET` | `/api/tests/history` | Get paginated typing history list | Yes |

---

## 🚀 Production Deployment Guide

### Frontend Deployment (Vercel)
1. Push your code to GitHub/GitLab.
2. Connect your repository to [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend` (or use root with `vercel.json`).
4. Set Environment Variables on Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL` (URL of deployed Render FastAPI backend)
   - `NEXT_PUBLIC_SITE_URL` (URL of deployed Vercel frontend)
5. Click **Deploy**.

### Backend Deployment (Render)
1. Log into [Render](https://render.com).
2. Click **New +** -> **Web Service** or use **Blueprint** connecting `render.yaml`.
3. Set **Root Directory** to `backend`.
4. Build Command: `pip install -r requirements.txt`.
5. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
6. Add Environment Variables on Render:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
   - `ALLOWED_ORIGINS` (URL of deployed Vercel frontend)
7. Deploy Web Service.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
