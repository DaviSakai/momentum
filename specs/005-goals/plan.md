# Implementation Plan: Goals

**Branch**: `005-goals` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-goals/spec.md`

## Summary

**Primary Requirement**: Allow users to create, categorize, track progress, and manage goals across weekly, monthly, and annual time periods.

**User Value**: Goals give direction to the daily tracking data. Without goals, Momentum captures activity but provides no sense of progress toward desired outcomes.

**Affected Momentum Module**: Goals

**Implementation Strategy**: Build a CRUD feature for goals with filtering by status, category, and period. The backend provides RESTful endpoints with a dedicated summary endpoint for the dashboard. The frontend uses a list/card layout with inline progress update, filter controls, and create/edit forms. Progress is a user-entered percentage (0–100).

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js + React, goal cards with progress bars, filter controls

**Backend**: Node.js + Express, CRUD + summary endpoints, query parameter filtering

**Storage**: SQLite — `goals` table with user_id FK

**API Style**: REST — CRUD under `/api/goals`, plus summary for dashboard

**Testing**: Manual CRUD and responsive validation

**Target Platform**: Responsive web app

**Performance Goals**: Goal list loads within 1 second. CRUD operations under 500ms.

**Constraints**: API-first, user ownership, predefined categories, minimal dependencies

**Scale/Scope**: Authenticated single-user MVP

**Future Compatibility**: Analytics queries, AI goal recommendations, sub-goals, recurring goals

## Constitution Check

- **Clean Code and Boundaries**: goalService handles business logic (status transitions, validation). goalController handles HTTP. goalModel handles SQL.
- **Next.js + React Alignment**: Goals page uses App Router at `/goals`.
- **Decoupled API-First Design**: Frontend calls REST endpoints via goalApi service.
- **Modular Backend Services**: Goal logic in goalService, reusable by dashboard and future reports.
- **Responsive-First UX**: Goal cards stack on mobile. Filters accessible. Progress bars touch-friendly.
- **Required UI States**: Loading (skeleton), empty (CTA), error (retry), populated (cards with progress).
- **Minimal Dependencies**: No new dependencies.
- **MVP Discipline**: No sub-goals, templates, automation, charts, or AI.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- Goal CRUD (create, read, update, delete)
- Progress tracking (0–100%)
- Status management (active, completed, paused)
- Predefined categories (Health, Productivity, Study, Fitness, Career, Personal, Financial)
- Period labels (weekly, monthly, annual)
- Filtering by status, category, period
- Dashboard summary integration
- Responsive goal list layout
- Empty states, loading, error handling

**Explicitly Excluded**:

- Sub-goals, goal hierarchies
- Automated progress from tasks/habits
- Goal templates, suggestions
- Charts, analytics
- Recurring goals
- AI recommendations

**Dependencies With Other Features**:

- Depends on: 001-project-foundation, 002-auth
- Feeds: 003-dashboard (goal summary card)

## Architecture Decisions

**Frontend Route Structure**: `/goals` for list + create. Edit via modal or inline.

**Frontend Component Boundaries**:
- `app/goals/page.js` — Goals page
- `src/features/goals/components/GoalList.jsx` — List wrapper with filters
- `src/features/goals/components/GoalCard.jsx` — Single goal card with progress bar
- `src/features/goals/components/GoalForm.jsx` — Create/edit form
- `src/features/goals/components/GoalFilters.jsx` — Status/category/period filter controls
- `src/features/goals/components/GoalProgressBar.jsx` — Visual progress indicator
- `src/features/goals/components/GoalStatusBadge.jsx` — Active/completed/paused badge
- `src/services/goalApi.js` — API client

**Backend Structure**:
- `src/routes/goalRoutes.js`
- `src/controllers/goalController.js` — list, summary, getById, create, update, updateProgress, delete
- `src/services/goalService.js` — validation, status transitions, summary aggregation
- `src/models/goalModel.js` — SQL queries
- `src/validators/goalValidator.js` — input validation

**Database Entities**: `goals` table with INDEX(user_id, status) and INDEX(user_id, category)

## Project Structure

```text
frontend/
|-- app/
|   `-- goals/
|       `-- page.js
|-- src/
|   |-- features/
|   |   `-- goals/
|   |       `-- components/
|   |           |-- GoalList.jsx
|   |           |-- GoalCard.jsx
|   |           |-- GoalForm.jsx
|   |           |-- GoalFilters.jsx
|   |           |-- GoalProgressBar.jsx
|   |           `-- GoalStatusBadge.jsx
|   `-- services/
|       `-- goalApi.js

backend/
|-- src/
|   |-- controllers/
|   |   `-- goalController.js
|   |-- services/
|   |   `-- goalService.js
|   |-- routes/
|   |   `-- goalRoutes.js
|   |-- models/
|   |   `-- goalModel.js
|   `-- validators/
|       `-- goalValidator.js

database/
`-- migrations/
    `-- 003_create_goals.sql
```

