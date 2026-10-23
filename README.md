# Hostel Management System

**Software Engineering Mini Project | Team 3**

## Overview

The Hostel Management System aims to simplify hostel administration by maintaining student records and managing hostel room allocation. It provides a structured way to create, update, search and manage student information and room assignments.

## Objectives

- Maintain student information in a centralized system.
- Manage room details, capacity and occupancy.
- Allocate students to rooms and support room changes and vacation.
- Prevent duplicate allocations and allocation beyond room capacity.
- Improve the organization and retrieval of hostel records.

## Technology Stack

- **Frontend:** React
- **Backend:** Node.js and Express.js
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB 6+ running locally, or a MongoDB Atlas connection string (not needed for the in-memory demo mode below)
- A current Chromium-based browser (Chrome, Edge, Brave)

### Repository structure

```
backend/    Express + Mongoose REST API (src/, scripts/, tests/)
frontend/   React (Vite) single-page app
docs/       SRS, SAD, test plan, backlog, API reference (docs/API.md)
test-data/  Fictional CSV fixtures used by `npm run seed`
test-cases/ Written test cases
```

### Configure and run

```bash
# 1. Backend
cd backend
cp .env.example .env        # then edit MONGODB_URI and JWT_SECRET; .env is git-ignored
npm install
npm run seed                # optional: load the fictional dataset from test-data/ (wipes students, rooms, allocations)
npm run create-admin        # creates the admin from ADMIN_USERNAME / ADMIN_PASSWORD in .env
npm run dev                 # API on http://localhost:5001

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev                 # app on http://localhost:5173 (proxies /api to the backend)
```

**No MongoDB installed?** `cd backend && npm run dev:memory` starts the API on a throw-away in-memory database already loaded with the test dataset and with login switched off. Run the frontend as above. Data disappears when you stop it. (First run downloads a MongoDB binary of about 55 MB.)

`AUTH_ENABLED=false` in `.env` turns login off for local work. With the default `true`, every endpoint except `/api/health` and `/api/auth/*` needs a `Bearer` token from `POST /api/auth/login`.

Port 5000 is avoided on purpose: macOS uses it for AirPlay Receiver.

### Run the tests

```bash
cd backend && npm test      # 38 API tests against an in-memory MongoDB
```

The suite covers validation, duplicate and full-room rules, concurrent-request safety, error format, authentication and the 3-second list/search budget.

### API overview

See [docs/API.md](docs/API.md) for every endpoint, request field and status code.

## Team Members

| Name | USN | Role |
|---|---|---|
| Shailaja | PES1UG24AM449 | Tester |
| Varshitha S | PES1UG24AM454 | QA Lead |
| Krishna Tejas Voruganti | PES1UG24AM436 | Product Owner |
| Aditya Singhal | PES1UG24AM420 | Developer / Dev Lead |

## Project Scope

The core scope includes student record management, room management, room allocation, room changes, room vacation, searching and filtering, and dashboard summaries. Optional features will be included after the team confirms the scope.

## Project Documents

- [Software Requirements Specification (SRS)](docs/SRS_HMS.docx)
- [Software Architecture Document (SAD)](docs/SAD_HMS.docx)
- [Test Plan](docs/Test_Plan_HMS.docx)
- [Backlog Documentation](docs/backlog/Backlog_Document.md)
- [Backlog CSV](docs/backlog/backlog.csv)

## Project Management

- [GitHub Issues](../../issues)
- [Pull Requests](../../pulls)
- [Hostel Management System Project Board](https://github.com/users/Varshitha7-S/projects/1)

## Project Status

The application is implemented (backend API, React frontend, admin login, optional fee tracking and allocation history). Test execution and the final test summary are tracked by the QA team.
