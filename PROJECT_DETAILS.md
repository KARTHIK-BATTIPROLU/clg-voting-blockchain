# PROJECT_DETAILS.md

> Factual inventory of this repository. Raw facts only, cited to file paths. Items that cannot be determined from the code are marked `Not found in code`.

---

## 1. Identity

- **Name:** `voting_system` (`README.md:1`); backend package named `backend` (`backend/package.json:2`), client package named `client` (`client/package.json:2`).
- **One-line purpose:** README contains only the literal text `"# voting_system"` repeated twice (`README.md:1-2`); `backend/package.json:4` describes it as `"CLG Voting Backend API"`. Working directory is `CLG voting`.
- **License:** Backend declares `ISC` (`backend/package.json:13`). Client declares no license (`"private": true`, `client/package.json:3`). No `LICENSE` file in repo.
- **Repo size:** Tracked files total ~423 KB (`git ls-files | du -ck`). JS/JSX source totals 2,709 lines across tracked `.js`/`.jsx` files (`wc -l`).
- **Primary languages:** JavaScript (Node.js/CommonJS backend, React/ESM frontend), CSS, HTML.

---

## 2. Repo structure

```
.
├── README.md                         # Two lines: "# voting_system"
├── PROJECT_DETAILS.md                # This file
├── backend/                          # Express + MongoDB REST API
│   ├── .env                          # Real env values present (gitignored) — see §5
│   ├── .gitignore                    # Ignores node_modules, .env, *.log, .DS_Store
│   ├── API_EXAMPLES.md               # Manual request/response docs for /api/auth/*
│   ├── package.json                  # Backend manifest + scripts
│   ├── package-lock.json             # Locked dependency tree
│   ├── server.js                     # App entry point (Express app, CORS, DB connect, route mounting)
│   ├── seed.js                       # Seeds 5 users into the `User` model (inline schema copy)
│   ├── seed.students.js              # Seeds 5 students into the `Student` model
│   ├── config/
│   │   └── db.js                     # connectDB() helper (NOT imported by server.js)
│   ├── controllers/
│   │   └── auth.controller.js        # register/login/getMe/logout/updatePassword logic (uses Student model)
│   ├── middleware/
│   │   ├── auth.js                   # Simple JWT guard, sets req.user (used by routes/users.js)
│   │   └── auth.middleware.js        # protect/authorize/checkNotVoted/optionalAuth (uses Student model)
│   ├── models/
│   │   ├── Student.model.js          # Active student schema (auth.controller + auth.middleware)
│   │   ├── User.js                   # Alternate user schema (routes/auth.js + routes/users.js + seed.js)
│   │   ├── Candidate.js              # Candidate schema — no route references it
│   │   └── Vote.js                   # Vote schema — no route references it
│   └── routes/
│       ├── auth.routes.js            # MOUNTED at /api/auth (delegates to auth.controller)
│       ├── auth.js                   # NOT mounted; alternate inline auth using User model
│       └── users.js                  # MOUNTED at /api/users (uses User model + middleware/auth.js)
└── client/                           # React 19 + Vite SPA
    ├── .env                          # VITE_API_URL=http://localhost:5000/api
    ├── .gitignore                    # Standard Vite ignores
    ├── README.md                     # Default Vite template README (not inspected in full)
    ├── index.html                    # SPA shell, mounts #root, loads /src/main.jsx
    ├── eslint.config.js              # Flat ESLint config (js + react-hooks + react-refresh)
    ├── vite.config.js                # Vite + @vitejs/plugin-react
    ├── package.json                  # Client manifest + scripts
    ├── package-lock.json             # Locked dependency tree
    ├── public/vite.svg               # Static asset
    └── src/
        ├── main.jsx                  # React entry, StrictMode, createRoot
        ├── App.jsx                   # Router + AuthProvider + 4 routes
        ├── App.css / index.css       # Global styles
        ├── assets/react.svg          # Static asset
        ├── components/
        │   ├── Button.jsx / .css     # Reusable button
        │   ├── Card.jsx / .css        # Reusable card with Header/Body/Footer subcomponents
        │   ├── Input.jsx / .css       # Reusable input
        │   ├── Loading.jsx / .css     # Spinner / fullscreen loader
        │   ├── Navbar.jsx / .css       # Top nav with auth-aware links
        │   ├── ProtectedRoute.jsx      # Auth gate redirecting to /login
        │   └── index.js                # Barrel exports for components
        ├── context/
        │   └── AuthContext.jsx        # Auth state (user/loading/login/logout/loadUser)
        ├── hooks/
        │   ├── useForm.js             # Generic form-state hook (NOT used by Login/Register)
        │   └── index.js               # Barrel export
        ├── constants/
        │   └── index.js               # DEPARTMENTS, YEARS, POSITIONS, ELECTION_CONFIG, API_ENDPOINTS
        ├── pages/
        │   ├── Home.jsx / Home.css     # Marketing landing page
        │   ├── Login.jsx               # Login form
        │   ├── Register.jsx            # Registration form
        │   ├── Dashboard.jsx / .css    # Authenticated user dashboard
        │   ├── Auth.css                # Shared styles for Login/Register
        │   └── index.js                # Barrel export for pages
        └── services/
            └── api.js                 # Axios instance + API call wrappers
```

