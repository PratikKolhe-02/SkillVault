<div align="center">

# 🔐 SkillVault

### AI-Powered Career Platform & Learning Management System

*Resume Intelligence · Course Marketplace · Generative AI Feedback · Real-Time Performance*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-skill--vault--delta.vercel.app-4F46E5?style=for-the-badge)](https://skill-vault-delta.vercel.app)
[![Backend](https://img.shields.io/badge/API-Hosted_on_Render-46E5A0?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

---

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?style=flat-square&logo=redis&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=flat-square&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-OAuth-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Google_Gemini_Pro-AI-4285F4?style=flat-square&logo=google&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-3395FF?style=flat-square&logo=razorpay&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E5A0?style=flat-square&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

</div>

---

## 📋 Table of Contents

- [🌐 Live Demo](#-live-demo)
- [✨ Overview](#-overview)
- [⚡ Key Features & Engineering Metrics](#-key-features--engineering-metrics)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Option A — Standard Local Setup](#option-a--standard-local-setup)
  - [Option B — Docker Setup](#option-b--docker-setup)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌐 Live Demo

| Service | URL | Platform |
|---|---|---|
| 🎨 **Frontend** | [skill-vault-delta.vercel.app](https://skill-vault-delta.vercel.app) | Vercel |
| ⚙️ **Backend API** | Hosted on Render | Render |

> **Note:** The backend is deployed on Render's free tier — the first request may take 30–60 seconds to cold-start. Subsequent requests are fast.

---

## ✨ Overview

**SkillVault** is a scalable, full-stack platform that combines two powerful systems under a single roof:

**1 · AI Resume Analyzer** — Upload your resume and receive instant, AI-generated ATS scoring, gap analysis, and personalized improvement suggestions powered by **Google Gemini Pro**. No generic advice — every suggestion is tailored to the uploaded document.

**2 · Learning Management System (LMS)** — A complete course marketplace where educators publish structured video curricula and students enroll, watch lectures, and leave reviews. Payments are handled via **Razorpay**, and the entire course catalog is served through a Redis-cached API layer for sub-70ms response times.

---

## ⚡ Key Features & Engineering Metrics

### 🤖 AI & Intelligence

- **Gemini Pro Resume Analysis** — Parses uploaded resumes, outputs structured ATS compatibility scores, and generates role-specific improvement recommendations
- **Real-Time Feedback Loop** — Results rendered dynamically without page reload; progressive disclosure UI for score breakdowns

### 🎓 LMS Platform

- **Dynamic Course Curriculum Viewer** — Locked and free-preview lecture differentiation per course
- **Interactive Video Player** — Custom player component with progress tracking
- **Enrollment Flow** — Full Razorpay payment integration with order creation, payment verification, and webhook handling
- **Review & Rating System** — Star ratings and written reviews attached to enrolled courses
- **Educator Dashboard** — Course publishing, lecture upload, and enrollment analytics

### 🔐 Authentication & Security

- **Hybrid Auth System** — Firebase OAuth (Google Login) combined with custom JWT session persistence via HTTP-only cookies and Redux/LocalStorage
- **SPA Routing Fix** — `vercel.json` rewrite rules prevent 404s on direct URL navigation and page refresh
- **DDoS Protection** — `express-rate-limit` middleware with configurable window and request caps
- **Strict CORS Policy** — Origin whitelisting with credential support for cross-domain cookie handling

### ⚙️ Performance & Infrastructure

| Metric | Before | After | Improvement |
|---|---|---|---|
| **API Response Latency** (cached routes) | ~200ms | <70ms | **~65% faster** |
| **Payload Size** (Gzip compression) | Baseline | −30% | **30% smaller** |
| **Local Dev Setup Time** (Docker) | Manual config | Containerized | **~40% faster** |

- **Redis Caching** — Course catalog and frequently accessed data cached via Upstash (cloud) or local Docker Redis (dev)
- **Gzip Compression** — `compression` middleware applied globally on all Express responses
- **Docker Compose** — Frontend, backend, and Redis orchestrated in a single `docker-compose up --build` command

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | Component-based UI framework |
| Tailwind CSS | Utility-first styling system |
| Redux Toolkit | Global state management (auth, cart, enrollment) |
| React Router DOM | Client-side SPA routing |
| Vercel | Deployment + CDN + rewrite rules |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB Atlas | Primary NoSQL database |
| Redis (Upstash / Docker) | Response caching layer |
| Docker & Docker Compose | Containerization & local orchestration |
| Render | Cloud deployment platform |

### Integrations & Services

| Service | Role |
|---|---|
| Google Gemini Pro | Resume parsing and AI feedback generation |
| Firebase OAuth | Google social login provider |
| Razorpay | Payment gateway (course enrollment) |
| Upstash Redis | Serverless Redis for cloud cache |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    User(["👤 User / Browser"])

    subgraph Frontend ["🌐 Frontend — Vercel"]
        React["⚛️ React App\nRedux · Tailwind · React Router"]
        Vercel_Rewrites["📄 vercel.json\nSPA Rewrite Rules"]
    end

    subgraph Backend ["⚙️ Backend — Render (Express.js / Node.js)"]
        API["🔀 Express API Gateway\nRate Limit · CORS · Gzip"]
        Auth_MW["🔐 JWT Middleware\nCookie + LocalStorage session"]
        Resume_Controller["🤖 Resume Controller"]
        Course_Controller["🎓 Course Controller"]
        Payment_Controller["💳 Payment Controller"]
    end

    subgraph Cache ["⚡ Redis Cache — Upstash"]
        Redis[("🗄️ Redis\nCourse catalog cache\n< 70ms response")]
    end

    subgraph Database ["🍃 MongoDB Atlas"]
        MongoDB[("📦 MongoDB\nUsers · Courses\nEnrollments · Reviews")]
    end

    subgraph ExternalAPIs ["🔌 External APIs"]
        Gemini["✨ Google Gemini Pro\nAI Resume Analysis"]
        Firebase["🔥 Firebase OAuth\nGoogle Login Provider"]
        Razorpay["💰 Razorpay\nPayment Gateway"]
    end

    User -->|"HTTPS Requests"| React
    Vercel_Rewrites -.->|"Handles SPA refresh"| React
    React -->|"REST API calls\n/api/v1/..."| API

    API --> Auth_MW
    Auth_MW --> Course_Controller
    Auth_MW --> Resume_Controller
    Auth_MW --> Payment_Controller

    Course_Controller -->|"Cache hit?"| Redis
    Redis -->|"Miss → query"| MongoDB
    MongoDB -->|"Write-through"| Redis

    Resume_Controller -->|"PDF text + prompt"| Gemini
    Gemini -->|"ATS score + feedback JSON"| Resume_Controller

    Payment_Controller -->|"Order create / verify"| Razorpay
    Razorpay -->|"Payment confirmation"| Payment_Controller

    React -->|"Google OAuth flow"| Firebase
    Firebase -->|"ID Token"| API

    style Frontend fill:#1e1b4b,stroke:#6366f1,color:#e0e7ff
    style Backend fill:#052e16,stroke:#22c55e,color:#dcfce7
    style Cache fill:#450a0a,stroke:#ef4444,color:#fee2e2
    style Database fill:#14532d,stroke:#4ade80,color:#dcfce7
    style ExternalAPIs fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
```

---

## 📁 Project Structure

```
skillvault/
│
├── client/                              # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── CourseCard.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── ResumeUploader.jsx
│   │   ├── pages/                       # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── CoursePage.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   ├── EducatorDashboard.jsx
│   │   │   └── EnrollmentSuccess.jsx
│   │   ├── store/                       # Redux Toolkit slices
│   │   │   ├── authSlice.js
│   │   │   ├── courseSlice.js
│   │   │   └── store.js
│   │   ├── utils/                       # Helpers and API clients
│   │   └── App.jsx
│   ├── vercel.json                      # SPA rewrite rules
│   └── package.json
│
├── server/                              # Express Backend
│   ├── controllers/
│   │   ├── resumeController.js          # Gemini Pro integration
│   │   ├── courseController.js          # LMS CRUD + Redis caching
│   │   ├── paymentController.js         # Razorpay order + verify
│   │   └── authController.js            # Firebase + JWT logic
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT verification
│   │   ├── rateLimiter.js               # express-rate-limit config
│   │   └── cacheMiddleware.js           # Redis cache-aside logic
│   ├── models/                          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── resumeRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── authRoutes.js
│   ├── config/
│   │   ├── db.js                        # MongoDB Atlas connection
│   │   └── redis.js                     # Redis client (Upstash / Docker)
│   └── index.js                         # Express app entry point
│
├── docker-compose.yml                   # Multi-container orchestration
├── Dockerfile.client                    # Frontend container
├── Dockerfile.server                    # Backend container
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+` and npm
- Docker & Docker Compose (for containerized setup)
- MongoDB Atlas cluster URI
- Upstash Redis REST URL + token (cloud) or Docker Redis (local dev)
- Google Gemini Pro API key
- Firebase project with OAuth configured
- Razorpay account (Key ID + Secret)

---

### Option A — Standard Local Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skillvault.git
cd skillvault
```

#### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# → Fill in your values (see Environment Variables section below)

# Start the Express server in development mode
npm run dev
```

Server runs at: `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Open a new terminal tab
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# → Fill in your values

# Start the React dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

#### 4. Local Redis (Optional — without Docker)

If you prefer a local Redis instance without Docker, install Redis directly and run:

```bash
redis-server
```

Or use the Upstash cloud Redis URL in your `.env` to skip local Redis entirely.

---

### Option B — Docker Setup

> Spins up the frontend, backend, and a local Redis container together in a single command — no manual configuration required.

#### 1. Clone and Configure

```bash
git clone https://github.com/your-username/skillvault.git
cd skillvault

# Copy and fill environment files for both services
cp server/.env.example server/.env
cp client/.env.example client/.env
```

#### 2. Build and Launch All Services

```bash
docker-compose up --build
```

This command will:
- Build the `server` image (Node.js / Express)
- Build the `client` image (React / Vite)
- Pull and start a `redis:alpine` container
- Wire all services together on an internal Docker network

| Service | Local URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000` |
| Redis | `localhost:6379` (internal) |

#### 3. Stop All Services

```bash
docker-compose down
```

#### 4. Rebuild After Code Changes

```bash
docker-compose up --build --force-recreate
```

---

## 🔑 Environment Variables

### `server/.env`

```env
# ── Server ──────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB Atlas ────────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillvault

# ── JWT ──────────────────────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ── Redis (choose one) ───────────────────────────────────
# Upstash (cloud):
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here

# Local Docker Redis:
REDIS_URL=redis://redis:6379

# ── Google Gemini Pro ────────────────────────────────────
GEMINI_API_KEY=your_google_gemini_api_key_here

# ── Firebase Admin SDK ───────────────────────────────────
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# ── Razorpay ─────────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here

# ── CORS ─────────────────────────────────────────────────
CLIENT_ORIGIN=http://localhost:5173
```

### `client/.env`

```env
# ── Backend API ──────────────────────────────────────────
VITE_API_BASE_URL=http://localhost:5000/api/v1

# ── Firebase Client SDK ──────────────────────────────────
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# ── Razorpay (client-side key only) ──────────────────────
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxx
```

### `vercel.json` (SPA Routing Fix)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

> This prevents Vercel from returning a 404 when users navigate directly to a route like `/courses/123` or refresh the page on any non-root path.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/v1/auth/google` | Verify Firebase ID token, issue JWT | Public |
| `GET` | `/api/v1/auth/me` | Get current user profile | 🔒 JWT |
| `POST` | `/api/v1/auth/logout` | Clear session cookie | 🔒 JWT |

### Resume Analyzer

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/v1/resume/analyze` | Upload resume PDF → Gemini Pro ATS analysis | 🔒 JWT |

### Courses

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/courses` | List all published courses (Redis cached) | Public |
| `GET` | `/api/v1/courses/:id` | Get course detail + curriculum | Public |
| `POST` | `/api/v1/courses` | Create new course | 🔒 Educator |
| `PUT` | `/api/v1/courses/:id` | Update course | 🔒 Educator |
| `DELETE` | `/api/v1/courses/:id` | Delete course | 🔒 Educator |
| `POST` | `/api/v1/courses/:id/review` | Submit star rating + review | 🔒 Student |

### Enrollment & Payments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/v1/payment/order` | Create Razorpay order for course | 🔒 JWT |
| `POST` | `/api/v1/payment/verify` | Verify payment signature + enroll student | 🔒 JWT |
| `GET` | `/api/v1/enrollment/my-courses` | Get all enrolled courses for student | 🔒 JWT |

---

## 🗺️ Roadmap

| Status | Feature |
|---|---|
| ✅ Done | Gemini Pro resume analysis + ATS scoring |
| ✅ Done | Redis caching with ~65% latency improvement |
| ✅ Done | Razorpay payment + enrollment flow |
| ✅ Done | Firebase OAuth + JWT hybrid authentication |
| ✅ Done | Docker Compose multi-service orchestration |
| ✅ Done | Gzip compression + rate limiting |
| 🔄 In Progress | Certificate generation on course completion |
| 🔄 In Progress | Student progress tracking per lecture |
| 📋 Planned | Admin analytics dashboard (revenue, enrollments) |
| 📋 Planned | AI-powered course recommendation engine |
| 📋 Planned | Live cohort sessions with WebRTC |
| 📋 Planned | Mobile app (React Native) |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: describe your change'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request against `main`

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and ensure all existing tests pass before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**SkillVault** — *Where careers are built and skills are forged.*

[![Frontend Live](https://img.shields.io/badge/🌐_Try_It_Live-skill--vault--delta.vercel.app-4F46E5?style=for-the-badge)](https://skill-vault-delta.vercel.app)

</div>
