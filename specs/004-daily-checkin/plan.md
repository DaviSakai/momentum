# Implementation Plan: Daily Check-in

**Branch**: `004-daily-checkin` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-daily-checkin/spec.md`

## Summary

**Primary Requirement**: Allow users to create and edit a single daily check-in capturing health, wellness, and productivity metrics.

**User Value**: Enables personal data tracking that feeds the dashboard, future reports, analytics, and AI recommendations. The check-in is Momentum's primary data input mechanism.

**Affected Momentum Module**: Daily check-in | Health tracking | Productivity

**Implementation Strategy**: Build a single form page at `/checkin` that handles both creation and editing (upsert pattern). The backend provides CRUD + upsert endpoints for the `check_ins` table. A composite unique constraint on (user_id, date) enforces one-per-day. The form groups metrics into sections (wellness, activity, productivity) for UX clarity.

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js + React, form state management, input components for ratings/numbers

**Backend**: Node.js + Express, upsert logic with SQLite

**Storage**: SQLite — `check_ins` table with user_id FK to users

**API Style**: REST — GET/POST/PUT under `/api/checkins`

**Testing**: Manual form validation and responsive testing

**Target Platform**: Responsive web — form must be fast on mobile

**Performance Goals**: Form submission under 1 second

**Constraints**: One check-in per user per date, API-first, responsive form, minimal dependencies

**Scale/Scope**: Authenticated single-user MVP

**Future Compatibility**: Analytics queries, trend reporting, AI data pipeline

## Constitution Check

- **Clean Code and Boundaries**: CheckinService handles business logic (upsert, validation). CheckinController handles HTTP. CheckinModel handles database access.
- **Next.js + React Alignment**: Check-in page uses App Router. Form component in features/checkin/.
- **Decoupled API-First Design**: Frontend calls REST endpoints through checkinApi service. No direct database access.
- **Modular Backend Services**: Upsert logic, validation, and date handling in checkinService. Reusable by dashboard and future reports.
- **Responsive-First UX**: Single-column form on mobile. Grouped sections. Touch-friendly inputs.
- **Required UI States**: Loading (submit), empty (new form), error (validation), success (saved confirmation), editing (pre-filled).
- **Minimal Dependencies**: No new dependencies. Uses existing stack.
- **MVP Discipline**: No charts, trends, reminders, or AI insights. Pure data entry and history.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- Check-in form with all metrics (sleep, mood, energy, focus, hydration, study, training, productivity, notes)
- Create and edit (upsert) behavior
- One-per-day enforcement
- Pre-filled form for existing check-ins
- Check-in history list
- Dashboard integration (health summary card reads today's check-in)
- Input validation (client + server)
- Responsive form layout

**Explicitly Excluded**:

- Charts and trend visualizations
- Weekly/monthly aggregations
- Reminders/notifications
- Custom metrics
- Data export
- AI insights

**Dependencies With Other Features**:

- Depends on: 001-project-foundation, 002-auth
- Feeds: 003-dashboard (health summary card)

## Architecture Decisions

**Frontend Route Structure**: `/checkin` for create/edit today. `/checkin/history` for past entries.

**Frontend Component Boundaries**:
- `app/checkin/page.js` — Check-in form page
- `app/checkin/history/page.js` — History list page
- `src/features/checkin/components/CheckInForm.jsx` — Main form with all metric inputs
- `src/features/checkin/components/MetricInput.jsx` — Reusable rating/number input
- `src/features/checkin/components/CheckInHistoryList.jsx` — List of past entries
- `src/features/checkin/components/CheckInHistoryItem.jsx` — Single entry summary
- `src/services/checkinApi.js` — API client

**Backend Structure**:
- `src/routes/checkinRoutes.js` — All check-in endpoints
- `src/controllers/checkinController.js` — create, update, getToday, getAll
- `src/services/checkinService.js` — upsert logic, validation, date queries
- `src/models/checkinModel.js` — SQL queries for check_ins table
- `src/validators/checkinValidator.js` — Input validation rules

**Database Entities**: `check_ins` table with UNIQUE(user_id, date)

**API Boundaries**:
- `GET /api/checkins/today` → check-in object or null
- `GET /api/checkins` → paginated list
- `POST /api/checkins` → create/upsert, returns check-in
- `PUT /api/checkins/:id` → update, returns check-in

## Project Structure

```text
frontend/
|-- app/
|   `-- checkin/
|       |-- page.js
|       `-- history/
|           `-- page.js
|-- src/
|   |-- features/
|   |   `-- checkin/
|   |       `-- components/
|   |           |-- CheckInForm.jsx
|   |           |-- MetricInput.jsx
|   |           |-- CheckInHistoryList.jsx
|   |           `-- CheckInHistoryItem.jsx
|   `-- services/
|       `-- checkinApi.js

