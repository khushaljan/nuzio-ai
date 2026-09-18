# Personalized News App (MERN)

A real-time personalized news feed app. Users log in with JWT auth, select interests during onboarding, and the app fetches live articles from the **GNews API** filtered by profession + interests.

## 🚀 Live demo

> **Live link:** _<!-- paste deployed URL here e.g. https://your-app.vercel.app -->_

## ✨ Features

- **JWT auth (register/login** with `bcrypt` hashed passwords
- **Protected routes** (token validation middleware)
- **Onboarding** — pick a profession + interests (stored per user)
- **Personalized news** — live GNews articles filtered by the user's interests
- **News detail** view with play/link actions
- **React Router** SPA with protected navigation

## 🧱 Tech stack

| Layer   | Tech                                   |
|----------|----------------------------------------|
| Frontend | Vite + React, React Router, Axios |
| Backend  | Express, Mongoose, JWT, bcrypt   |
| Database | MongoDB (local :27017 by default     |
| News API | GNews (`gnews.io`)                     |

## 📁 Project structure

```
nuzio-ai/
├─ backend/            Express API, auth, news proxy
└─ frontend/          Vite React SPA  (Login, Onboarding, News, NewsDetail)
```

## ▶️ Run locally

1. Start MongoDB (`mongod`), thendevide the backend:
```bash
cd backend
npm install
npm run dev        # -> http://localhost:5000
```
2. Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/nuzio_ai
JWT_SECRET=change_me
NEWS_API_KEY=your_gnews_key
```
3. Run the frontend:
```bash
cd frontend
npm install
npm run dev        # -> http://localhost:5173
```

A helper seed script exists: `backend/create-test-user.js` (creates `admin@example.com` / `admin123` with interests).

## 🌐 Deployment

- **Frontend (Vercel)**: build via Vite; set `VITE_API_URL` = your deployed backend URL (required — otherwise it falls back to `localhost`).
- **Backend**: host the Express API separately (e.g. Render
  - Set env vars: `MONGO_URI` (MongoDB Atlas), `JWT_SECRET`, `NEWS_API_KEY`, `PORT`
  - Add `backend` as the root when deploying the server folder.

## 🔑 Test login (local)

```
email    : admin@example.com
password : admin123
```

> ⚠️ `.env` contains real API keys/secrets — it is **git‑ignored**, so never commit it. Use a Mongo **Atlas** URI in production, not `localhost`.