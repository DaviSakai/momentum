# Momentum — Backend

This is a Node.js + Express backend providing the REST API for the Momentum platform.

## Architecture

- **Framework:** Express.js
- **Database:** SQLite (via `better-sqlite3` with WAL mode enabled)
- **Migrations:** Custom SQL migrator (`src/database/migrator.js`)
- **Structure:** Modular Controller-Service-Model architecture

## Getting Started

First, ensure dependencies are installed. Then, run the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3001` (or your configured `PORT`).
Database migrations run automatically on startup.

## Environment Variables

Copy `.env.example` to `.env` and configure your local variables:

```bash
cp .env.example .env
```

Required variables:
- `PORT`: Port to listen on (default: 3001)
- `DATABASE_PATH`: Relative path to the SQLite database file
- `CORS_ORIGIN`: Allowed origin for requests (default: `http://localhost:3000`)
- `JWT_SECRET`: Secret key for signing authentication tokens
- `JWT_EXPIRY`: Token expiration time (e.g., `7d`)

## Project Structure

- `server.js`: Entry point, Express configuration, and startup sequence.
- `src/routes/`: Route definitions matching endpoints to controllers.
- `src/controllers/`: Request handling and HTTP response mapping.
- `src/services/`: Core business logic and validation coordination.
- `src/models/`: Database interaction and SQL queries.
- `src/validators/`: Input validation logic.
- `src/middlewares/`: Express middlewares (auth, error handling).
- `src/database/`: SQLite connection setup and migration runner.
- `src/utils/`: Shared helper functions.
