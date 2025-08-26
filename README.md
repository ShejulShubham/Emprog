```markdown
# Emprog - 🎬 Show & Movie Tracker App

A modern web application to **track your favorite shows, movies, and other videos** with ease.  
Users can **add, update, and delete entries** and monitor their progress in a clean, responsive interface.  
Built with **React**, **Firebase (Authentication + Firestore)**, and **Tailwind CSS** for a smooth, minimal experience.

---

## 🚀 Features
- ✅ **User Authentication** (Sign Up, Login, Logout) with Firebase Auth
- ✅ **Add, Edit, and Delete Entries** for shows, movies, or other videos
- ✅ **Protected Routes** to restrict access to authenticated users only
- ✅ **Responsive UI** with **Tailwind CSS**
- ✅ **Persistent Login** using Firebase + Zustand state management
- ✅ **Firestore Security Rules** for per-user data protection

---

## 🛠️ Tech Stack
- **Frontend**: [React](https://reactjs.org/) (Vite)
- **UI Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Authentication + Firestore Database)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

---

## 📂 Project Structure

```

src/
│
├── components/       # Reusable components (Forms, Modals, Navbar, etc.)
├── pages/            # Route pages (Home, Login, Signup, Dashboard)
├── firebase/         # Firebase config & helper functions
├── store/            # Zustand store for authentication & global state
├── utils/            # Utility functions (e.g., format time)
├── App.jsx           # Root component with routing
└── main.jsx          # App entry point

```

## ⚙️ Installation & Setup

### 1. **Clone the repository**

```bash
git clone https://github.com/ShejulShubham/emprog.git
cd emprog
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Set up Firebase**

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a project
* Enable **Email/Password Authentication** and **Firestore Database**
* Add your Firebase config to a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. **Run the app**

```bash
npm run dev
```