# College Voting System (Blockchain-Ready) 🗳️🏛️

A secure, modern, full-stack college voting application designed to provide transparent, verifiable, and role-based student council and campus elections.

---

## 📌 Project Overview

The **College Voting System** automates the student election process with robust identity verification, student roll number authentication, and tamper-resistant vote auditing. It replaces paper ballots with an intuitive digital platform featuring instant verification, department-wise categorization, candidate profiles, and live election dashboards.

### Key Highlights
- **Student Authentication & Verification:** Strict student roll number validation, department filtering, and academic year checks.
- **Security & Authorization:** Encrypted credentials using bcrypt and stateless authentication with JWT stored in secure HTTP-only cookies and Authorization headers.
- **Vote Integrity:** Enforces single-vote policy (`hasVoted` validation) per student to prevent double voting.
- **Responsive UI:** Clean, responsive UI built with React 19, modern CSS modules, and custom components.
- **Blockchain Roadmap:** Designed for seamless integration with Web3/Solidity smart contracts for decentralized, immutable on-chain ballot recording.

---

## 🏗️ Architecture & Tech Stack

### Frontend (`client/`)
- **React 19** with Vite bundling
- **React Router v7** for single-page routing and protected routes
- **Context API** (`AuthContext`) for centralized authentication state
- **Axios** with request interceptors for authenticated API calls
- Modern CSS with responsive design patterns

### Backend (`backend/`)
- **Node.js & Express.js** RESTful API
- **MongoDB** with **Mongoose ODM**
- **JWT (JSON Web Tokens)** for stateless session management
- **Bcrypt.js** for one-way password hashing (salt rounds: 12)
- **CORS** middleware supporting multi-port development environments
- **Cookie-Parser** for HTTP-only cookie token management

---

## 📁 Repository Structure

```
CLG voting/
├── backend/
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Request controllers (auth, student logic)
│   ├── middleware/         # JWT protection & role authorization middleware
│   ├── models/             # Mongoose data schemas (Student, User, Candidate, Vote)
│   ├── routes/             # REST route endpoints (/api/auth, /api/users)
│   ├── seed.js             # Seeding utility for demo users
│   ├── seed.students.js    # Seeding utility for college students
│   ├── server.js           # Express app entry point & CORS configuration
│   └── API_EXAMPLES.md     # Detailed API documentation and curl samples
├── client/
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── assets/         # Project vector assets & icons
│   │   ├── components/     # Reusable UI components (Navbar, Button, Card, Input, Loading)
│   │   ├── constants/      # Departments, academic years, election config
│   │   ├── context/        # AuthContext for session management
│   │   ├── hooks/          # Custom React hooks (useForm)
│   │   ├── pages/          # Home, Login, Register, Dashboard
│   │   ├── services/       # Axios API client services
│   │   ├── App.jsx         # Root router & route guards
│   │   └── main.jsx        # React DOM bootstrap
│   ├── index.html          # HTML5 entry page
│   └── vite.config.js      # Vite build configuration
├── PROJECT_DETAILS.md      # Comprehensive technical inventory and factsheet
└── README.md               # Main project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/KARTHIK-BATTIPROLU/clg-voting-blockchain.git
cd clg-voting-blockchain
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` based on `backend/.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Seed initial student test records (optional):
```bash
node seed.students.js
```

Start the backend server:
```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Client Setup
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
The client will run on `http://localhost:5173`.

---

## 🔐 API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Backend health check |
| `POST` | `/api/auth/register` | Public | Register a new student |
| `POST` | `/api/auth/login` | Public | Student login with Student ID/Email |
| `GET` | `/api/auth/me` | Protected | Fetch current student profile |
| `POST` | `/api/auth/logout` | Protected | Clear session cookie |
| `PUT` | `/api/auth/password` | Protected | Change password |
| `GET` | `/api/users` | Admin | View all registered accounts |

---

## 🔮 Implementation Roadmap

- [x] **Phase 1-5:** Backend Express API, Student Schema, JWT Auth, Database Seeding
- [x] **Phase 6-10:** React 19 Frontend, Modern UI System, Auth Flow, Dashboard
- [ ] **Phase 11:** Candidate nomination and ballot management interface
- [ ] **Phase 12:** Smart Contract deployment on Ethereum/Polygon testnet for decentralized ballot recording
- [ ] **Phase 13:** Web3 wallet connection (MetaMask) & cryptographic receipt verification

---

## 👤 Author

- **Karthik Battiprolu**
- GitHub: [@KARTHIK-BATTIPROLU](https://github.com/KARTHIK-BATTIPROLU)