---

## 3. Tech stack & dependencies

### Languages / runtimes
- **Node.js** with CommonJS modules (backend). No Node version pinned (no `engines` field, no `.nvmrc`).
- **JavaScript ES modules** (client; `"type": "module"`, `client/package.json:5`).
- **ECMAScript 2020 / latest** target for client lint (`client/eslint.config.js:17,20`).

### Backend dependencies (`backend/package.json:14-26`)
| Package | Version | Use (per code) |
|---|---|---|
| express | ^5.2.1 | HTTP server & routing (`server.js`) |
| mongoose | ^9.1.6 | MongoDB ODM (models, `server.js:45`) |
| cors | ^2.8.6 | CORS middleware with origin allowlist (`server.js:21`) |
| cookie-parser | ^1.4.7 | Parse cookies for JWT-in-cookie (`server.js:40`, `auth.middleware.js:26`) |
| dotenv | ^17.2.4 | Load `.env` (`server.js:8`, seeds) |
| bcryptjs | ^3.0.3 | Password hashing (`Student.model.js`, `User.js`, `seed.js`) |
| jsonwebtoken | ^9.0.3 | Sign/verify JWTs (`auth.controller.js`, middleware, `routes/auth.js`) |
| express-validator | ^7.3.1 | Request validation — used only in `routes/auth.js` (NOT mounted) |
| nodemon (dev) | ^3.1.11 | Dev auto-reload (`npm run dev`) |

### Client dependencies (`client/package.json:12-27`)
| Package | Version | Use (per code) |
|---|---|---|
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | DOM renderer (`main.jsx`) |
| react-router-dom | ^7.13.0 | Routing (`App.jsx`, pages, Navbar) |
| axios | ^1.13.4 | HTTP client (`services/api.js`) |
| vite (dev) | ^7.2.4 | Build tool / dev server |
| @vitejs/plugin-react (dev) | ^5.1.1 | React plugin for Vite |
| eslint (dev) | ^9.39.1 | Linter |
| @eslint/js (dev) | ^9.39.1 | ESLint base config |
| eslint-plugin-react-hooks (dev) | ^7.0.1 | React hooks lint rules |
| eslint-plugin-react-refresh (dev) | ^0.4.24 | React Fast Refresh lint rules |
| globals (dev) | ^16.5.0 | Global var definitions for ESLint |
| @types/react, @types/react-dom (dev) | ^19.2.x | Type definitions (no TS config present) |

### Database
- **MongoDB** (MongoDB Atlas, per `.env` connection string and seed logs). Database name `clg_voting` (`backend/.env:2`).

---

## 4. Entry points & run commands

