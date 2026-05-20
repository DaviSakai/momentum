# Tasks: Authentication

**Input**: Design documents from `/specs/002-auth/`

**Prerequisites**: `plan.md` (required), `spec.md` (required). Feature 001-project-foundation must be complete.

**Tests**: OPTIONAL — manual verification is the primary validation method for MVP auth.

**Organization**: Tasks grouped by phase and user story. Each story is independently testable.

## Phase 1: Setup

**Purpose**: Confirm prerequisites and prepare the auth feature surface.

- [x] T001 Setup - Confirm 001-project-foundation is complete: Next.js frontend runs, Express backend runs, SQLite database connects, migration system works
- [x] T002 Setup - Confirm feature documents exist under specs/002-auth/
- [x] T003 Setup - Install jsonwebtoken and bcrypt as production dependencies in backend/package.json
- [ ] T004 [P] Setup - Document dependency decisions for jsonwebtoken and bcrypt in docs/decisions/002-auth-dependencies.md

**Checkpoint**: Prerequisites verified, auth dependencies installed.

---

## Phase 2: Foundation

**Purpose**: Build shared auth infrastructure that blocks all user stories.

- [x] T005 Database - Create database/migrations/001_create_users.sql with users table (id, name, email, password_hash, created_at, updated_at) using PostgreSQL-portable types
- [x] T006 Database - Run migration and verify users table is created in SQLite database
- [x] T007 Backend - Implement backend/src/models/userModel.js with createUser(data), findByEmail(email), findById(id) using better-sqlite3
- [x] T008 Backend - Implement backend/src/services/authService.js with hashPassword(password), verifyPassword(password, hash), generateToken(userId), verifyToken(token)
- [x] T009 Backend - Implement backend/src/validators/authValidator.js with validateRegistration(body) and validateLogin(body)
- [x] T010 Backend - Implement backend/src/middlewares/authMiddleware.js that extracts Bearer token, verifies JWT, injects req.user = { id, email }, or returns 401
- [x] T011 Backend - Create backend/src/routes/authRoutes.js with POST /register, POST /login, POST /logout route definitions
- [x] T012 Backend - Mount auth routes in backend/src/routes/index.js under /auth prefix
- [x] T013 Frontend - Create frontend/src/services/authApi.js with register(data), login(data), logout() API client functions
- [x] T014 Frontend - Create frontend/src/features/auth/ directory structure: components/, context/
- [x] T015 Frontend - Implement frontend/src/features/auth/context/AuthContext.jsx with AuthProvider, useAuth hook providing user, token, isAuthenticated, isLoading, login(), register(), logout()

**Checkpoint**: Auth service layer, middleware, database model, API client, and auth context are ready. User story implementation can begin.

---

## Phase 3: User Story 1 - User Registration (Priority: P1)

**Goal**: New users can create accounts with name, email, and password.

**Independent Test**: Submit registration form with valid data → user created, token returned, redirected to dashboard.

**Learning Checkpoint**: Form handling in React, bcrypt hashing, JWT generation, API error handling.

### Backend for User Story 1

- [x] T016 [US1] Backend - Implement register action in backend/src/controllers/authController.js: validate input, check duplicate email, hash password, create user, generate token, return user + token
- [x] T017 [US1] Backend - Wire POST /register to authController.register in backend/src/routes/authRoutes.js
- [x] T018 [US1] Backend - Verify POST /api/auth/register returns 201 with { user, token } for valid input
- [x] T019 [US1] Backend - Verify POST /api/auth/register returns 400 for missing/invalid fields
- [x] T020 [US1] Backend - Verify POST /api/auth/register returns 409 for duplicate email

### Frontend for User Story 1

