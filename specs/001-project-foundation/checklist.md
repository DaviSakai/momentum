# Foundation Checklist: Project Foundation

**Purpose**: Validate that the Momentum project foundation is complete, consistent, and ready for feature development.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [] CHK001 Next.js frontend starts and serves a page at http://localhost:3000
- [] CHK002 Express backend starts and responds at http://localhost:3001
- [] CHK003 GET /api/health returns 200 with { status: "ok", timestamp: "..." }
- [] CHK004 SQLite database file is created when migrations run
- [] CHK005 Root concurrent dev script starts both frontend and backend
- [] CHK006 .env.example files exist for both frontend and backend with all required variables

## Frontend Validation

- [] CHK007 Vite configuration files and dependencies are fully removed
- [] CHK008 Next.js App Router is used (app/ directory with layout.js and page.js)
- [] CHK009 Global CSS includes reset, typography, and responsive variables
- [] CHK010 Landing page uses semantic HTML (header, main, footer, h1)
- [] CHK011 Feature directory structure exists: src/components, src/features, src/hooks, src/services, src/styles, src/lib
- [] CHK012 API service module (src/services/api.js) is configured with base URL from environment

## Responsive UX Validation

- [] CHK013 Landing page is readable and usable on mobile (375px)
- [] CHK014 Landing page is readable and usable on tablet (768px)
- [] CHK015 Landing page is readable and usable on desktop (1280px)
- [] CHK016 No horizontal scrolling at any breakpoint
- [] CHK017 Text remains readable without zooming on mobile

## Backend Validation

- [] CHK018 Express routes follow modular structure: routes/ → controllers/ → services/
- [] CHK019 Health controller returns proper JSON response shape
- [] CHK020 Global error handler returns consistent error shape: { error: { code, message } }
- [] CHK021 Unknown routes return 404 with error JSON
- [] CHK022 CORS is configured to allow frontend origin
- [] CHK023 Environment variables are loaded from .env via dotenv

## Database Validation

- [] CHK024 better-sqlite3 connection module exists and connects to configured path
- [] CHK025 Migration runner reads .sql files from database/migrations/ in order
- [] CHK026 Migration tracking prevents re-running applied migrations
- [] CHK027 Database file path is configurable via environment variable
- [] CHK028 Database file and .sqlite extensions are in .gitignore
- [] CHK029 No SQLite-specific types are used that would block PostgreSQL migration (AUTOINCREMENT, etc.)

## API Validation

- [] CHK030 All API endpoints are under the /api prefix
- [] CHK031 Response shapes follow the documented contract (status for health, error for errors)
- [] CHK032 CORS headers are present on API responses

## Error Handling

- [] CHK033 Backend returns safe error messages (no stack traces in non-development mode)
- [] CHK034 Missing routes produce structured 404 errors
- [] CHK035 Server startup failures are logged clearly (port in use, database connection, missing env)

## Documentation

- [] CHK036 Root README includes English setup instructions
- [] CHK037 Frontend README reflects Next.js architecture (not Vite)
- [] CHK038 Backend README documents available endpoints and structure
- [] CHK039 Architecture decisions are documented in docs/decisions/
- [] CHK040 .env.example files document all required variables with descriptions

## Implementation Quality

- [] CHK041 No unused dependencies in frontend or backend package.json
- [] CHK042 File and folder naming is consistent (camelCase for JS, kebab-case for directories)
- [] CHK043 No console.log debugging statements in committed code
- [] CHK044 Each module has a single clear responsibility
- [] CHK045 Frontend and backend are fully decoupled — no direct imports between them

## Deployment & Environment Readiness *(optional)*

- [] CHK046 .env files are in .gitignore
- [] CHK047 .env.example files contain safe default values (no secrets)
- [] CHK048 node_modules, .next, and dist are in .gitignore

## Notes

- Check items off as completed: `[x]`
- Add inline findings or comments directly below relevant items
- This foundation must be validated before starting 002-auth
- Items are numbered sequentially for reference
