# Personalized News App (MERN)

A real-time personalized news feed app. Users log in with JWT auth, select interests during onboarding,and the app fetches live articles from the **GNews API** filtered by profession + interests.

## 🚀 Live demo

> **Live link:** _<!-- paste deployed URL here e.g. https://your-app.vercel.app -->_

## 📸 Screenshots

> Drop your app's screenshots into the [`screenshots/`](screenshots/) folder using the filenames below, and they will render here automatically.

| Screen | Preview |
|---|---|
| Login | <img src="screenshots/login.png" width="320" alt="Login page"> |
| Register | <img src="screenshots/register.png" width="320" alt="Register page"> |
| Onboarding | <img src="screenshots/onboarding.png" width="320" alt="Personalization/onboarding"> |
| News feed | <img src="screenshots/news.png" width="320" alt="News feed"> |
| News detail | <img src="screenshots/news-detail.png" width="320" alt="News detail page"> |

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

## 🌐 Deployment (Vercel + Render + MongoDB Atlas)

**Recommended stack:** Frontend on Vercel, backend on Render, database on MongoDB Atlas. Therepo is pre-configured (`render.yaml` blueprint for the backend,,`frontend/vercel.json` for SPA routing.).

### 1. MongoDB Atlas(create the database
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Under **Database Deploy → Connect**, choose **Drivers**, copy the full MongoDB connection string. Add your DB user/password into the string (replace `<password>`.. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/nuzio_ai`

### 2. Backend on Render
1. Push this repo to GitHub..
2. On Render: **New → Blueprint**, select the repo. Render reads `render.yaml` automatically (root = `backend`, build `npm install`, start `npm start`.).
3. For each env var below, click the lock icon to fill it in:
   - `MONGO_URI` → your Atlas connection string(step 1)
   - `JWT_SECRET` → a long random string
   - `NEWS_API_KEY` → your GNews key from [gnews.io](https://gnews.io)
   - Render auto-sets `PORT` — do not set it..

4. Click **Create Resources** and wait for the deploy. When the service flips to **Live**, copy its URL (e.g. `https://nuzio-ai-backend.onrender.com`).

> ⚠️ To create the backend manually instead: **New Web Service**, Root Directory = `backend`, Build = `npm install`, Start = `npm start`, then set the same env vars..

### 3. Frontend on Vercel
1. In Vercel: **Add New → Project**, import the same GitHub repo..
2.** **Root Directory** → select `frontend`.
3.** Under **Environment Variables**, add:
   - `VITE_API_URL` → `https://<your-render-backend-host>/api` (the Render URL from step 2 with `/api` appended,no trailing slash).
4.** Click **Deploy**. Vercel reads `frontend/vercel.json` (SPA rewrites], builds via Vite,and serves the app..
5.** Save the deployed URL((e.g. `https://nuzio-ai.vercel.app`)asthe **live link** (see top of this README)...

> ⚠️ `VITE_API_URL` **must** point at your deployed backend — otherwise the app falls back to `localhost` and won't work in production. If you change it, redeploy the frontend.**

## 🔑 Test login (local

```
email    : admin@example.com
password : admin123
```

> ⚠️ `.env` contains real API keys/secrets — it is **git‑ignored**, so never commit it. Use a Mongo **Atlas** URI in production, not `localhost`.