# Implementation Plan: Project Foundation

**Branch**: `001-project-foundation` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-project-foundation/spec.md`

## Summary

**Primary Requirement**: Establish the complete Momentum project architecture — migrate the frontend from Vite to Next.js + React, scaffold the backend with Node.js + Express, set up SQLite database infrastructure, configure environment variables, and create development workflow scripts.

**User Value**: Enables all future feature development on a consistent, constitution-compliant foundation.

**Affected Momentum Module**: Shared platform

**Implementation Strategy**: Replace the existing Vite frontend with a fresh Next.js + React App Router setup. Create the Express backend from scratch with a modular route/controller/service/model structure. Add SQLite connectivity with a migration system. Wire both applications together with environment configuration and a root-level concurrent development script.

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js 15 + React 19, modern CSS, responsive-first layout

**Backend**: Node.js + Express 4, REST API, modular structure

**Storage**: SQLite via `better-sqlite3`; schema designed for future PostgreSQL portability

**API Style**: Explicit REST contracts between frontend (port 3000) and backend (port 3001)

**Testing**: Manual verification of server startup, health endpoint, and database creation

**Target Platform**: Responsive web application

**Project Type**: Decoupled web application with separate frontend and backend

**Performance Goals**: Development server starts within 10 seconds

**Constraints**: API-first boundary, minimal dependencies, clean module separation, MVP scope

**Scale/Scope**: Single-developer local MVP

**Future Compatibility**: PostgreSQL-portable schema types, analytics-ready data model patterns, AI-friendly structured APIs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Clean Code and Boundaries**: Frontend (Next.js) and backend (Express) have completely separate codebases. Backend follows route → controller → service → model layering. No shared runtime code.
- **Next.js + React Alignment**: Migrating from Vite to Next.js App Router. This is the primary purpose of US1.
- **Decoupled API-First Design**: Frontend communicates with backend exclusively through REST API calls via service modules. No direct database access from frontend.
- **Modular Backend Services**: Express routes are thin. Business logic will live in services. Database access in models/repositories.
- **Responsive-First UX**: Landing page uses mobile-first CSS. Constitution principle II satisfied.
- **Required UI States**: Landing page is static — no async flows. Future features will use the layout shell for loading/error/empty states.
- **Minimal Dependencies**: Only essential dependencies: `next`, `react`, `react-dom` (frontend); `express`, `better-sqlite3`, `cors`, `dotenv` (backend). Each justified below.
- **MVP Discipline**: No user-facing features beyond a placeholder landing page. Auth, dashboard, and all data features are deferred.
- **Learning and Maintainability**: Documents Next.js migration, Express setup, SQLite connectivity, and project architecture patterns.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- Next.js + React frontend with App Router, basic layout, landing page
- Express backend with route/controller/service/model structure and health endpoint
- SQLite database connection and migration infrastructure
- Environment configuration with `.env.example` files
- Root-level concurrent development script
- Updated documentation

**Explicitly Excluded**:

- User authentication (002-auth)
- Dashboard UI (003-dashboard)
- Any data-driven features
- Production deployment, Docker, CI/CD
- PostgreSQL configuration
- TypeScript migration
- Automated testing setup

**Dependencies With Other Features**:

- All subsequent features (002–006) depend on this foundation.

**Assumptions**:

- [ASSUMPTION: Next.js 15 with App Router is the target version.]
- [ASSUMPTION: `better-sqlite3` for synchronous SQLite access.]
- [ASSUMPTION: `concurrently` npm package for running frontend + backend together.]

**Open Questions**:

- [NEEDS CLARIFICATION: Preferred CSS approach — CSS Modules, global CSS, or a combination? Default assumption: global CSS + CSS Modules for components.]

## Architecture Decisions

**Frontend Route Structure**: Next.js App Router with `app/` directory. Root layout in `app/layout.js`, landing page in `app/page.js`. Future routes will be added as directories under `app/`.

**Frontend Component Boundaries**: `src/components/` for shared UI components. `src/features/` for feature-specific components (empty initially). `src/services/` for API client modules. `src/styles/` for global CSS.

**Backend Route/Controller/Service Structure**:
- `src/routes/` — Express route registration
- `src/controllers/` — HTTP request/response handling
- `src/services/` — Business logic (empty initially)
- `src/models/` — Database access (empty initially)
- `src/middlewares/` — CORS, error handling, future auth
- `src/database/` — SQLite connection, migration runner
- `src/utils/` — Shared helpers

**Database Entities**: None in this phase. Migration infrastructure only.

**API Boundaries**: `GET /api/health` returns `{ "status": "ok", "timestamp": "<ISO>" }`. All future endpoints under `/api/`.

**Authentication Impact**: N/A — deferred to 002-auth.

**Analytics/Reporting Impact**: N/A — infrastructure only.

**Future AI Impact**: N/A — but structured API responses and database schema patterns established here will support future AI data consumption.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-foundation/
|-- spec.md
|-- plan.md
|-- tasks.md
`-- checklist.md
```

### Source Code (repository root)

```text
backend/
|-- src/
|   |-- controllers/
|   |   `-- healthController.js
|   |-- services/
|   |-- routes/
|   |   |-- index.js
|   |   `-- healthRoutes.js
|   |-- models/
|   |-- middlewares/
|   |   |-- errorHandler.js
|   |   `-- cors.js
|   |-- database/
|   |   |-- connection.js
|   |   `-- migrator.js
|   `-- utils/
|-- .env.example
|-- package.json
`-- server.js

