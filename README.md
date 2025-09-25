# AI App Builder

Generate structured app requirements and mock UI from a plain-English description.

**Live Site:** [https://ai-app-builder-sable.vercel.app](https://ai-app-builder-sable.vercel.app)

- **Frontend:** React + Vite + Tailwind v4 + ShadCN UI
- **Backend:** Node.js (Express) + Mongoose
- **Database:** MongoDB
- **AI:** OpenAI API (chat completions)
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas

## Monorepo layout

```
ai-app-builder/
├─ frontend/ # React app (Vite)
│ ├─ src/
│ ├─ package.json
│ └─ vite.config.js
└─ backend/ # Express API
├─ server.js
├─ routes/
├─ controllers/
├─ models/
├─ prompts/
└─ package.json
```

## Features

- POST `/api/analyse` — validates input, calls OpenAI, stores a Project document with:
  - `extractedRequirements` (appName, entities, roles, features)
  - `uiMetadata` (formConfig, rolePermissions)
- GET `/api/projects` — list saved projects (id + app name)
- GET `/api/projects/:id` — fetch a single project by id

## Prerequisites

- Node.js 18+ and npm
- An **OpenAI API key**
- A **MongoDB Compass** connection string

## Environment variables

Create env files in `backend/` and `frontend/`.

### Backend (`backend/.env`)

```
# Required
OPENAI_API_KEY=sk-...

# MongoDB
MONGODB_URI_DEV=mongodb://localhost:27017/

# CORS
CORS_ALLOWED_ORIGIN=http://localhost:5173

# Optional
PORT=5000
NODE_ENV=development
```

### frontend (`frontend/.env`)

```
# URL of the backend (local in dev)
VITE_API_URL=http://localhost:5000
```

## Local development

### 1) Start MongoDB (Compass)

- Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and [MongoDB Compass](https://www.mongodb.com/products/compass).
- Start a local MongoDB instance (default connection: `mongodb://127.0.0.1:27017`).
- Create a new database (e.g., `aiappbuilder`) and update your `.env`:

```
MONGODB_URI_DEV=mongodb://127.0.0.1:27017/aiappbuilder
```

### 2) Backend

```
cd backend
npm install
npm run dev   # runs server.js
```

### 3. Frontend

```
cd frontend
npm install
npm run dev # vite dev server
```

### 4. Try it out

Visit the frontend (Vite dev server).  
Submit a description (≥ 20 chars, ≤ 1000).  
The backend will validate, call OpenAI, save to MongoDB, and return the created project.
