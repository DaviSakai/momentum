# Decision: Auth Dependencies

**Feature**: 002-auth
**Date**: 2026-05-20
**Status**: Accepted

## Context

The authentication system requires password hashing and token-based session management. These are critical security operations that should use well-established, audited libraries.

## Dependencies Chosen

### jsonwebtoken (^9.0.3)

- **Purpose**: JWT generation and verification for stateless authentication.
- **Rationale**: Industry standard for JWT handling in Node.js. Well-maintained, widely used, supports expiration and payload signing.
- **Alternative Considered**: `jose` — modern, smaller, but less community adoption at this point.
- **Risk**: JWT cannot be server-side revoked. Acceptable for MVP with client-side logout.

### bcrypt (^6.0.0)

- **Purpose**: Password hashing with salt generation.
- **Rationale**: Industry standard for password hashing. Built-in salt management, configurable cost factor.
- **Alternative Considered**: `bcryptjs` — pure JavaScript implementation, no native build required. May be considered if `bcrypt` native compilation causes issues on some platforms.
- **Configuration**: Cost factor set to 10 (default). Provides good security/performance balance for MVP.

## Security Notes

- JWT secret loaded from environment variable (`JWT_SECRET`), never hardcoded.
- JWT expiry set to 7 days (`JWT_EXPIRY`), configurable.
- bcrypt cost factor of 10 provides ~100ms hash time — sufficient for single-user MVP.
- Passwords are never stored in plaintext or included in API responses.