### Backend (`backend/package.json:6-10`)
- `npm start` → `node server.js` — starts Express server.
- `npm run dev` → `nodemon server.js` — dev mode with auto-reload.
- `npm test` → `echo "Error: no test specified" && exit 1` — **no tests configured**.
- App entry: `backend/server.js` — listens on `process.env.PORT || 5000` (`server.js:70-74`).
- Seed scripts (run manually): `node seed.js` (seeds `User` model), `node seed.students.js` (seeds `Student` model).

### Client (`client/package.json:6-11`)
- `npm run dev` → `vite` — dev server (default port 5173).
- `npm run build` → `vite build` — production build to `dist/`.
- `npm run lint` → `eslint .` — lint.
- `npm run preview` → `vite preview` — preview built output.
- App entry: `client/index.html` → `client/src/main.jsx`.

### Docker / compose
- `Not found in code` — no Dockerfile, docker-compose, or container config present.

---

## 5. Configuration & environment

### Backend env vars (referenced in code)
| Variable | Referenced at | Purpose |
|---|---|---|
| `MONGODB_URI` | `server.js:45`, `config/db.js:5`, `seed.js:112`, `seed.students.js:70` | MongoDB connection string |
| `JWT_SECRET` | `auth.controller.js:19`, `middleware/auth.js:13`, `auth.middleware.js:41,166`, `routes/auth.js:39,91` | JWT signing/verification secret |
| `JWT_EXPIRE` | `auth.controller.js:20` | JWT expiry, defaults to `'7d'` |
| `NODE_ENV` | `auth.controller.js:36` | Toggles `secure` cookie flag in production |
| `CLIENT_URL` | `server.js:18` | Added to CORS origin allowlist |
| `PORT` | `server.js:70` | Server port, defaults to `5000` |

### Client env vars
| Variable | Referenced at | Purpose |
|---|---|---|
| `VITE_API_URL` | `client/src/services/api.js:4` | API base URL; defaults to `http://localhost:5000/api` |

### Config files
- `backend/.env` — **present on disk and gitignored** (`backend/.gitignore:2`). It contains real, populated values: `PORT=5000`, a MongoDB Atlas SRV URI with embedded username/password (`voter_user` / a password), `JWT_SECRET=clg_voting_jwt_secret_2024_secure_key`, `JWT_EXPIRE=7d`, `NODE_ENV=development`, `CLIENT_URL=http://localhost:5175` (`backend/.env:1-6`). No `.env.example` exists.
- `client/.env` — **tracked in git**, contains `VITE_API_URL=http://localhost:5000/api` (`client/.env:1`).
- Feature flags: `Not found in code`.
- Secrets expected in: `backend/.env` (JWT secret, DB credentials). DB credentials are currently hard-present in that local file.

### CORS allowlist (`server.js:13-19`)
- Hard-coded origins: `http://localhost:5173`, `:5174`, `:5175`, `:3000`, plus `process.env.CLIENT_URL`. `credentials: true`. Requests with no origin are allowed (`server.js:23-24`).

---

## 6. Architecture facts

- **Two-tier app:** React SPA (`client/`) calls a REST API (`backend/`) over HTTP; backend persists to MongoDB via Mongoose.
- **Backend wiring (`server.js`):** loads dotenv → builds Express app → CORS → `express.json()` + `urlencoded` + `cookieParser` → `connectDB()` (inline, `server.js:43-53`) → mounts `/api/auth` (`./routes/auth.routes`, `server.js:56`) and `/api/users` (`./routes/users`, `server.js:57`) → health route `GET /` → error-handling middleware (`server.js:65-68`).
- **Two parallel, divergent auth implementations exist:**
  - **Active auth path:** `routes/auth.routes.js` → `controllers/auth.controller.js` → `models/Student.model.js`, protected by `middleware/auth.middleware.js` (`protect` sets `req.student`).
  - **Alternate/legacy path (partially wired):** `routes/auth.js` (inline handlers, `express-validator`, `User` model) — **not mounted in `server.js`**. `routes/users.js` **is mounted** and uses `models/User.js` + `middleware/auth.js` (`protect` sets `req.user`).
  - Consequence (factual): tokens are issued by `auth.controller.js` after creating a `Student` document; `routes/users.js` then calls `User.findById(req.user.id)` against the separate `User` collection (`routes/users.js:11,24`). The collections are distinct Mongoose models (`Student` vs `User`).
