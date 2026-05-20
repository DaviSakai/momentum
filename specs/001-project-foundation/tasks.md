# Tasks: Project Foundation

**Input**: Design documents from `/specs/001-project-foundation/`

**Prerequisites**: `plan.md` (required), `spec.md` (required)

**Tests**: OPTIONAL — manual verification is the primary validation method for this foundation feature.

**Organization**: Tasks grouped by phase. No user stories with user-facing behavior — this is infrastructure setup.

## Phase 1: Setup

**Purpose**: Prepare the repository structure and confirm prerequisites.

- [x] T001 Setup - Confirm feature documents exist under specs/001-project-foundation/ and record missing inputs
- [x] T002 Setup - Confirm Node.js 20+ is available and document the version in use
- [x] T003 Setup - Create database/ directory at project root with migrations/ and seeds/ subdirectories
- [x] T004 [P] Setup - Create docs/decisions/ directory if it does not exist

**Checkpoint**: Repository structure is ready for frontend migration and backend scaffolding.

---

## Phase 2: Frontend Migration (Vite → Next.js)

**Purpose**: Replace the existing Vite + React frontend with a Next.js + React App Router application.

**Learning Checkpoint**: Next.js App Router setup, project initialization, layout system, CSS organization, migration from one framework to another.

- [x] T005 Frontend - Back up existing frontend/src/ content to a temporary reference location within the workspace
- [x] T006 Frontend - Remove Vite configuration files (vite.config.js, index.html) and Vite dependencies from frontend/package.json
- [x] T007 Frontend - Initialize Next.js + React application in frontend/ with App Router using `npx create-next-app`
- [x] T008 Frontend - Create root layout in frontend/app/layout.js with HTML metadata, lang attribute, global CSS import, and semantic body structure (header, main, footer)
- [x] T009 Frontend - Create landing page in frontend/app/page.js with Momentum branding, project description, and responsive layout
- [x] T010 Frontend - Create global CSS in frontend/app/globals.css with CSS reset, typography, responsive variables, and dark mode foundation
- [x] T011 [P] Frontend - Create frontend/src/components/ directory for shared UI components
- [x] T012 [P] Frontend - Create frontend/src/features/ directory for feature-specific components
- [x] T013 [P] Frontend - Create frontend/src/hooks/ directory for shared React hooks
- [x] T014 [P] Frontend - Create frontend/src/services/api.js with base API client configuration pointing to backend URL from environment
- [x] T015 [P] Frontend - Create frontend/src/styles/ directory for additional CSS files
- [x] T016 [P] Frontend - Create frontend/src/lib/ directory for utility functions
- [x] T017 Frontend - Create frontend/.env.example with NEXT_PUBLIC_API_URL=http://localhost:3001/api
- [x] T018 Frontend - Verify `npm run dev` starts Next.js on port 3000 and the landing page renders correctly

**Checkpoint**: Frontend runs as a Next.js application. Vite is fully removed. Directory structure matches plan.md. Landing page is responsive.

---

## Phase 3: Backend Scaffold

**Purpose**: Create the Node.js + Express backend with modular route/controller/service/model structure and a health endpoint.

**Learning Checkpoint**: Express project setup, modular route organization, middleware configuration, error handling, CORS setup.

- [x] T019 Backend - Initialize backend/package.json with project metadata and dev/start scripts
- [x] T020 Backend - Install production dependencies: express, cors, dotenv, better-sqlite3
- [x] T021 Backend - Install dev dependencies: nodemon
- [x] T022 Backend - Create backend/server.js as the application entry point that loads environment, initializes Express, registers middleware, mounts routes, and starts listening
- [x] T023 Backend - Create backend/src/routes/index.js as the central route registry that mounts all feature route modules under /api
- [x] T024 [P] Backend - Create backend/src/routes/healthRoutes.js with GET /health route
- [x] T025 [P] Backend - Create backend/src/controllers/healthController.js returning { status: "ok", timestamp: ISO }
- [x] T026 Backend - Create backend/src/middlewares/errorHandler.js with global error handler returning { error: { code, message } }
- [x] T027 [P] Backend - Create backend/src/middlewares/notFoundHandler.js for unknown routes returning 404
- [x] T028 [P] Backend - Create empty backend/src/services/ directory with .gitkeep
- [x] T029 [P] Backend - Create empty backend/src/models/ directory with .gitkeep
- [x] T030 [P] Backend - Create empty backend/src/validators/ directory with .gitkeep
- [x] T031 [P] Backend - Create empty backend/src/utils/ directory with .gitkeep
- [x] T032 Backend - Create backend/.env.example with PORT=3001, DATABASE_PATH, NODE_ENV, and CORS_ORIGIN variables
- [x] T033 Backend - Verify `npm run dev` starts Express on port 3001 and GET /api/health returns 200

**Checkpoint**: Backend runs with a modular structure. Health endpoint responds. Error handling works. All directories match plan.md.

---

## Phase 4: Database Infrastructure

**Purpose**: Set up SQLite connectivity and migration system for future feature data persistence.

**Learning Checkpoint**: SQLite setup with better-sqlite3, migration system design, schema versioning, database portability.

