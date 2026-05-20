# Feature Specification: Project Foundation

**Project**: Momentum

**Feature Branch**: `001-project-foundation`

**Created**: 2026-05-20

**Status**: Draft

**Original Input**: Define and prepare the base architecture of Momentum including repository structure, frontend migration, backend setup, database folder structure, environment variables, and development workflow.

**Spec Owner**: AI-assisted development

**Initial Scope**: MVP

<!--
  This specification documents the foundational architecture setup for Momentum.
  It covers migration from Vite to Next.js, backend scaffolding with Express,
  database folder preparation, environment configuration, and documentation workflow.
  No user-facing features are delivered — this is infrastructure-only.
-->

## 1. Feature Name

Project Foundation

**Momentum examples**: This is the architectural base that enables all subsequent features (auth, dashboard, daily check-in, goals, task kanban).

## 2. Context and Goal

Momentum currently has a minimal Vite + React frontend and an empty backend directory. Before any user-facing feature can be built, the project needs a consistent, well-structured foundation that aligns with the constitution's architectural direction: Next.js + React frontend, Node.js + Express backend, SQLite database, and explicit API boundaries.

**Primary Goal**: Establish a clean, documented, and operational project architecture that supports incremental feature development.

**Related Momentum Area**: Shared platform

**Product Connection**: Every future feature (dashboard, daily check-in, habits, goals, kanban, calendar, analytics, reports, AI) depends on this foundation being correct. The architecture decisions made here determine the project's long-term maintainability and scalability.

## 3. User Problem

**Current Problem**: The repository has a Vite + React frontend that conflicts with the constitution's mandate for Next.js + React. The backend directory is empty. There is no database setup, no API structure, no environment configuration, and no development workflow for running frontend and backend together.

**Impact if Unsolved**: Any feature work would be built on an inconsistent foundation, requiring rework. The frontend framework mismatch would create technical debt from day one. The lack of backend structure would force ad-hoc decisions for every feature.

**Desired Outcome**: A developer or AI agent can clone the repository, run a single setup command, and have both frontend and backend running locally with a connected SQLite database, ready for feature implementation.

## 4. Target User

- **Primary User**: The developer (human or AI agent) who will implement Momentum features.
- **Usage Profile**: Development and engineering workflow
- **Expected Experience Level**: Intermediate
- **Expected Frequency**: One-time setup, then continuous use during development
- **Usage Moment**: Project initialization and every development session

## 5. User Stories

### User Story 1 - Next.js Frontend Setup (Priority: P1)

As a developer, I want the frontend migrated from Vite to Next.js + React, so that all future frontend work follows the constitution's framework alignment.

**Priority Rationale**: The constitution mandates Next.js + React. All frontend features depend on this migration being complete.

**Independent Test**: Run `npm run dev` in the frontend directory and see a Next.js development server with a basic landing page at `http://localhost:3000`.

**Related Requirements**: [FR-001, FR-002, FR-003]

**Acceptance Scenarios**:

1. **Given** the frontend directory, **when** `npm run dev` is executed, **then** a Next.js development server starts successfully.
2. **Given** the Next.js app is running, **when** the developer visits `http://localhost:3000`, **then** a basic Momentum landing page is displayed.
3. **Given** the migration is complete, **when** the developer checks `package.json`, **then** Vite dependencies are removed and Next.js + React are the primary dependencies.

---

### User Story 2 - Express Backend Setup (Priority: P1)

As a developer, I want a Node.js + Express backend with a modular route/controller/service structure, so that API development can begin with clean boundaries.

**Priority Rationale**: Every feature that persists data or enforces business rules requires a backend. The structure must be established before any feature-specific code.

**Independent Test**: Run `npm run dev` in the backend directory and receive a JSON response from `GET /api/health`.

**Related Requirements**: [FR-004, FR-005, FR-006]

**Acceptance Scenarios**:

1. **Given** the backend directory, **when** `npm run dev` is executed, **then** an Express server starts on a configured port.
2. **Given** the server is running, **when** `GET /api/health` is requested, **then** a `200` response with `{ "status": "ok" }` is returned.
3. **Given** the backend structure, **when** a developer inspects the `src/` directory, **then** routes, controllers, services, models, middlewares, database, and utils folders exist.

---

### User Story 3 - Database and Environment Setup (Priority: P1)

As a developer, I want SQLite database connectivity and environment configuration, so that features can persist data from day one.

**Priority Rationale**: Data persistence is required by auth, daily check-in, goals, tasks, and every other data-driven feature.

**Independent Test**: Run a migration script and verify a SQLite database file is created with the expected schema.

**Related Requirements**: [FR-007, FR-008, FR-009]

**Acceptance Scenarios**:

1. **Given** the database directory, **when** migrations are executed, **then** a SQLite database file is created at the configured path.
2. **Given** `.env.example` files exist, **when** a developer copies them to `.env`, **then** the application starts with the correct default configuration.
3. **Given** the project root, **when** a developer runs the concurrent dev command, **then** both frontend and backend start together.

---

### User Story 4 - Documentation and Development Workflow (Priority: P2)

As a developer, I want clear documentation and development scripts, so that starting work on Momentum is straightforward.

**Priority Rationale**: Good documentation reduces onboarding friction and supports AI-assisted development.

**Independent Test**: Follow the README setup instructions and have the full stack running within 5 minutes.

**Related Requirements**: [FR-010, FR-011]

**Acceptance Scenarios**:

1. **Given** the README, **when** a developer follows the setup instructions, **then** both frontend and backend are running locally.

## 6. Main User Flow

1. Developer clones the repository.
2. Developer copies `.env.example` to `.env` in both frontend and backend directories.
3. Developer runs `npm install` in both frontend and backend directories.
4. Developer runs the database migration command.
5. Developer runs the concurrent dev script from the project root.
6. Frontend starts on `http://localhost:3000` (Next.js).
7. Backend starts on `http://localhost:3001` (Express).
8. Developer confirms the health endpoint responds.

**Expected Successful End State**: Both applications are running, the database is initialized, and the project is ready for feature development.

**Relevant Alternative Flows**:

- Developer runs frontend and backend in separate terminals.
- Developer resets the database by re-running migrations.

## 7. Functional Requirements

- **FR-001**: The frontend MUST be a Next.js + React application with the App Router.
- **FR-002**: The frontend MUST have a basic layout with responsive structure.
- **FR-003**: The frontend MUST remove all Vite-specific configuration and dependencies.
- **FR-004**: The backend MUST be a Node.js + Express application with modular structure.
- **FR-005**: The backend MUST expose a `GET /api/health` endpoint returning `{ "status": "ok" }`.
- **FR-006**: The backend MUST have a route/controller/service/model directory structure.
- **FR-007**: The project MUST include a SQLite database connection module.
- **FR-008**: The project MUST include a database migration system.
- **FR-009**: Both frontend and backend MUST have `.env.example` files documenting required variables.
- **FR-010**: The root README MUST include setup instructions in English.
- **FR-011**: The project MUST have a root-level script to run frontend and backend concurrently.

**Out of Scope for This Version**:

- User authentication (see 002-auth)
- Any user-facing features beyond a placeholder landing page
- Production deployment configuration
- CI/CD pipeline
- Docker containerization
- PostgreSQL setup (future migration)

**Requirements Needing Clarification**:

- **FR-012**: [NEEDS CLARIFICATION: Should the root-level concurrent script use `concurrently` npm package or a simple shell script?]

## 8. Non-Functional Requirements

- **NFR-001**: The project structure MUST be clear enough for AI agents to navigate and generate code.
- **NFR-002**: The frontend and backend MUST remain decoupled through explicit API boundaries.
- **NFR-003**: The database schema MUST use only SQLite-compatible types that are portable to PostgreSQL.
- **NFR-004**: Dependencies MUST be minimal and justified.
- **NFR-005**: The development server MUST start within 10 seconds.
- **NFR-006**: The project MUST follow the constitution's clean code and module boundary principles.