- **`config/db.js`** exports a `connectDB` helper but is not imported anywhere; `server.js` defines its own inline `connectDB`.
- **Frontend wiring (`App.jsx`):** `AuthProvider` wraps `Router`; `Navbar` always rendered; `Routes` define `/`, `/login`, `/register`, `/dashboard` (the last wrapped in `ProtectedRoute`).

---

## 7. Data layer

- **DB engine:** MongoDB via Mongoose ODM. Database `clg_voting`.
- **Four Mongoose models defined:**

### `Student` (`models/Student.model.js`) — active auth model
| Field | Type | Constraints |
|---|---|---|
| studentId | String | required, unique, trim, uppercase, indexed (`:12-19`) |
| name | String | required, trim, min 2, max 50 (`:20-26`) |
| email | String | required, unique, lowercase, trim, regex-validated (`:27-37`) |
| department | String | required, enum: CSE/ECE/EEE/MECH/CIVIL/IT/AIDS/AIML/CSM (`:38-46`) |
| year | Number | required, min 1, max 4 (`:47-52`) |
| password | String | required, min 6, `select: false` (`:53-58`) |
| role | String | enum student/admin, default `student` (`:59-63`) |
| hasVoted | Boolean | default false (`:64-67`) |
| isActive | Boolean | default true (`:68-71`) |
| lastLogin | Date | optional (`:72-74`) |
- `timestamps: true`; `toJSON` transform strips `password` and `__v` (`:77-85`).
- Compound index `{ email: 1, studentId: 1 }` (`:89`).
- Hooks/methods: `pre('save')` bcrypt hash (salt 12) when password modified (`:94-102`); `comparePassword()` (`:109-111`); `getPublicProfile()` (`:117-129`); static `findByCredentials(identifier)` searches email or studentId where `isActive`, selecting `+password` (`:136-144`).

### `User` (`models/User.js`) — used by `routes/auth.js`, `routes/users.js`, `seed.js`
| Field | Type | Constraints |
|---|---|---|
| studentId | String | required, unique, trim, uppercase (`:5-11`) |
| name | String | required, trim (`:12-16`) |
| email | String | required, unique, lowercase, trim (`:17-23`) |
| department | String | required, trim (no enum) (`:24-28`) |
| year | String | enum `1st Year`/`2nd Year`/`3rd Year`/`4th Year`, required (`:29-33`) |
| password | String | required, min 6 (`:34-38`) |
| role | String | enum student/admin, default student (`:39-43`) |
| hasVoted | Boolean | default false (`:44-47`) |
| createdAt | Date | default Date.now (`:48-51`) |
- `pre('save')` bcrypt hash (salt 10) (`:55-61`); `matchPassword()` (`:64-66`).
- Note: `year` is `String` enum here vs `Number` 1–4 in `Student`; `department` has no enum here.

### `Candidate` (`models/Candidate.js`) — defined, not referenced by any route
| Field | Type | Constraints |
|---|---|---|
| name | String | required, trim (`:4-8`) |
| position | String | required, trim (`:9-13`) |
| department | String | required, trim (`:14-18`) |
| description | String | trim (`:19-22`) |
| image | String | default `''` (`:23-26`) |
| votes | Number | default 0 (`:27-30`) |
| createdAt | Date | default Date.now (`:31-34`) |

### `Vote` (`models/Vote.js`) — defined, not referenced by any route
| Field | Type | Constraints |
|---|---|---|
| voter | ObjectId | ref `User`, required (`:4-8`) |
| candidate | ObjectId | ref `Candidate`, required (`:9-13`) |
| position | String | required (`:14-17`) |
| votedAt | Date | default Date.now (`:18-21`) |
- Unique compound index `{ voter: 1, position: 1 }` — one vote per user per position (`:25`).