frontend/
|-- app/
|   |-- layout.js
|   |-- page.js
|   |-- globals.css
|   `-- page.module.css
|-- src/
|   |-- components/
|   |-- features/
|   |-- hooks/
|   |-- services/
|   |   `-- api.js
|   |-- styles/
|   `-- lib/
|-- .env.example
|-- next.config.js
`-- package.json

database/
|-- migrations/
`-- seeds/

docs/
|-- decisions/
`-- ROADMAP.md
```

**Structure Decision**: Monorepo-style layout with separate `frontend/` and `backend/` directories. Database migrations live at the project root level in `database/migrations/` for shared visibility. The backend `database/` module handles connectivity and migration execution.

## Frontend Plan

**Affected Routes**:

- `/` — Landing page with Momentum branding

**Pages and Layouts**: Root layout (`app/layout.js`) with HTML metadata, global CSS import, and body wrapper. Landing page (`app/page.js`) with project description and branding.

**Components**: Minimal — layout shell only. Header and footer placeholders inside the layout.

**State Management**: None — static page.

**Forms and Validation**: None.

**UI States**:

- **Loading**: N/A — static page
- **Empty**: N/A
- **Error**: Next.js default error page
- **Success**: Page renders correctly

**Responsive Behavior**: Mobile-first layout. Content centered with max-width. Readable typography at all breakpoints. No horizontal scrolling.

**Accessibility Notes**: Semantic HTML (`<header>`, `<main>`, `<footer>`), proper heading hierarchy (`<h1>` for page title), sufficient color contrast, `lang` attribute on `<html>`.

## Backend Plan

**Endpoints**:

- `GET /api/health` — Returns `{ "status": "ok", "timestamp": "..." }`. No authentication required.

**Routes**: `backend/src/routes/healthRoutes.js` registered in `backend/src/routes/index.js`

**Controllers**: `backend/src/controllers/healthController.js` — returns health status JSON

**Services**: None in this phase.

**Models/Data Access**: None in this phase. Database connection module established.

**Validation**: None in this phase.

**Authentication/Authorization**: None — all endpoints are public in this phase.

**Error Handling**: Global error handler middleware returns `{ "error": { "code": "INTERNAL_ERROR", "message": "Something went wrong" } }` for unhandled errors. 404 handler for unknown routes.

## Database Plan

**Tables**: None — migration infrastructure only.

**Migrations/Seeds**: `database/migrations/` directory created. Migration runner in `backend/src/database/migrator.js` reads `.sql` files and executes them in order.

**SQLite → PostgreSQL Compatibility**: Use `INTEGER PRIMARY KEY` instead of `AUTOINCREMENT`. Use `TEXT` for strings (maps to `VARCHAR`/`TEXT` in PostgreSQL). Use ISO 8601 `TEXT` for timestamps (avoids SQLite's lack of native datetime). Use `INTEGER` for booleans (0/1).

## API Contract Plan

**Contract Files**: Not applicable — single health endpoint only.

**Response Shape**:

```json
{
  "status": "ok",
  "timestamp": "2026-05-20T14:00:00.000Z"
}
```

**Error Shape**:

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Something went wrong"
  }
}
```

**Authentication Requirements**: None

## Testing Strategy

**Unit Tests**: None in this phase.

**Integration Tests**: None in this phase.

**API Tests**: None in this phase.

**UI Tests**: None in this phase.

**Manual Testing Checklist**:

- [ ] `npm install` succeeds in both frontend and backend directories
- [ ] Frontend dev server starts and serves a Next.js page at `http://localhost:3000`
- [ ] Backend dev server starts and responds at `http://localhost:3001`
- [ ] `GET /api/health` returns `200` with expected JSON
- [ ] SQLite database file is created when migrations run
- [ ] Root concurrent dev script starts both servers
- [ ] Landing page renders correctly on mobile, tablet, and desktop viewports

## Learning Goals

**Concepts Practiced**: Next.js App Router setup, Express project scaffolding, SQLite connectivity, environment configuration, monorepo-style project organization, migration system design.

**Architecture Decisions Being Learned**: API-first decoupled architecture, controller/service separation in Express, CSS organization in Next.js, database portability considerations.

**Documentation for Future Review**: This plan documents why each dependency was chosen, how the project structure supports future features, and what migration path exists for PostgreSQL.

## Implementation Phases

**Phase 0: Research**: Verify Next.js 15 App Router patterns, confirm `better-sqlite3` compatibility with Node.js 20+, determine migration runner approach.

**Phase 1: Design**: Define folder structure, environment variables, and package dependencies.

**Phase 2: Frontend Migration**: Replace Vite with Next.js. Create layout, landing page, and CSS foundation.

**Phase 3: Backend Scaffold**: Create Express server with modular structure. Implement health endpoint and error handling.

**Phase 4: Database Setup**: Configure SQLite connection. Create migration runner. Set up database directory.

**Phase 5: Integration**: Root-level concurrent dev script. Environment configuration. Cross-origin setup.

**Phase 6: Documentation**: Update README with English setup instructions. Record architecture decisions.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| Replacing Vite entirely (not incremental migration) | Existing Vite code is ~3 files, not worth adapting | Incremental migration adds complexity for minimal code | Complete replacement is the cleanest path |
| `better-sqlite3` as new dependency | SQLite persistence required for all data features | Built-in `fs` is not a database | Review when PostgreSQL migration begins |
| `concurrently` as dev dependency | Running frontend + backend together improves DX | Separate terminals work but add friction | Keep as dev dependency |
