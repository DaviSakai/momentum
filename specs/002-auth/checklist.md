# Auth Checklist: Authentication

**Purpose**: Validate that the Momentum authentication system is complete, secure, and ready for use by all downstream features.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite · JWT · bcrypt

## Feature Completeness

- [ ] CHK001 User can register with name, email, and password
- [ ] CHK002 User can log in with email and password
- [ ] CHK003 User can log out and session is terminated
- [ ] CHK004 Protected API endpoints return 401 without valid token
- [ ] CHK005 Protected frontend routes redirect to /login without authentication
- [ ] CHK006 Session persists across page reloads
- [ ] CHK007 Expired tokens trigger re-authentication

## Frontend Validation

- [ ] CHK008 LoginForm component handles loading, error, and success states
- [ ] CHK009 RegisterForm component handles loading, error, and success states
- [ ] CHK010 Client-side validation runs before form submission (required fields, email format, password length)
- [ ] CHK011 Server validation errors are displayed inline under the correct fields
- [ ] CHK012 AuthContext provides user, token, isAuthenticated, isLoading, login, register, logout
- [ ] CHK013 ProtectedRoute redirects unauthenticated users to /login
- [ ] CHK014 No flash of login page during session rehydration (isLoading state)
- [ ] CHK015 Links between login and register pages work correctly
- [ ] CHK016 Logout button is accessible from the main application layout

## Responsive UX Validation

- [ ] CHK017 Login page is usable on mobile (375px) with full-width inputs
- [ ] CHK018 Register page is usable on mobile (375px) with full-width inputs
- [ ] CHK019 Auth forms are centered with max-width on tablet and desktop
- [ ] CHK020 No horizontal scrolling on any auth page at any breakpoint
- [ ] CHK021 Touch targets (buttons, inputs) are at least 44px on mobile
- [ ] CHK022 Error messages do not break layout on small screens

## Backend Validation

- [ ] CHK023 POST /api/auth/register creates user and returns { user, token } with 201
- [ ] CHK024 POST /api/auth/login returns { user, token } with 200 for valid credentials
- [ ] CHK025 POST /api/auth/logout returns success message
- [ ] CHK026 authMiddleware extracts and validates JWT from Authorization header
- [ ] CHK027 authMiddleware injects req.user with { id, email } for valid tokens
- [ ] CHK028 authService.hashPassword uses bcrypt with cost factor ≥ 10
- [ ] CHK029 authService.generateToken includes user ID and expiration
- [ ] CHK030 Controllers delegate to services — no business logic in route handlers

## Database Validation

- [ ] CHK031 users table exists with id, name, email, password_hash, created_at, updated_at
- [ ] CHK032 email column has UNIQUE constraint
- [ ] CHK033 All fields use PostgreSQL-portable types (TEXT for timestamps, INTEGER for IDs)
- [ ] CHK034 Migration is idempotent — running it again does not cause errors
- [ ] CHK035 Email is stored lowercase for consistent lookup

## API Validation

- [ ] CHK036 All auth endpoints are under /api/auth/ prefix
- [ ] CHK037 Error responses use consistent shape: { error: { code, message } }
- [ ] CHK038 Password is never included in any API response
- [ ] CHK039 User object in responses contains only id, name, email (no password_hash)

## Error Handling

- [ ] CHK040 Invalid login credentials return generic error — no indication of which field is wrong
- [ ] CHK041 Duplicate email registration returns appropriate error
- [ ] CHK042 Missing required fields return field-level validation errors
- [ ] CHK043 Malformed or expired JWT returns 401
- [ ] CHK044 Missing Authorization header on protected routes returns 401
- [ ] CHK045 Unexpected server errors return 500 with safe message (no stack traces)

## Authentication & Security

- [ ] CHK046 Passwords are hashed with bcrypt before storage — no plaintext
- [ ] CHK047 JWT secret is loaded from environment variable, not hardcoded
- [ ] CHK048 JWT tokens have an expiration time set
- [ ] CHK049 Auth error messages do not leak whether an email exists in the system
- [ ] CHK050 Token is cleared from client storage on logout

## Documentation

- [ ] CHK051 Auth architecture decisions documented in docs/decisions/
- [ ] CHK052 Dependency choices (jsonwebtoken, bcrypt) documented with rationale
- [ ] CHK053 API endpoints documented with request/response shapes
- [ ] CHK054 Environment variables (JWT_SECRET, JWT_EXPIRY) documented in .env.example

## Implementation Quality

- [ ] CHK055 Auth logic separated: authService (business), authController (HTTP), authMiddleware (guard)
- [ ] CHK056 No direct database access from controllers — all through models
- [ ] CHK057 Frontend auth state managed through context — no prop drilling
- [ ] CHK058 No console.log debugging in committed code
- [ ] CHK059 Naming is consistent across backend (camelCase) and database (snake_case)

## Notes

- Check items off as completed: `[x]`
- Auth must be validated before starting any feature that requires user identity (003–006)
- Security items (CHK046–CHK050) are non-negotiable for MVP