### Migrations / ORMs
- No migration framework. Schema is code-defined via Mongoose. Seeding via `seed.js` and `seed.students.js` (both `deleteMany({})` then re-create).

---

## 8. API surface

### Backend routes actually mounted (`server.js:56-62`)
| Method | Path | Handler | Auth | Purpose |
|---|---|---|---|---|
| GET | `/` | `server.js:60-62` | none | Health check, returns welcome JSON |
| POST | `/api/auth/register` | `auth.controller.register` (`auth.routes.js:29`) | public | Register a Student; returns token + cookie |
| POST | `/api/auth/login` | `auth.controller.login` (`auth.routes.js:34`) | public | Login by email or studentId |
| GET | `/api/auth/me` | `auth.controller.getMe` (`auth.routes.js:43`) | `protect` | Current student profile |
| POST | `/api/auth/logout` | `auth.controller.logout` (`auth.routes.js:48`) | `protect` | Clears token cookie |
| PUT | `/api/auth/password` | `auth.controller.updatePassword` (`auth.routes.js:53`) | `protect` | Change password |
| GET | `/api/users/me` | `routes/users.js:9` | `auth` (middleware/auth.js) | Current user via `User` model |
| GET | `/api/users` | `routes/users.js:22` | `auth` + role check | List all users (admin only) |

### Defined but NOT mounted
- `routes/auth.js` — `POST /register` (`:10`) and `POST /login` (`:64`) using `User` model + `express-validator`. Never `require`d by `server.js`.

### Endpoints the frontend calls (`client/src/services/api.js`)
| Function | Method/Path | Backend exists? |
|---|---|---|
| registerUser | POST `/auth/register` (`:17`) | Yes |
| loginUser | POST `/auth/login` (`:18`) | Yes |
| getCurrentUser | GET `/auth/me` (`:19`) | Yes |
| getCandidates | GET `/candidates` (`:22`) | **No backend route** |
| getCandidate | GET `/candidates/:id` (`:23`) | **No backend route** |
| castVote | POST `/votes` (`:26`) | **No backend route** |
| getResults | GET `/votes/results` (`:27`) | **No backend route** |
- `client/src/constants/index.js:38-56` (`API_ENDPOINTS`) also lists `/auth/logout`, `/users/me`, `/users`, `/candidates`, `/votes`, `/votes/results` — superset, partly unimplemented.

### External / third-party APIs called
- **MongoDB Atlas** (network DB connection, `backend/.env:2`). No other outbound third-party HTTP APIs found in code.

---

## 9. Authentication & authorization

- **Mechanism:** JWT (HS256 via `jsonwebtoken`), token returned in JSON body and set as an httpOnly cookie named `token` (`auth.controller.js:40-44`).
- **Token payload:** `{ id: studentId, role }` (`auth.controller.js:17`). Expiry `JWT_EXPIRE` or `'7d'`.
- **Cookie options:** `httpOnly: true`, `secure` only in production, `sameSite: 'strict'`, 7-day expiry (`auth.controller.js:33-38`).
- **Password security:** bcrypt hash, salt rounds 12 (`Student.model.js:100`); 10 in `User.js:59` and `seed.js:124`.
- **Enforcement middleware:**
  - `auth.middleware.protect` (`auth.middleware.js:14-101`): reads token from `Authorization: Bearer` header or `cookies.token`; verifies; loads `Student`; checks `isActive`; attaches `req.student`; returns coded errors (`NO_TOKEN`, `INVALID_TOKEN`, `TOKEN_EXPIRED`, `ACCOUNT_DEACTIVATED`).
  - `auth.middleware.authorize(...roles)` (`:108-129`): role-gate returning 403 `FORBIDDEN`.
  - `auth.middleware.checkNotVoted` (`:135-145`): 403 `ALREADY_VOTED` if `req.student.hasVoted` — **defined but not attached to any route**.
  - `auth.middleware.optionalAuth` (`:151-190`): attaches `req.student` if a valid token exists, else continues — **not attached to any route**.
  - `middleware/auth.js` (`:3-19`): simpler guard; header-only `Authorization: Bearer`; sets `req.user = decoded`; used by `routes/users.js`.
