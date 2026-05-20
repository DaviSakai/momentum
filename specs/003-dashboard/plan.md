# Implementation Plan: Main Dashboard

**Branch**: `003-dashboard` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-dashboard/spec.md`

## Summary

**Primary Requirement**: Display a single-screen summary of the user's health, productivity, goals, and tasks for today.

**User Value**: Users can quickly understand their daily status without visiting multiple pages — the central value proposition of Momentum as an integrated personal organization platform.

**Affected Momentum Module**: Dashboard

**Implementation Strategy**: Build a responsive card-based dashboard page at `/dashboard`. Each card is an independent component that fetches its own data from a backend summary endpoint. Cards handle their own loading, empty, error, and populated states. The dashboard initially shows empty state cards with CTAs since data features (004-006) are built afterward. The backend provides summary/aggregation endpoints per data domain.

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js + React, CSS Grid for responsive layout, component-per-card architecture

**Backend**: Node.js + Express, summary endpoints per data domain

**Storage**: SQLite — reads from check_ins, goals, tasks tables (created by 004-006)

**API Style**: REST — `GET /api/dashboard/today`, or individual summary endpoints

**Testing**: Manual responsive validation across breakpoints

**Target Platform**: Responsive web app — mobile, tablet, desktop

**Project Type**: Decoupled frontend/backend

**Performance Goals**: Dashboard loads within 2 seconds. Individual cards show content within 1 second of data availability.

**Constraints**: API-first, minimal dependencies, responsive-first, empty states required, card-level error resilience

**Scale/Scope**: Authenticated single-user MVP

**Future Compatibility**: Charts, AI insights, customizable layout, weekly/monthly views

## Constitution Check

- **Clean Code and Boundaries**: Each card is an independent component. Dashboard page composes cards. Data fetching through API service modules.
- **Next.js + React Alignment**: Dashboard page uses App Router at `/dashboard`. Components in `src/features/dashboard/`.
- **Decoupled API-First Design**: Dashboard fetches data through REST endpoints. No direct database access from frontend.
- **Modular Backend Services**: Summary data provided by feature-specific services (checkinService, goalService, taskService). Dashboard controller orchestrates if needed.
- **Responsive-First UX**: CSS Grid layout — single column mobile, multi-column desktop. Cards maintain minimum readable width.
- **Required UI States**: Every card has loading (skeleton), empty (CTA), error (retry), and populated states.
- **Minimal Dependencies**: No new dependencies. Uses existing Next.js, React, CSS.
- **MVP Discipline**: Static card layout. No charts, drag-and-drop, or AI insights.
- **Learning and Maintainability**: Documents CSS Grid patterns, card composition, skeleton loading, error resilience.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- Dashboard page at `/dashboard` (authenticated)
- Greeting header with user name and current date
- Health summary card (check-in data or empty state)
- Task summary card (counts by status or empty state)
- Goals summary card (active goals progress or empty state)
- Productivity indicator card (score or empty state)
- Responsive grid layout (mobile → desktop)
- Skeleton loading states per card
- Empty state CTAs linking to relevant features
- Card-level error handling with retry

**Explicitly Excluded**:

- Charts and graphs
- Weekly/monthly summary views
- Dashboard customization
- AI-generated insights
- Notification badges
- Quick actions from cards
- Calendar mini-view

**Dependencies With Other Features**:

- Depends on: 001-project-foundation, 002-auth
- Data sources: 004-daily-checkin, 005-goals, 006-task-kanban (dashboard shows empty states until these exist)

**Assumptions**:

- [ASSUMPTION: Dashboard can be built and validated with empty states before data features exist.]
- [ASSUMPTION: Each card fetches independently — no single aggregated API call for MVP.]

## Architecture Decisions

**Frontend Route Structure**: `/dashboard` as protected route. Redirected to after login.

**Frontend Component Boundaries**:
- `app/dashboard/page.js` — Dashboard page
- `src/features/dashboard/components/DashboardLayout.jsx` — Grid layout wrapper
- `src/features/dashboard/components/GreetingHeader.jsx` — User greeting + date
- `src/features/dashboard/components/HealthSummaryCard.jsx` — Check-in data card
- `src/features/dashboard/components/TaskSummaryCard.jsx` — Task status counts
- `src/features/dashboard/components/GoalSummaryCard.jsx` — Goal progress
- `src/features/dashboard/components/ProductivityCard.jsx` — Daily score
- `src/features/dashboard/components/EmptyStateCard.jsx` — Reusable empty state
- `src/features/dashboard/components/CardSkeleton.jsx` — Loading skeleton

**Backend Route/Controller/Service Structure**:
- `src/routes/dashboardRoutes.js` — GET /summary
- `src/controllers/dashboardController.js` — getSummary action
- Individual feature services for data retrieval (created by 004-006)

**Database Entities**: None created. Reads from: check_ins, goals, tasks (future).

**API Boundaries**: `GET /api/dashboard/summary?date=YYYY-MM-DD` → combined summary object. Or individual endpoints per feature.

**Authentication Impact**: Requires authenticated user. All queries filtered by user_id.

**Analytics/Reporting Impact**: Dashboard load metrics. Card interaction tracking.

**Future AI Impact**: Dashboard is the primary surface for AI insights. Card structure should support injecting AI-generated content.

## Project Structure

### Source Code

```text
frontend/
|-- app/
|   `-- dashboard/
|       `-- page.js
|-- src/
|   |-- features/
|   |   `-- dashboard/
|   |       `-- components/
|   |           |-- DashboardLayout.jsx
|   |           |-- GreetingHeader.jsx
|   |           |-- HealthSummaryCard.jsx
|   |           |-- TaskSummaryCard.jsx
|   |           |-- GoalSummaryCard.jsx
|   |           |-- ProductivityCard.jsx
|   |           |-- EmptyStateCard.jsx
|   |           `-- CardSkeleton.jsx
|   `-- services/
|       `-- dashboardApi.js

backend/
|-- src/
|   |-- controllers/
|   |   `-- dashboardController.js
|   |-- routes/
|   |   `-- dashboardRoutes.js
|   `-- services/
|       (uses feature-specific services from 004-006)
```

## Frontend Plan

**Affected Routes**: `/dashboard` — protected, authenticated landing page.

**Pages and Layouts**: Dashboard page inside the authenticated layout. Greeting header above card grid.

**Components**: Independent card components. Each handles its own data lifecycle (loading → data/empty → error).

**State Management**: Each card fetches data independently on mount. No shared dashboard state beyond user context from auth.

**Forms and Validation**: None — dashboard is read-only.

**UI States**:

- **Loading**: CardSkeleton with animated gradient placeholder per card
- **Empty**: EmptyStateCard with icon, message, and CTA button linking to the relevant feature
- **Error**: Card-level error message with "Try again" button that re-fetches
- **Success**: Populated card with data display

**Responsive Behavior**: CSS Grid — `grid-template-columns: 1fr` on mobile, `repeat(2, 1fr)` on tablet, `repeat(auto-fit, minmax(320px, 1fr))` on desktop. Cards maintain min-height for consistent grid. Gap spacing scales with viewport.

**Accessibility Notes**: Cards use `<article>` or `<section>` with aria-label. Status values have text alternatives. CTA buttons have descriptive text. Color is not the only status indicator.

## Backend Plan

**Endpoints**:

- `GET /api/dashboard/summary?date=YYYY-MM-DD` — Returns aggregated dashboard data for the authenticated user on the given date.

**Response Shape**:

```json
{
  "greeting": { "name": "Davi", "date": "2026-05-20" },
  "checkin": null,
  "tasks": { "todo": 0, "in_progress": 0, "done": 0, "total": 0 },
  "goals": { "active": 0, "completed": 0, "total": 0 },
  "productivity": null
}
```

**Controllers**: `dashboardController.js` — calls individual services, assembles response.

**Services**: Delegates to checkinService, taskService, goalService (created by respective features). Returns null/defaults when services or tables don't exist yet.

**Authentication/Authorization**: Requires auth middleware. Queries filtered by req.user.id.

**Error Handling**: Returns partial data if one service fails. 401 for unauthenticated. 500 for unexpected errors.

## Database Plan

**Tables**: None created. Dashboard reads from tables created by 004-006.

**SQLite → PostgreSQL Compatibility**: Summary queries use standard SQL (COUNT, SUM, WHERE).

## Testing Strategy

**Manual Testing Checklist**:

- [ ] Dashboard loads with greeting showing user name and today's date
- [ ] Empty state cards display for all sections with CTAs
- [ ] Skeleton loaders appear during data loading
- [ ] Mobile layout: single column, no overlap, no horizontal scrolling
- [ ] Tablet layout: 2-column grid
- [ ] Desktop layout: multi-column grid
- [ ] Card-level error displays with retry button
- [ ] Dashboard requires authentication (redirect to /login if unauthenticated)

## Learning Goals

**Concepts Practiced**: CSS Grid responsive layout, card composition pattern, skeleton loading, empty state UX design, independent data fetching per component, error resilience in aggregation views.

**Architecture Decisions Being Learned**: Dashboard as a read-only aggregation layer, card independence for maintainability, progressive data display.

## Implementation Phases

**Phase 0**: Verify auth is working. Confirm protected route access.

**Phase 1**: Create dashboard page, layout grid, and greeting header.

**Phase 2**: Build card components with empty states and skeletons.

**Phase 3**: Create backend summary endpoint (returns defaults/nulls initially).

**Phase 4**: Connect frontend cards to API. Handle loading/error states.

**Phase 5**: Responsive validation and polish.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| Dashboard before data features | Establishes the primary UI surface | Waiting for all data features delays core UX | Cards show empty states; data integration added per feature |
