# Implementation Plan: Authentication

**Branch**: `002-auth` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-auth/spec.md`

## Summary

**Primary Requirement**: Allow users to register, log in, log out, and access protected Momentum areas with data isolated per user.

**User Value**: Every Momentum feature (dashboard, daily check-in, goals, tasks, habits, reports, AI) requires user identity to function. Auth is the prerequisite for all personalized data.

**Affected Momentum Module**: Authentication

**Implementation Strategy**: Implement a JWT-based stateless authentication system. Backend exposes register, login, and logout endpoints under `/api/auth/`. A reusable auth middleware validates JWT tokens on all protected routes and injects user context. Frontend provides login/register pages, an auth context for session state, and a protected route wrapper. Passwords are hashed with bcrypt. Tokens stored in localStorage for MVP simplicity.

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js + React, auth context with useContext hook, form handling

**Backend**: Node.js + Express, JWT via `jsonwebtoken`, password hashing via `bcrypt`

**Storage**: SQLite via `better-sqlite3`; `users` table with PostgreSQL-portable schema

**API Style**: REST — `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`

**Testing**: Manual verification of registration, login, logout, and route protection flows

**Target Platform**: Responsive web app

**Project Type**: Decoupled frontend/backend

**Performance Goals**: Auth endpoints respond within 500ms (bcrypt hashing is the bottleneck)

**Constraints**: API-first boundary, minimal dependencies, generic error messages for security, MVP scope

**Scale/Scope**: Authenticated single-user MVP (multi-user capable)

**Future Compatibility**: Token refresh strategy, OAuth integration, session management, rate limiting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Clean Code and Boundaries**: Auth logic separated into authService (hashing, token generation), authController (HTTP handling), authMiddleware (token validation). Clear single responsibilities.
- **Next.js + React Alignment**: Login and register pages use Next.js App Router. Auth state managed via React context.
- **Decoupled API-First Design**: Frontend communicates with backend auth endpoints through API service module. No direct database access.
- **Modular Backend Services**: authService.js contains all business logic (hash, verify, sign token). authController.js handles HTTP translation only.
- **Responsive-First UX**: Auth forms designed mobile-first with centered layout, full-width inputs on small screens.
- **Required UI States**: Loading (during submit), error (validation + server errors), success (redirect to dashboard).
- **Minimal Dependencies**: Two new dependencies justified — `jsonwebtoken` (JWT standard) and `bcrypt` (password hashing standard). Both are industry-standard with no simpler alternatives in the existing stack.
- **MVP Discipline**: No password reset, OAuth, email verification, MFA, or role-based access. Pure registration/login/logout.
- **Learning and Maintainability**: Documents JWT auth patterns, bcrypt usage, middleware design, secure error handling.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- User registration with name, email, password
- User login with email and password
- User logout (client-side token removal)
- JWT token generation and validation
- Auth middleware for protecting API routes
- Frontend auth context (token, user, isAuthenticated)
- Protected route wrapper
- Login and register pages with responsive forms
- Users table with migration

**Explicitly Excluded**:

- Password reset flow
- Email verification
- OAuth / social login
- Multi-factor authentication
- Role-based access control
- Rate limiting
- Refresh tokens
- Account settings / profile editing

**Dependencies With Other Features**:

- Depends on: 001-project-foundation (Next.js, Express, SQLite, migration system)
- Required by: 003-dashboard, 004-daily-checkin, 005-goals, 006-task-kanban (all need authenticated user)

**Assumptions**:

- [ASSUMPTION: 001-project-foundation is complete — Next.js frontend, Express backend, SQLite with migration system.]
- [ASSUMPTION: JWT with 7-day expiry, no refresh token for MVP.]
- [ASSUMPTION: localStorage for token persistence.]

**Open Questions**:

- [NEEDS CLARIFICATION: Should duplicate email error be specific ("Email already registered") or generic ("Unable to create account")?]

## Architecture Decisions

**Frontend Route Structure**: `/login` and `/register` as public routes. Auth layout wrapper for consistent styling. All other routes wrapped with ProtectedRoute that checks auth context.

**Frontend Component Boundaries**:
- `app/login/page.js` — Login page
- `app/register/page.js` — Registration page
- `src/features/auth/components/LoginForm.jsx` — Login form component
- `src/features/auth/components/RegisterForm.jsx` — Registration form component
- `src/features/auth/context/AuthContext.jsx` — Auth provider and hook
- `src/features/auth/components/ProtectedRoute.jsx` — Route guard component
- `src/services/authApi.js` — Auth API client

**Backend Route/Controller/Service Structure**:
- `src/routes/authRoutes.js` — POST /register, /login, /logout
- `src/controllers/authController.js` — register, login, logout handlers
- `src/services/authService.js` — hashPassword, verifyPassword, generateToken, verifyToken
- `src/models/userModel.js` — createUser, findByEmail, findById
- `src/middlewares/authMiddleware.js` — JWT extraction, validation, user injection
- `src/validators/authValidator.js` — Registration and login input validation

**Database Entities**: `users` table — id, name, email, password_hash, created_at, updated_at

**API Boundaries**:
- `POST /api/auth/register` → `{ user: { id, name, email }, token }`
- `POST /api/auth/login` → `{ user: { id, name, email }, token }`
- `POST /api/auth/logout` → `{ message: "Logged out" }`
- Error shape: `{ error: { code, message, details? } }`

**Authentication Impact**: This IS the authentication feature. Establishes the middleware used by all subsequent features.

**Analytics/Reporting Impact**: Login frequency, registration count, session duration signals.

**Future AI Impact**: User identity enables personalized recommendations. Login timestamps can correlate with productivity patterns.

## Project Structure

### Documentation (this feature)

```text
specs/002-auth/
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
|   |   `-- authController.js
|   |-- services/
|   |   `-- authService.js
|   |-- routes/
|   |   |-- index.js          (updated - mount authRoutes)
|   |   `-- authRoutes.js
|   |-- models/
|   |   `-- userModel.js
|   |-- middlewares/
|   |   `-- authMiddleware.js
|   |-- validators/
|   |   `-- authValidator.js
|   `-- database/

frontend/
|-- app/
|   |-- login/
|   |   `-- page.js
|   |-- register/
|   |   `-- page.js
|   `-- layout.js             (updated - wrap with AuthProvider)
|-- src/
|   |-- features/
|   |   `-- auth/
|   |       |-- components/
|   |       |   |-- LoginForm.jsx
|   |       |   |-- RegisterForm.jsx
|   |       |   `-- ProtectedRoute.jsx
|   |       `-- context/
|   |           `-- AuthContext.jsx
|   `-- services/
|       `-- authApi.js