- **Client-side:** token stored in `localStorage` (`AuthContext.jsx:39`, `api.js:9`); axios request interceptor adds `Authorization: Bearer` header (`api.js:8-14`); `ProtectedRoute` redirects to `/login` when no `user` (`ProtectedRoute.jsx:12-14`).
- **Authorization in frontend:** route protection only via `ProtectedRoute` on `/dashboard`. Role-based UI hints in `Dashboard.jsx:87` (admin badge) but no enforcement.

---

## 10. Core logic

| Function | File | What it does |
|---|---|---|
| `generateToken` | `auth.controller.js:16-22` | Signs JWT with `{id, role}` |
| `sendTokenResponse` | `auth.controller.js:30-45` | Sets cookie + returns token & public profile |
| `register` | `auth.controller.js:52-122` | Validates fields, dedupes by email/studentId, creates Student, returns token; handles ValidationError & duplicate-key (11000) |
| `login` | `auth.controller.js:129-182` | Accepts email or studentId, verifies password, updates `lastLogin`, returns token |
| `getMe` | `auth.controller.js:189-211` | Returns current student profile |
| `logout` | `auth.controller.js:218-228` | Overwrites token cookie with short-lived dummy |
| `updatePassword` | `auth.controller.js:235-285` | Verifies current password, sets new (re-hashed via pre-save) |
| `findByCredentials` | `Student.model.js:136-144` | Static: find active student by email or studentId |
| `comparePassword` | `Student.model.js:109-111` | bcrypt compare |
| `getPublicProfile` | `Student.model.js:117-129` | Returns whitelisted student fields |
| `seedDatabase` | `seed.students.js:66-112` / `seed.js:108-157` | Wipes and re-creates 5 records |
| `useForm` | `client/src/hooks/useForm.js:9-74` | Generic controlled-form state/validation hook (unused by current pages) |
| `loadUser` | `client/src/context/AuthContext.jsx:27-36` | Fetches `/auth/me`, sets `user` from `data.student` |
| Login `handleSubmit` | `client/src/pages/Login.jsx:21-35` | Calls `loginUser`, stores token via `login(data.token, data.student)` |
| Register `handleSubmit` | `client/src/pages/Register.jsx:27-54` | Client-side confirm-password check, calls `registerUser` |

- No vote-tallying, candidate-management, or results-aggregation logic exists in backend code.

---

## 11. Background / async work

- `Not found in code` — no jobs, queues, cron, workers, websockets, or streaming. All request handling is synchronous request/response.

---

## 12. Tests

- **No test framework configured.** Backend `npm test` is a placeholder that exits 1 (`backend/package.json:9`). No client test script. No test files (`*.test.*`, `*.spec.*`) in repo.
- `API_EXAMPLES.md` provides manual HTTP request/response examples for the 5 `/api/auth/*` endpoints (documentation, not executable tests).
- Rough automated-test count: **0**.

---

## 13. Build, CI/CD & deployment

- **Client build:** Vite (`vite build` → `dist/`), `vite.config.js` with React plugin only.
- **Backend build:** none (run directly with Node/nodemon).
- **CI/CD:** `Not found in code` — no `.github/workflows`, no CI config.
- **Containers / IaC:** `Not found in code` — no Dockerfile, compose, Terraform, etc.
- **Deploy scripts / hosting:** `Not found in code`. MongoDB Atlas is the only managed-service indicator (`backend/.env`).
- **Environment stages:** only `NODE_ENV` referenced (`auth.controller.js:36`); `.env` sets `development`.

---

## 14. Observability

