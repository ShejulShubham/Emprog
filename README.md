# 🎬 Emprog - Show & Movie Tracker App

A modern full-stack web application to **track your favorite shows, movies, and video content** with ease. Users can log entries, monitor their watch progress, manage personalized watchlists, and sync settings across devices.

Built as a **Full-Stack Monorepo** featuring a React SPA, Node.js/Express API, and integrated Firebase services.

---

## 🚀 Features

- 🔐 **User Authentication** — Sign Up, Login, and Session Persistence via Firebase Auth & Redux.
- 📺 **Watchlist Management** — Full CRUD operations for tracking shows, movies, and custom video items.
- ⚡ **Full-Stack Monorepo** — Isolated client-side UI and Node.js REST API using npm workspaces.
- 📱 **Responsive & PWA Ready** — Mobile-first UI built with Tailwind CSS.
- 🏷️ **Automated Versioning** — Custom CI/CD pipeline parsing Pull Requests for automated SemVer bumps (`major.minor.patch`).

---

## 🛠️ Tech Stack

- **Frontend (`/client`)**: [React](https://react.dev/) (Vite), [Tailwind CSS](https://tailwindcss.com/), [Zustand](https://zustand-demo.pmnd.rs/)
- **Backend (`/server`)**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), Firebase Admin SDK / Firestore
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **CI/CD & Scripts**: GitHub Actions, Custom Node.js release management scripts

---

## 📂 Monorepo Project Structure

```text
emprog/
├── client/                     # Frontend Workspace (React + Vite)
│   ├── public/                 # Static assets, PWA manifest, favicons
│   ├── src/
│   │   ├── components/         # Reusable UI components (Modals, Cards, Nav)
│   │   ├── context/            # React Context providers (Modal, Loading state)
│   │   ├── firebase/           # Client-side Firebase SDK initialization
│   │   ├── pages/              # Route views (Dashboard, Auth, Home, 404)
│   │   ├── store/              # Zustand state stores (Auth, User Settings)
│   │   └── utils/              # Client helpers and API handlers
│   ├── .env.example            # Frontend environment variable template
│   ├── netlify.toml            # Client deployment configuration
│   └── package.json
│
├── server/                     # Backend Workspace (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Database & Firebase Admin config
│   │   ├── controllers/        # Express route logic
│   │   ├── middlewares/        # Auth & error handling middlewares
│   │   ├── routes/             # API endpoint definitions
│   │   └── app.js              # Express app entry point
│   ├── .env.example            # Backend environment variable template
│   └── package.json
│
├── scripts/                    # Automation & Maintenance Tools
│
├── .github/workflows/          # GitHub Actions CI/CD Pipelines
│   └── auto-version.yml        # PR release generation pipeline
├── package.json                # Root Monorepo configuration (npm workspaces)
└── README.md

```

---

## ⚙️ Local Installation & Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/ShejulShubham/emprog.git
cd emprog
```

### 2. **Install Workspace Dependencies**

Running `npm install` at the root automatically installs dependencies across all workspaces (`client` & `server`):

```bash
npm install
```

### 3. **Environment Variables Configuration**

Copy the `.env.example` templates in both `client/` and `server/` to create local `.env` files:

#### **Client Configuration (`client/.env`)**

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### **Server Configuration (`server/.env`)**

```env
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

### 4. **Run Development Servers**

You can run both client and server concurrently from the root directory using workspace commands:

```bash
# Run client app (Vite SPA)
npm run dev:client

# Run server app (Node.js API)
npm run dev:server

```

---

## 🔀 Pull Request & Automated Versioning Process

This repository uses automated Semantic Versioning (`major.minor.patch`) driven by GitHub Actions. When merging feature branches into `main` using **Squash and Merge**, write your PR Description using the structured sections below:

### **PR Description Template**

```markdown
feat: add watchlist filtering and search features

[User Release]
- Added ability to filter items by watch status and genre.
- Improved response times for search suggestions.

[Dev Notes]
- Added helper utility for debounced inputs.
- Refactored Zustand store selector hooks.

```

### **How the Version Script Works**

* Bumps **minor version** (`x.Y.0`) for `feat:` PR titles.
* Bumps **patch version** (`x.y.Z`) for `fix:` or chore PR titles.
* Extracts notes strictly from the **`[User Release]`** section for public changelogs.
* Automatically **omits** the internal `[Dev Notes]` from user-facing release metadata.

---

## 🚀 Deployment Process

The monorepo structure allows independent deployment of the client and server services:

### 1. **Frontend Deployment (Netlify / Vercel)**

* **Base Directory:** `client`
* **Build Command:** `npm run build`
* **Publish Directory:** `client/dist`
* **Environment Variables:** Set all `VITE_*` variables in your hosting dashboard.

### 2. **Backend Deployment (Render / Railway / Cyclic)**

* **Root Directory:** `server`
* **Build Command:** `npm install`
* **Start Command:** `node src/app.js` (or `npm start`)
* **Environment Variables:** Configure server port, database keys, and Firebase Admin credentials in the hosting environment variables settings.