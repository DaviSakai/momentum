# Decision: Auth Architecture

**Feature**: 002-auth
**Date**: 2026-05-20
**Status**: Accepted

## Overview

Momentum uses JWT-based stateless authentication with bcrypt password hashing. The system supports user registration, login, logout, protected routes, and session persistence.

## Architecture Decisions

### 1. Stateless JWT Authentication

- **Decision**: Use JWT tokens for authentication instead of server-side sessions.
- **Rationale**: Simpler implementation for a decoupled frontend/backend architecture. No session store needed. Tokens are self-contained with user identity and expiration.
- **Trade-off**: Tokens cannot be server-side revoked. Logout is client-side only (token removal from localStorage).
- **Future Path**: Refresh token rotation and/or server-side token blacklist when needed.

### 2. localStorage for Token Storage

- **Decision**: Store JWT in localStorage.
- **Rationale**: Simple implementation for MVP. Works across page reloads and browser restarts.
- **Trade-off**: Vulnerable to XSS attacks. Acceptable for MVP; httpOnly cookies should be evaluated for production.
- **Future Path**: Migrate to httpOnly cookies with CSRF protection.

### 3. Backend Layer Separation

```
authRoutes.js → authController.js → authService.js → userModel.js
                                  → authValidator.js
authMiddleware.js (route guard)
```

- **Routes**: Define HTTP method, path, and handler mapping.
- **Controller**: Handles HTTP request/response. Validates input, calls service, returns JSON.
- **Service**: Business logic — password hashing, token generation/verification.
- **Validator**: Input validation — separate from business logic.
- **Model**: Database access — SQL queries through better-sqlite3.
- **Middleware**: JWT extraction and verification on protected routes.

### 4. Frontend Auth Pattern

```
AuthContext (global state) → authApi (API calls) → api.js (HTTP client)
ProtectedRoute (route guard)
AuthProviderWrapper (Next.js client boundary)
```

- **AuthContext**: Provides user, token, isAuthenticated, isLoading, login(), register(), logout().
- **ProtectedRoute**: Wraps protected pages, redirects to /login if unauthenticated.
- **AuthProviderWrapper**: 'use client' boundary for AuthProvider inside Next.js layout.

### 5. Error Handling Strategy

- **Generic login errors**: "Invalid email or password" — never reveals which field is wrong.
- **Duplicate email**: Returns 409 with "An account with this email already exists".
- **Missing token**: Returns 401 with "Authentication required".
- **Invalid/expired token**: Returns 401 with "Invalid or expired token".
- **Validation errors**: Returns 400 with field-level error details.

### 6. Database Design

- Users table with PostgreSQL-portable types (TEXT for timestamps, INTEGER PRIMARY KEY).
- Email stored lowercase for consistent lookup.
- Unique index on email column.
- password_hash excluded from findById queries.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Authenticate |
| POST | /api/auth/logout | No | Client-side logout |
| GET | /api/auth/me | Yes | Get current user |

## Request/Response Shapes

### Register
```json
// Request
{ "name": "string", "email": "string", "password": "string" }
// Response 201
{ "user": { "id": 1, "name": "...", "email": "...", "created_at": "...", "updated_at": "..." }, "token": "jwt..." }
```

### Login
```json
// Request
{ "email": "string", "password": "string" }
// Response 200
{ "user": { "id": 1, "name": "...", "email": "...", "created_at": "...", "updated_at": "..." }, "token": "jwt..." }
```

### Error Shape
```json
{ "error": { "code": "ERROR_CODE", "message": "Human-readable message", "details": [...] } }
```