## Frontend Plan

**Affected Routes**: `/goals` — protected, goal management page.

**Components**: GoalList displays GoalCards with GoalFilters above. GoalForm in modal for create/edit. GoalProgressBar and GoalStatusBadge as visual elements inside cards.

**State Management**: Goal list fetched on mount. Filter state in URL query params or local state. Re-fetch on filter change.

**Forms and Validation**: Title required, category required (select), period required (select), progress 0–100. Client-side validation before submit.

**UI States**:
- **Loading**: Skeleton cards during fetch
- **Empty**: "No goals yet — set your first goal!" with CTA
- **Error**: Banner with retry
- **Success**: Toast on create/update/delete

**Responsive Behavior**: Goal cards stack vertically on mobile. 2-column on tablet. 3-column on desktop. Filters in a horizontal bar on desktop, collapsible on mobile.

**Accessibility**: Progress bar with aria-valuenow/min/max. Status badges with text labels. Filter controls labeled. Delete confirmation dialog is keyboard-accessible.

## Backend Plan

**Endpoints**:
- `GET /api/goals?status=active&category=Health&period=monthly` — Filtered list
- `GET /api/goals/summary` — Dashboard data: { active, completed, total, avg_progress }
- `GET /api/goals/:id` — Single goal
- `POST /api/goals` — Create. Body: { title, description, category, period, target_value, target_date }
- `PUT /api/goals/:id` — Full update
- `PATCH /api/goals/:id/progress` — Progress only. Body: { progress }
- `DELETE /api/goals/:id` — Delete with ownership check

**Validation**: title (1–200), category (valid enum), period (weekly/monthly/annual), progress (0–100), status (active/completed/paused).

**Error Handling**: 400 validation, 401 unauth, 403 not owner, 404 not found, 500 unexpected.

## Database Plan

**Tables**: `goals`

**Fields**: id, user_id, title, description, category, period, status, progress, target_value, target_date, created_at, updated_at.

**Indexes**: INDEX(user_id, status), INDEX(user_id, category).

**Relationships**: FK user_id → users(id) ON DELETE CASCADE.

**SQLite → PostgreSQL**: TEXT enums portable. CHECK constraints work in both. No SQLite-specific features.

## Testing Strategy

**Manual Testing Checklist**:
- [ ] Create goal with all fields → appears in list
- [ ] Create goal with required fields only → works
- [ ] Update goal progress → progress bar reflects change
- [ ] Change status active → completed → reflected in UI and filters
- [ ] Filter by status → correct results
- [ ] Filter by category → correct results
- [ ] Filter by period → correct results
- [ ] Delete goal with confirmation → removed from list
- [ ] Empty state shown when no goals exist
- [ ] Dashboard goal summary card reflects active goals
- [ ] Mobile layout: cards stack, filters accessible
- [ ] Desktop layout: multi-column grid

## Learning Goals

**Concepts Practiced**: CRUD patterns, list filtering with query params, progress visualization, status state management, confirmation dialogs, enum validation.

## Implementation Phases

**Phase 1**: Setup — directories, API client stub.
**Phase 2**: Database — migration, model.
**Phase 3**: Backend — service, validator, controller, routes.
**Phase 4**: Frontend — form, list, cards, filters.
**Phase 5**: Dashboard integration — summary endpoint and card.
**Phase 6**: Polish — responsive, accessibility, delete confirmation.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| None | Feature uses existing stack cleanly | N/A | N/A |