## 9. Acceptance Criteria

- **AC-001**: Given a fresh clone, when setup instructions are followed, then both frontend and backend start successfully.
- **AC-002**: Given the frontend is running, when `http://localhost:3000` is accessed, then a Next.js page renders.
- **AC-003**: Given the backend is running, when `GET /api/health` is requested, then `200 { "status": "ok" }` is returned.
- **AC-004**: Given the migration system, when migrations run, then a SQLite database file is created.
- **AC-005**: Given the project structure, when a developer lists directories, then the documented folder structure matches reality.

## 10. Data and Initial Model

### Core Entities

No feature entities are created in this phase. The foundation establishes:

- **Database connection module**: SQLite driver configuration and connection pooling.
- **Migration infrastructure**: Schema versioning system for incremental database changes.

### Minimum MVP Data

- SQLite database file path configuration
- Migration tracking table (auto-created by migration system)

### Derived or Calculated Data

- None in this phase.

## 11. Business Rules

- **BR-001**: The frontend MUST NOT import or reference backend code directly.
- **BR-002**: The backend MUST NOT serve frontend assets in development mode.
- **BR-003**: All API communication MUST use explicit HTTP requests through defined service modules.
- **BR-004**: Database migrations MUST be idempotent and reversible where practical.

**Related Technical Decisions**:

- **TD-001**: Use Next.js App Router (not Pages Router) to align with modern Next.js patterns and prepare for server components if needed later.
- **TD-002**: Use `better-sqlite3` for SQLite connectivity — synchronous API is simpler for a single-user MVP and avoids callback complexity. [ASSUMPTION: `better-sqlite3` is the preferred SQLite library for Node.js in this context.]
- **TD-003**: Keep frontend on port 3000 and backend on port 3001 by default to avoid conflicts.

## 12. Interface States

- **Initial State**: Landing page with Momentum branding and a brief description.
- **Empty State**: Not applicable — no data-driven views in this phase.
- **Loading State**: Not applicable — no async data fetching in this phase.
- **Success State**: Application running, health endpoint responding.
- **Error State**: Clear error messages if environment variables are missing or ports are in use.
- **Responsive/Mobile State**: Landing page must be readable on mobile, tablet, and desktop.

## 13. Required Integrations

- **Frontend**: Next.js App Router, basic layout component, global CSS setup.
- **Backend**: Express server, health route, CORS middleware for frontend communication.
- **Database**: SQLite connection module, migration runner.
- **Authentication**: Not applicable in this phase.
- **Dashboard/Reports**: Not applicable in this phase.
- **External Services**: None.
- **Future AI**: Not applicable in this phase.

## 14. Frontend Impact

- **Pages/Screens**: `/` (landing page), layout wrapper.
- **Components**: Basic layout shell (header, main content area, footer placeholder).
- **Local/Global State**: None in this phase.
- **API Calls**: None in this phase (health check is developer-only).
- **UI Validation**: None.
- **Accessibility**: Semantic HTML structure, readable text, proper heading hierarchy.
- **Responsiveness**: Layout must work on mobile, tablet, and desktop.
- **UX Risks**: None — minimal UI in this phase.

## 15. Backend Impact

- **Expected Endpoints**:
  - `GET /api/health` - Returns server status, used for monitoring and development verification.
- **Server Validation**: None in this phase.
- **Services/Controllers**: Health controller only.
- **Authentication/Authorization**: Not applicable in this phase.
- **API Errors**: Standard 404 for unknown routes, 500 for unexpected errors with safe messages.
- **Future Reuse**: The route/controller/service structure will be reused by every subsequent feature.

## 16. Database Impact