- **Logging:** `console.log` / `console.error` only — DB connect status (`server.js:46,48`), CORS blocks (`server.js:29`), per-handler error logs (`auth.controller.js`), error-middleware `console.error(err.stack)` (`server.js:66`), and seed-script progress logs.
- **Monitoring / error tracking / metrics:** `Not found in code` — no Sentry, no APM, no metrics endpoints, no structured logger.

---

## 15. Performance / scale features

- **Indexes:** `studentId` indexed + compound `{email, studentId}` on Student (`Student.model.js:18,89`); unique `{voter, position}` on Vote (`Vote.js:25`); `unique` on studentId/email fields.
- **Caching / pagination / rate limiting / batching:** `Not found in code`. `GET /api/users` returns all users unbounded (`routes/users.js:29`).
- **Password hashing cost:** bcrypt salt 12 (Student) / 10 (User, seed).

---

## 16. Code-quality signals

- **Linters/formatters/type-checkers:** ESLint flat config on client only (`client/eslint.config.js`) — `@eslint/js` recommended + react-hooks + react-refresh; rule `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'`. No ESLint/Prettier on backend. No TypeScript config despite `@types/react*` being installed.
- **TODO/FIXME/HACK comments:** None found in source. The only `grep` hit for `XXX` is inside a base64 integrity hash in `backend/package-lock.json:1293` (not a real comment).
- **Notable factual inconsistencies (verifiable from code):**
  - Two divergent user models (`Student` vs `User`) with conflicting `year` types (Number 1–4 vs String enum) and differing department validation.
  - `routes/users.js` (mounted) queries the `User` collection while authentication issues tokens against `Student` documents.
  - `routes/auth.js` and `config/db.js` are dead code (never imported).
  - Frontend calls `/candidates` and `/votes*` endpoints that have no backend implementation; `App.jsx` links to `/vote`, `/results`, `/candidates` routes that are not defined in the router.
  - `seed.js` and `seed.students.js` both seed 5 records into different collections with overlapping data (e.g., `STU005` admin vs `ADMIN001` admin).

---

## 17. Metrics / data present

- **Seed data:** 5 sample students in each seed file (`seed.students.js:17-63`, `seed.js:59-105`), all with password `password123` (admin `admin123` in `seed.students.js`).
- **Hard-coded display numbers** in `Home.jsx`: "5000+ Registered Voters", "12 Candidates", "99.9% Uptime" (`Home.jsx:67-78`) — static marketing copy, not real metrics.
- **Election config** (static): `Campus Elections 2026`, start `2026-02-01`, end `2026-02-10`, results `2026-02-11` (`constants/index.js:31-36`).
- No datasets, benchmarks, or real analytics in repo.

---

## 18. Git facts

- **Commit count:** 2 (`git rev-list --count HEAD`).
- **Commits:** `f73e7ca initial commit`, `7137145 first commit`.
- **Contributors:** 1 author — `Karthik Battiprolu <your_email@example.com>` (the configured git email is the placeholder `your_email@example.com`).
- **Last commit date:** 2026-02-06 23:13:50 +0530.
- **Current branch:** `main`.
- **Uncommitted changes at audit time** (per git status): modified `backend/server.js`, `client/src/constants/index.js`, `client/src/context/AuthContext.jsx`, `client/src/pages/Login.jsx`, `client/src/pages/Register.jsx`, `client/src/services/api.js`.

---

## 19. Unknowns (not determinable from code)

- Intended canonical auth model — whether `Student` or `User` is meant to be authoritative (both exist and partly wired).
- Whether `Candidate`/`Vote` models and the `/candidates` & `/votes` frontend calls represent planned-but-unbuilt features or removed ones.
- Production hosting target / deployment process (no infra files).
- Whether the credentials currently in `backend/.env` are live/shared or disposable.
- Intended election rules (e.g., per-position vs single vote, eligibility) beyond the `Vote` unique index.
- Project ownership/team size beyond the single git author with a placeholder email.
- Any frontend `/vote`, `/results`, `/candidates` pages — referenced in navigation/links but not present in `src/pages/` or the router.