database/
`-- migrations/
    `-- 001_create_users.sql
```

## Frontend Plan

**Affected Routes**:

- `/login` — Login page (public)
- `/register` — Registration page (public)
- All other routes wrapped with ProtectedRoute

**Pages and Layouts**: Login and register pages under `app/login/` and `app/register/`. Shared auth layout styling. Root layout updated to include AuthProvider.

**Components**: LoginForm (email, password, submit, error display), RegisterForm (name, email, password, submit, error display), ProtectedRoute (checks auth context, redirects to /login if unauthenticated).

**State Management**: AuthContext provides { user, token, isAuthenticated, isLoading, login(), register(), logout() }. Token persisted in localStorage. User state derived from token or API response.

**Forms and Validation**: Client-side validation before submit — required fields, email format, password minimum length. Server validation errors mapped to inline field messages.

**UI States**:

- **Loading**: Button shows spinner/disabled during API call. Form fields disabled.
- **Empty**: Clean form with labels and placeholder text.
- **Error**: Inline field errors for validation. Banner for server errors (generic message).
- **Success**: Redirect to dashboard (no explicit success screen).

**Responsive Behavior**: Mobile-first centered form. Max-width 480px. Full-width inputs. Adequate touch targets (44px minimum). Readable labels. No horizontal scrolling.

**Accessibility Notes**: Labels linked to inputs via htmlFor/id. Error messages associated with fields via aria-describedby. Focus moves to first error on validation failure. Submit button has accessible name. Form uses semantic `<form>` element.

## Backend Plan

**Endpoints**:

- `POST /api/auth/register` — Create user. Payload: { name, email, password }. Validates, hashes password, creates user, returns user + token.
- `POST /api/auth/login` — Authenticate. Payload: { email, password }. Verifies credentials, returns user + token.
- `POST /api/auth/logout` — No-op server-side for JWT. Returns success message.

**Routes**: `backend/src/routes/authRoutes.js` mounted at `/auth` in route index.

**Controllers**: `authController.js` — register(), login(), logout() actions. Each parses request, calls service, returns response or error.

**Services**: `authService.js` — hashPassword(password), verifyPassword(password, hash), generateToken(userId), verifyToken(token). Pure business logic, no HTTP awareness.

**Models/Data Access**: `userModel.js` — createUser(userData), findByEmail(email), findById(id). Direct SQLite queries.

**Validation**: `authValidator.js` — validateRegistration(body), validateLogin(body). Returns array of errors or null.

**Authentication/Authorization**: `authMiddleware.js` — extracts Bearer token from Authorization header, verifies with authService.verifyToken(), injects `req.user = { id, email }`, or returns 401.

**Error Handling**: 400 validation (missing/invalid fields), 401 invalid credentials or token, 409 duplicate email, 500 unexpected. All use consistent error shape.

## Database Plan

**Tables**:

- `users` — Core user identity table

**Fields**:

- `id` INTEGER PRIMARY KEY — auto-incrementing user ID
- `name` TEXT NOT NULL — user display name (2–100 chars)
- `email` TEXT NOT NULL UNIQUE — login identifier (stored lowercase)
- `password_hash` TEXT NOT NULL — bcrypt hash
- `created_at` TEXT NOT NULL — ISO 8601 timestamp
- `updated_at` TEXT NOT NULL — ISO 8601 timestamp

**Relationships**: Users table is parent for all future user-owned entities.

**Indexes**: UNIQUE index on `email` (automatic from UNIQUE constraint). Primary key index on `id` (automatic).

**Migrations/Seeds**: `database/migrations/001_create_users.sql` — CREATE TABLE users with all fields and constraints.

**SQLite → PostgreSQL Compatibility**: Use `TEXT` for timestamps (ISO 8601 strings). Use `INTEGER PRIMARY KEY` (not AUTOINCREMENT). Store email lowercase in application layer. Avoid SQLite-specific functions in schema.

## API Contract Plan

**Request — Register**:

```json
{
  "name": "Davi Sakai",
  "email": "davi@example.com",
  "password": "securePassword123"
}
```

**Response — Register/Login (200)**:

```json
{
  "user": {
    "id": 1,
    "name": "Davi Sakai",
    "email": "davi@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Request — Login**:

```json
{
  "email": "davi@example.com",
  "password": "securePassword123"
}
```

**Error Shape (400/401/409)**:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "message": "Valid email is required" }
    ]
  }
}
```

**Authentication Requirements**: Register and login are public. Logout requires valid token. All other future endpoints require valid token via authMiddleware.

## Testing Strategy

**Unit Tests**: Optional — authService functions (hash, verify, token generation).

**Integration Tests**: Optional — register + login + protected endpoint flow.

**API Tests**: Optional — endpoint status codes, request/response shapes, auth header validation.

**Manual Testing Checklist**:

- [ ] Register with valid data → user created, token returned, redirected to dashboard
- [ ] Register with existing email → error displayed
- [ ] Register with missing fields → validation errors shown
- [ ] Login with valid credentials → token returned, redirected to dashboard
- [ ] Login with wrong password → generic error shown
- [ ] Login with non-existent email → same generic error shown
- [ ] Access protected endpoint without token → 401 response
- [ ] Access protected endpoint with valid token → success
- [ ] Logout → token cleared, redirected to login
- [ ] Page reload after login → session persists
- [ ] Auth forms render correctly on mobile, tablet, desktop

## Learning Goals

**Concepts Practiced**: JWT authentication, bcrypt password hashing, Express middleware pattern, React context for global state, form handling with validation, secure error messaging, protected route pattern.

**Architecture Decisions Being Learned**: Stateless auth in decoupled architecture, separation of auth logic from HTTP handling, middleware chain design, token storage tradeoffs.

**Documentation for Future Review**: JWT vs session cookies decision, bcrypt cost factor choice, token expiry strategy, localStorage security implications.

## Implementation Phases

**Phase 0: Research**: Confirm jsonwebtoken and bcrypt APIs. Verify JWT best practices for Express.

**Phase 1: Design**: Finalize endpoint contracts, database schema, component structure.

**Phase 2: Database**: Create users table migration. Implement userModel with CRUD operations.

**Phase 3: Backend Auth**: Implement authService, authValidator, authController, authRoutes. Implement authMiddleware.

**Phase 4: Frontend Auth**: Implement AuthContext, authApi service, LoginForm, RegisterForm, login/register pages, ProtectedRoute.

**Phase 5: Integration**: Connect frontend to backend. Verify full registration → login → protected access → logout flow.

**Phase 6: Polish**: Responsive validation, error UX, documentation.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| `jsonwebtoken` dependency | JWT is the auth strategy | Manual token signing is insecure | Keep — industry standard |
| `bcrypt` dependency | Password hashing requirement | Plain hashing (sha256) lacks salt and cost factor | Keep — security requirement |
| localStorage for token | Simple token persistence | Cookies require additional CORS/httpOnly setup | Evaluate httpOnly cookies after MVP |