- [x] T021 [P] [US1] Frontend - Implement frontend/src/features/auth/components/RegisterForm.jsx with name, email, password fields, client-side validation, loading state, and error display
- [x] T022 [US1] Frontend - Create frontend/app/register/page.js mounting RegisterForm with auth layout styling
- [x] T023 [US1] Frontend - Connect RegisterForm to AuthContext.register() which calls authApi.register(), stores token, and redirects to dashboard
- [x] T024 [US1] UX - Validate register page layout on mobile (375px), tablet (768px), and desktop (1280px)
- [x] T025 [US1] UX - Verify form labels, focus states, and error messages are accessible (keyboard nav, aria attributes)

**Checkpoint**: User registration works end to end. New users can create accounts and are authenticated.

---

## Phase 4: User Story 2 - User Login (Priority: P1)

**Goal**: Registered users can log in with email and password to access their data.

**Independent Test**: Submit login form with valid credentials → token returned, redirected to dashboard.

**Learning Checkpoint**: Credential verification, generic error messaging for security, session establishment.

### Backend for User Story 2

- [x] T026 [US2] Backend - Implement login action in backend/src/controllers/authController.js: validate input, find user by email, verify password, generate token, return user + token
- [x] T027 [US2] Backend - Wire POST /login to authController.login in backend/src/routes/authRoutes.js
- [x] T028 [US2] Backend - Verify POST /api/auth/login returns 200 with { user, token } for valid credentials
- [x] T029 [US2] Backend - Verify POST /api/auth/login returns 401 with generic message for wrong password
- [x] T030 [US2] Backend - Verify POST /api/auth/login returns 401 with same generic message for non-existent email

### Frontend for User Story 2

- [x] T031 [P] [US2] Frontend - Implement frontend/src/features/auth/components/LoginForm.jsx with email, password fields, client-side validation, loading state, and error display
- [x] T032 [US2] Frontend - Create frontend/app/login/page.js mounting LoginForm with auth layout styling and link to register
- [x] T033 [US2] Frontend - Connect LoginForm to AuthContext.login() which calls authApi.login(), stores token, and redirects to dashboard
- [x] T034 [US2] Frontend - Add link from login page to register page and vice versa
- [x] T035 [US2] UX - Validate login page layout on mobile, tablet, and desktop
- [x] T036 [US2] UX - Verify login form accessibility (labels, focus, error announcements)

**Checkpoint**: Login works end to end. Returning users can authenticate. Generic errors protect against enumeration.

---

## Phase 5: User Story 3 - Logout (Priority: P1)

**Goal**: Logged-in users can end their session.

**Independent Test**: Click logout → token cleared, redirected to login, protected pages inaccessible.

**Learning Checkpoint**: Client-side session management, state reset.

- [x] T037 [US3] Backend - Implement logout action in backend/src/controllers/authController.js: return success message (no server-side token invalidation for JWT MVP)
- [x] T038 [US3] Frontend - Add logout button/action to the application layout (header area)
- [x] T039 [US3] Frontend - Connect logout to AuthContext.logout() which clears token from localStorage and resets user state
- [x] T040 [US3] Frontend - Verify clicking logout redirects to /login and protected pages are no longer accessible

**Checkpoint**: Logout works. Session is terminated client-side.

---

## Phase 6: User Story 4 - Protected Routes (Priority: P1)

**Goal**: Unauthenticated users cannot access protected pages or API endpoints.

**Independent Test**: Access a protected endpoint without token → 401. Access a protected page without auth → redirect to login.

**Learning Checkpoint**: Middleware pattern, route guard pattern, authorization flow.

- [x] T041 [US4] Backend - Verify authMiddleware returns 401 for requests without Authorization header
- [x] T042 [US4] Backend - Verify authMiddleware returns 401 for expired or malformed tokens
- [x] T043 [US4] Backend - Verify authMiddleware injects req.user with { id, email } for valid tokens
- [x] T044 [US4] Frontend - Implement frontend/src/features/auth/components/ProtectedRoute.jsx that checks AuthContext.isAuthenticated and redirects to /login if false
- [x] T045 [US4] Frontend - Wrap dashboard and future protected routes with ProtectedRoute in frontend/app/layout.js or route-level layouts
- [x] T046 [US4] Frontend - Verify unauthenticated users are redirected to /login when accessing protected pages