- **New Tables**: None — only migration infrastructure.
- **Changes to Existing Tables**: None.
- **Main Fields**: None.
- **Relationships**: None.
- **Important Indexes or Queries**: None.
- **Data Integrity**: Migration tracking table manages schema versioning.
- **Future Migration Notes**: Use ISO 8601 timestamps, INTEGER for IDs, TEXT for strings. Avoid SQLite-specific features like `AUTOINCREMENT` (use `INTEGER PRIMARY KEY` instead for future PostgreSQL compatibility).

## 17. Errors, Validation, and Edge Cases

- **Input Validation**: None in this phase.
- **Permission Error**: None in this phase.
- **Not Found Error**: Backend returns 404 JSON for unknown API routes.
- **Connection/API Error**: Backend logs connection errors and returns 500 with safe message.
- **Edge Cases**: Port already in use, missing `.env` file, SQLite file permissions.
- **User-Facing Messages**: Not applicable — development-only errors.

## 18. Metrics, Analytics, and Observability

### Product Metrics Generated by This Feature

- None — this is infrastructure only.

### Technical Metrics or Observability Signals

- Server start time logged.
- Health endpoint response time available for monitoring.
- Database connection success/failure logged.

### Future AI Potential

- None directly. The structured data model and API boundaries established here enable future analytics and AI features.

## 19. Technical Learning Points

- **Frontend**: Next.js App Router setup, project migration from Vite, layout system, CSS organization.
- **Backend**: Express server setup, modular route organization, middleware configuration, CORS handling.
- **Database**: SQLite setup, migration system design, schema versioning.
- **Architecture**: Decoupled frontend/backend, API-first design, environment configuration, monorepo-style project organization.
- **Quality**: Clean project structure, documentation-first workflow, constitution compliance.
- **AI-Assisted Development**: How a well-structured foundation enables AI agents to generate consistent feature code.

## 20. Future Enhancements

- Docker development environment
- CI/CD pipeline with GitHub Actions
- Production build and deployment configuration
- PostgreSQL migration support
- Shared TypeScript types between frontend and backend
- API documentation with OpenAPI/Swagger
- Hot-reload for both frontend and backend in development

**When to Revisit This Feature**: After 002-auth is implemented and real data flows through the system, review whether the foundation structure needs adjustment.

## 21. Final Spec Checklist

- [x] The feature problem and goal are clear.
- [x] The target user and usage context are identified.
- [x] User stories are prioritized and independently testable.
- [x] Each main user story has related requirements and acceptance criteria.
- [x] The main flow and relevant alternative flows are described.
- [x] MVP scope is separated from future enhancements.
- [x] Functional requirements are verifiable.
- [x] Non-functional requirements cover UX, responsiveness, security, modularity, and technical evolution.
- [x] Acceptance criteria use observable results.
- [x] Required data, entities, relationships, and ownership are mapped.
- [x] Business rules and relevant technical decisions are described.
- [x] Interface states are covered.
- [x] Frontend, backend, database, authentication, reports, and future AI integrations are considered.
- [x] Predictable errors, validation rules, and edge cases are listed.
- [x] Metrics, analytics, and observability signals are considered.
- [x] Technical learning points are recorded.
- [x] Future enhancements are separated from current scope.
- [ ] Open questions are marked with `[NEEDS CLARIFICATION: ...]`.
- [x] Temporary assumptions are marked with `[ASSUMPTION: ...]`.

## Assumptions

- [ASSUMPTION: The frontend will be completely replaced — not incrementally migrated — from Vite to Next.js. The existing Vite code is minimal enough that starting fresh with Next.js is simpler than adapting.]
- [ASSUMPTION: `better-sqlite3` is the preferred SQLite library for the backend.]
- [ASSUMPTION: The project root will have a `package.json` with a concurrent dev script to run both frontend and backend.]
- [ASSUMPTION: Frontend runs on port 3000, backend runs on port 3001.]
- [ASSUMPTION: The database file will be stored in a `database/` directory at the project root, excluded from Git.]