- [x] T034 Database - Create backend/src/database/connection.js with SQLite connection using better-sqlite3 and environment-based path configuration
- [x] T035 Database - Create backend/src/database/migrator.js that reads .sql files from database/migrations/ and applies them in order, tracking applied migrations
- [x] T036 Database - Create database/migrations/.gitkeep to preserve the empty migrations directory
- [x] T037 Database - Add database initialization call to backend/server.js startup sequence (connect, run pending migrations)
- [x] T038 Database - Verify database file is created at the configured path when the server starts
- [x] T039 [P] Database - Add database/ and *.sqlite to .gitignore if not already excluded

**Checkpoint**: SQLite database is created automatically on server start. Migration system is ready for feature schemas.

---

## Phase 5: Integration and Development Workflow

**Purpose**: Connect frontend and backend for concurrent development and configure cross-origin communication.

- [x] T040 Integration - Create root-level package.json with concurrent dev script using `concurrently` to run both frontend and backend
- [x] T041 Integration - Install concurrently as a root dev dependency
- [x] T042 Integration - Verify `npm run dev` from project root starts both frontend (3000) and backend (3001)
- [x] T043 Integration - Verify frontend can reach backend health endpoint through the API client (CORS works)

**Checkpoint**: Full development workflow operational from a single root command.

---

## Phase 6: Documentation and Polish

**Purpose**: Update project documentation to reflect the new architecture and provide clear setup instructions.

- [x] T044 Docs - Update root README.md with English setup instructions covering: prerequisites, clone, install, environment setup, database, dev server, and project structure
- [x] T045 Docs - Update frontend/README.md to reflect Next.js + React architecture
- [x] T046 Docs - Update backend/README.md with Express server documentation
- [x] T047 [P] Docs - Create docs/decisions/001-project-foundation.md documenting the Vite → Next.js migration rationale, dependency choices, and architecture decisions
- [x] T048 Cleanup - Remove unused Vite build artifacts from frontend/dist/ if present
- [x] T049 Cleanup - Verify .gitignore covers node_modules, .env, database files, .next, and dist in all relevant directories

**Checkpoint**: Documentation is complete. A new developer or AI agent can follow the README to set up the project.

---

## Final Phase: Validation

**Purpose**: Cross-cutting validation of the complete project foundation.

- [x] T050 Integration - Run the full setup flow from scratch: clone → install → env → migrate → dev
- [x] T051 UX - Validate landing page layout on mobile (375px), tablet (768px), and desktop (1280px)
- [x] T052 UX - Verify semantic HTML structure and heading hierarchy on the landing page
- [x] T053 Backend - Verify GET /api/health returns correct JSON with 200 status
- [x] T054 Backend - Verify unknown routes return 404 with error JSON
- [x] T055 Database - Verify SQLite database file is created and migration tracking works
- [x] T056 Frontend - Verify no Vite references remain in frontend/ (package.json, config files, imports)
- [x] T057 Docs - Verify README setup instructions produce a working development environment

**Checkpoint**: Project foundation is complete, documented, and ready for 002-auth implementation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; start immediately.
- **Frontend Migration (Phase 2)**: Depends on Setup.
- **Backend Scaffold (Phase 3)**: Depends on Setup. Can run in parallel with Phase 2.
- **Database (Phase 4)**: Depends on Phase 3 (backend exists).
- **Integration (Phase 5)**: Depends on Phases 2, 3, and 4.
- **Documentation (Phase 6)**: Depends on Phase 5.
- **Validation (Final)**: Depends on all phases.

### Parallel Execution Rules

- Phases 2 and 3 can run in parallel (different directories).
- Within Phase 2, T011–T016 are parallel (independent directories).
- Within Phase 3, T024–T031 are partially parallel (independent files).
- Phases 5+ are sequential.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup.
2. Complete Phase 2: Frontend Migration + Phase 3: Backend Scaffold (parallel).
3. Complete Phase 4: Database.
4. Complete Phase 5: Integration.
5. Validate the full stack works end to end.
6. Complete Phase 6: Documentation.

### AI-Assisted Execution

1. Give AI agents `spec.md`, `plan.md`, and this `tasks.md`.
2. Assign frontend and backend work to separate agents if parallel.
3. Integration and validation require full-stack context.

---

## Technical Debt & Deferred Work

- **Postponed Refactors**: None — clean start.
- **Temporary Shortcuts**: Landing page is minimal placeholder. Will be replaced by 003-dashboard.
- **Known Limitations**: No auth, no data features, no production config.
- **Future Improvements**: TypeScript migration, automated testing framework, Docker support, CI/CD.
- **Dependency Review Items**: Review `better-sqlite3` when PostgreSQL migration begins. Review `concurrently` vs alternative workspace tools.

---

## Notes

- This is a foundation-only feature. No user-facing functionality beyond a placeholder landing page.
- The frontend migration is a full replacement, not an incremental adaptation.
- All database schema types must be PostgreSQL-portable.
- The backend error response shape established here becomes the project standard.
- Every future feature will reference this foundation's directory structure.