**Checkpoint**: Route protection works on both frontend and backend. Auth middleware is ready for all future features.

---

## Phase 7: User Story 5 - Session Persistence (Priority: P2)

**Goal**: Sessions persist across page reloads.

**Independent Test**: Log in, reload the page → user remains authenticated.

**Learning Checkpoint**: Token persistence, session rehydration, loading states during auth check.

- [x] T047 [US5] Frontend - Implement token persistence in AuthContext: on mount, check localStorage for existing token, validate it, and restore user state
- [x] T048 [US5] Frontend - Add isLoading state to AuthContext to prevent flash of login page during session rehydration
- [x] T049 [US5] Frontend - Verify page reload after login maintains authenticated state
- [x] T050 [US5] Frontend - Verify expired token on reload redirects to login

**Checkpoint**: Sessions persist. No flash of unauthenticated state on reload.

---

## Final Phase: Polish & Validation

**Purpose**: Cross-cutting validation and cleanup.

- [ ] T051 Integration - Test full flow: register → dashboard → logout → login → dashboard → logout
- [ ] T052 UX - Validate all auth pages on mobile (375px), tablet (768px), and desktop (1280px)
- [ ] T053 UX - Verify no layout overlap, horizontal scrolling, or hidden controls on auth pages
- [ ] T054 UX - Review accessibility: form labels, focus management, error announcements, keyboard navigation
- [ ] T055 Backend - Review authController, authService, authMiddleware for clean responsibility boundaries
- [ ] T056 Backend - Verify error responses use consistent shape: { error: { code, message, details? } }
- [ ] T057 Database - Review users table schema for PostgreSQL portability
- [ ] T058 Frontend - Review AuthContext, auth components, and authApi for maintainability
- [ ] T059 Docs - Update specs/002-auth/ documents with final implementation notes
- [ ] T060 [P] Docs - Record auth architecture decisions in docs/decisions/002-auth-architecture.md
- [ ] T061 Cleanup - Remove console.log debugging, unused imports, and temporary code

**Checkpoint**: Auth feature is complete, responsive, secure, and documented. Ready for 003-dashboard.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on 001-project-foundation completion.
- **Foundation (Phase 2)**: Depends on Setup. Blocks all user stories.
- **US1 Registration (Phase 3)**: Depends on Foundation.
- **US2 Login (Phase 4)**: Depends on Foundation. Can run in parallel with US1 if files are isolated.
- **US3 Logout (Phase 5)**: Depends on US1 or US2 (needs a way to create a session).
- **US4 Protected Routes (Phase 6)**: Depends on Foundation (middleware). Frontend depends on US1 or US2.
- **US5 Session Persistence (Phase 7)**: Depends on US2 (login flow).
- **Final Phase**: Depends on all user stories.

### Parallel Execution Rules

- Backend US1 and frontend US1 can partially overlap after Foundation.
- US1 backend and US2 backend share authController.js — sequential.
- Frontend components (LoginForm, RegisterForm) can be built in parallel.

---

## Technical Debt & Deferred Work

- **Postponed Refactors**: None — clean start.
- **Temporary Shortcuts**: localStorage for token (evaluate httpOnly cookies later). No refresh tokens. No rate limiting.
- **Known Limitations**: JWT cannot be server-side revoked. Logout is client-only.
- **Future Improvements**: Password reset, email verification, OAuth, refresh tokens, session management, rate limiting.
- **Dependency Review Items**: Review `bcrypt` vs `bcryptjs` (pure JS alternative if native build issues arise).

---

## Notes

- Generic error messages on login are a security requirement — never reveal which field is wrong.
- Password is never included in API responses — only password_hash stored, only user { id, name, email } returned.
- Auth middleware will be used by every feature from 003 onward.
- Email is stored lowercase for consistent lookup.
- JWT secret must come from environment variables, never hardcoded.
