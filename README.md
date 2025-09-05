# 🚀 Freelance CRM

A **Full-Stack CRM application** built to help freelancers manage their clients with ease, professionalism, and style.  
The app is designed with **Node.js + Express** for the backend and **Next.js + TypeScript + Material UI + Framer Motion** for the frontend.

---

## 📌 Features

### ✅ Backend
- User authentication with **JWT**
- Secure password hashing with **bcrypt**
- Protected routes (only logged-in users can access their own data)
- Error handling middleware
- Organized file structure (`backend/config`, `controllers`, `routes`, etc.)

### 🎨 Frontend
- Built with **Next.js 15 + TypeScript**
- Styled with **TailwindCSS + Material UI**
- Smooth animations via **Framer Motion**
- Pages:
  - Home (animated landing page)
  - Login (with alerts + toast notifications)
  - Register (with alerts + toast notifications)
  - Dashboard (secured placeholder page)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, TypeScript, TailwindCSS, Material UI, Framer Motion  
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
- **Dev Tools:** Git, ESLint, Turbopack, Postman  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/freelance-crm.git
cd freelance-crm

### 2. Backend Setup
cd backend
npm install

Create a .env file in backend/ with:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


Run the backend:
npm start
Backend runs on 👉 http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install

Run the frontend:
npm run dev
Frontend runs on 👉 http://localhost:3000
```

### 🧪 Testing

- Use Postman to test authentication routes:
- POST /api/users/register → Register new user
- POST /api/users/login → Login & get JWT
- Protected routes require JWT in the Authorization header.
