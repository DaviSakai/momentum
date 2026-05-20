# Architecture Decision Record: Project Foundation

## Context
Momentum is a personal organization and productivity tracking web application. The initial repository contained a minimal Vite + React frontend configuration with no backend or database setup. The project's goals emphasize a clean architecture, maintainability, and learning modern software engineering practices.

## Decisions

### 1. Vite to Next.js Migration
**Decision:** Replace Vite with Next.js (App Router).
**Rationale:** Next.js provides a more robust foundation for a production-grade application, offering built-in routing, API routes (though we opted for a decoupled backend), server-side rendering capabilities, and an optimized build process. The initial Vite code was minimal, making the migration straightforward.

### 2. Decoupled Architecture
**Decision:** Separate frontend (Next.js) and backend (Express) into distinct directories communicating via REST APIs.
**Rationale:** While Next.js supports full-stack development via Server Actions and API Routes, maintaining a strict separation of concerns aligns better with the project's goal of learning API design and backend architecture. It also allows for easier future scaling or client additions (e.g., a mobile app).

### 3. Database Selection (SQLite)
**Decision:** Use SQLite via `better-sqlite3` for the MVP phase.
**Rationale:** SQLite is zero-configuration and file-based, making it ideal for rapid local development and prototyping. The `better-sqlite3` library is synchronous and highly performant.
**Future Considerations:** The database schema is intentionally kept portable (e.g., using TEXT for enums) to facilitate a future migration to PostgreSQL as the application scales.

### 4. Custom SQL Migration System
**Decision:** Implement a custom, lightweight SQL migration runner (`src/database/migrator.js`).
**Rationale:** Instead of introducing a heavy ORM or migration framework (like Prisma or Knex) immediately, a custom runner provides direct control over SQL execution and a deeper understanding of database versioning mechanics.

### 5. Development Workflow
**Decision:** Use `concurrently` to run both frontend and backend servers with a single command from the project root.
**Rationale:** Simplifies the developer experience. A single `npm run dev` command spins up the entire stack, eliminating the need for multiple terminal windows and reducing cognitive load.

## Consequences
- **Positive:** A clean, decoupled foundation ready for rapid feature development. Strong separation of concerns. Easy setup for new contributors or AI agents.
- **Negative:** Slightly more initial boilerplate than a monolithic Next.js approach. Requires managing two separate node environments (frontend and backend) during development.