backend/
|-- src/
|   |-- controllers/
|   |   `-- checkinController.js
|   |-- services/
|   |   `-- checkinService.js
|   |-- routes/
|   |   `-- checkinRoutes.js
|   |-- models/
|   |   `-- checkinModel.js
|   `-- validators/
|       `-- checkinValidator.js

database/
`-- migrations/
    `-- 002_create_check_ins.sql
```

## Frontend Plan

**Affected Routes**: `/checkin` (create/edit), `/checkin/history` (list).

**Components**: CheckInForm with grouped sections: Wellness (sleep, mood, energy, focus, hydration), Activity (study hours, training), Productivity (score, notes).

**State Management**: Local form state. Fetch today's check-in on mount to determine create vs edit mode.

**Forms and Validation**: Client-side: required fields (mood, energy, focus, productivity), range validation. Server-side: same rules enforced. Inline error messages per field.

**UI States**:
- **Loading**: Skeleton while checking for existing entry. Button spinner during submit.
- **Empty**: Clean form with labels, defaults, and placeholder text.
- **Error**: Inline field errors. Banner for server errors.
- **Success**: Toast "Check-in saved!" with link to dashboard.
- **Editing**: Pre-filled form. Button says "Update Check-in".

**Responsive Behavior**: Single-column on mobile. Metric groups stacked. Full-width inputs. Touch-friendly sliders/selects (44px+ targets).

## Backend Plan

**Endpoints**:
- `GET /api/checkins/today` — Returns today's check-in or null.
- `GET /api/checkins?page=1&limit=10` — Paginated history, date desc.
- `POST /api/checkins` — Create or upsert. Body: { date, sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes }.
- `PUT /api/checkins/:id` — Update existing. Validates ownership.

**Validation**: mood (1-5), energy (1-5), focus (1-5), productivity_score (1-10), sleep_hours (0-24), hydration (0-20), study_hours (0-24), training_done (0|1), date (YYYY-MM-DD), notes (max 1000 chars).

**Error Handling**: 400 validation, 401 unauthenticated, 403 not owner, 404 not found, 409 duplicate date (if not using upsert).

## Database Plan

**Tables**: `check_ins`

**Fields**: id, user_id, date, sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes, created_at, updated_at.

**Indexes**: UNIQUE(user_id, date), INDEX(user_id).

**Relationships**: FK user_id → users(id) ON DELETE CASCADE.

**SQLite → PostgreSQL**: REAL → FLOAT. TEXT dates → DATE. INTEGER booleans → BOOLEAN.

## Testing Strategy

**Manual Testing Checklist**:
- [ ] Create check-in with all fields → saved successfully
- [ ] Create check-in with only required fields → saved successfully
- [ ] Edit existing check-in → values updated
- [ ] Duplicate date blocked or upserted correctly
- [ ] Form pre-fills when check-in exists for today
- [ ] History shows past entries in date desc order
- [ ] Mobile form is usable with touch inputs
- [ ] Validation errors appear inline for invalid input
- [ ] Dashboard health card reflects today's check-in data

## Learning Goals

**Concepts Practiced**: Form handling with multiple input types, upsert patterns, date-based unique constraints, pagination, dashboard data integration.

## Implementation Phases

**Phase 1**: Setup — create directories, install nothing new.
**Phase 2**: Database — migration, model.
**Phase 3**: Backend — service, validator, controller, routes.
**Phase 4**: Frontend — form, API client, pages.
**Phase 5**: Integration — dashboard card connection.
**Phase 6**: Polish — responsive, accessibility, history list.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| None | Feature uses existing stack cleanly | N/A | N/A |
