# Tasks: Goals

**Input**: Design documents from `/specs/005-goals/`

**Prerequisites**: `plan.md` (required), `spec.md` (required). Features 001 and 002 must be complete.

**Tests**: OPTIONAL — manual CRUD and responsive validation.

## Phase 1: Setup

- [x] T001 Setup - Confirm 002-auth is complete and protected routes work
- [x] T002 Setup - Create frontend/src/features/goals/components/ directory

**Checkpoint**: Feature directory ready.

---

## Phase 2: Foundation

- [x] T003 Database - Create database/migrations/003_create_goals.sql with goals table (id, user_id, title, description, category, period, status, progress, target_value, target_date, created_at, updated_at) with FK to users and indexes on (user_id, status) and (user_id, category)
- [x] T004 Database - Run migration and verify goals table is created
- [x] T005 Backend - Implement backend/src/models/goalModel.js with create, findAllByUser (with filters), findById, update, delete, getSummary
- [x] T006 Backend - Implement backend/src/services/goalService.js with validation, status transitions, summary aggregation
- [x] T007 Backend - Implement backend/src/validators/goalValidator.js with validateGoal(body) for required fields, enums, and ranges
- [x] T008 Backend - Create backend/src/routes/goalRoutes.js with GET /, GET /summary, GET /:id, POST /, PUT /:id, PATCH /:id/progress, DELETE /:id
- [x] T009 Backend - Create backend/src/controllers/goalController.js with list, summary, getById, create, update, updateProgress, delete actions
- [x] T010 Backend - Mount goal routes in backend/src/routes/index.js under /goals prefix with auth middleware
- [x] T011 Frontend - Create frontend/src/services/goalApi.js with getAll(filters), getSummary(), getById(id), create(data), update(id, data), updateProgress(id, progress), delete(id)

**Checkpoint**: Backend CRUD functional. API client ready.

---

## Phase 3: User Story 1 - Create Goal (Priority: P1)

**Goal**: Users can create goals with title, category, period, and optional details.

**Independent Test**: Fill form → submit → goal appears in list with 0% progress.

- [x] T012 [P] [US1] Frontend - Implement frontend/src/features/goals/components/GoalForm.jsx with title, description, category select, period select, target_value, target_date inputs and client-side validation
- [x] T013 [P] [US1] Frontend - Implement frontend/src/features/goals/components/GoalProgressBar.jsx with visual progress indicator and aria attributes
- [x] T014 [P] [US1] Frontend - Implement frontend/src/features/goals/components/GoalStatusBadge.jsx with visual status indicator (active/completed/paused)
- [x] T015 [US1] Frontend - Implement frontend/src/features/goals/components/GoalCard.jsx displaying title, category, period, status badge, progress bar, and action buttons
- [x] T016 [US1] Frontend - Implement frontend/src/features/goals/components/GoalList.jsx composing GoalCard components with loading and empty states
- [x] T017 [US1] Frontend - Create frontend/app/goals/page.js mounting GoalList and GoalForm as protected route
- [x] T018 [US1] Frontend - Connect GoalForm submit to goalApi.create() with success toast and list refresh
- [x] T019 [US1] Backend - Verify POST /api/goals creates goal and returns 201
- [x] T020 [US1] Backend - Verify POST /api/goals returns 400 for missing required fields
- [x] T021 [US1] UX - Validate goals page on mobile (375px): cards stack, form is usable

**Checkpoint**: Goal creation works. Cards display in responsive list.

---

## Phase 4: User Story 2 - Update Progress (Priority: P1)

**Goal**: Users can update goal progress and change status.

- [x] T022 [US2] Frontend - Add inline progress update control to GoalCard (slider or input with save)
- [x] T023 [US2] Frontend - Connect progress update to goalApi.updateProgress(id, progress)
- [x] T024 [US2] Frontend - Add status change actions to GoalCard (complete, pause, reactivate)
- [x] T025 [US2] Frontend - Connect status change to goalApi.update(id, { status })
- [x] T026 [US2] Backend - Verify PATCH /api/goals/:id/progress updates progress and returns 200
- [x] T027 [US2] Backend - Verify PUT /api/goals/:id updates status and returns 200
- [x] T028 [US2] Backend - Verify ownership check returns 403 for other users' goals

**Checkpoint**: Progress tracking and status management work.

---

## Phase 5: User Story 3 - Filter Goals (Priority: P1)

**Goal**: Users can filter goals by status, category, and period.

- [x] T029 [US3] Frontend - Implement frontend/src/features/goals/components/GoalFilters.jsx with status, category, and period filter controls
- [x] T030 [US3] Frontend - Connect filters to goalApi.getAll(filters) — re-fetch on filter change
- [x] T031 [US3] Frontend - Show "No goals match filters" empty state when filters return zero results
- [x] T032 [US3] Backend - Verify GET /api/goals?status=active returns only active goals
- [x] T033 [US3] Backend - Verify GET /api/goals?category=Health returns only Health goals
- [x] T034 [US3] Backend - Verify GET /api/goals?period=monthly returns only monthly goals
- [x] T035 [US3] UX - Verify filters are accessible on mobile (collapsible or scrollable)

**Checkpoint**: Filtering works across all three dimensions.

---

## Phase 6: User Story 4 - Edit and Delete (Priority: P2)

**Goal**: Users can edit goal details and delete goals.

- [x] T036 [US4] Frontend - Add edit action to GoalCard that opens GoalForm with pre-filled values
- [x] T037 [US4] Frontend - Connect edit submit to goalApi.update(id, data) with success feedback
- [x] T038 [US4] Frontend - Add delete action to GoalCard with confirmation dialog
- [x] T039 [US4] Frontend - Connect delete confirmation to goalApi.delete(id) with list refresh
- [x] T040 [US4] Backend - Verify DELETE /api/goals/:id deletes goal and returns 200
- [x] T041 [US4] Backend - Verify DELETE /api/goals/:id returns 403 for other users' goals
- [x] T042 [US4] UX - Verify confirmation dialog is keyboard-accessible

**Checkpoint**: Full CRUD complete. Edit and delete with confirmation.

---

## Phase 7: Dashboard Integration

- [x] T043 Integration - Verify GET /api/goals/summary returns { active, completed, total, avg_progress }
- [x] T044 Integration - Update dashboard GoalSummaryCard to fetch and display data from summary endpoint
- [x] T045 Integration - Verify dashboard shows goal summary when goals exist
- [x] T046 Integration - Verify dashboard shows empty state CTA when no goals exist
- [x] T047 Integration - Add navigation from dashboard goal card to /goals

**Checkpoint**: Dashboard reflects goal data.

---

## Final Phase: Polish & Validation

- [x] T048 UX - Validate goals page on mobile, tablet, desktop — responsive grid, no overlap
- [x] T049 UX - Verify progress bar accessibility (aria-valuenow, aria-valuemin, aria-valuemax)
- [x] T050 UX - Verify status badges are distinguishable (color + text, not color alone)
- [x] T051 Backend - Review controller/service/model boundaries
- [x] T052 Database - Review goals schema for PostgreSQL portability
- [x] T053 Frontend - Review component structure for maintainability
- [x] T054 Docs - Update specs/005-goals/ with implementation notes
- [x] T055 Cleanup - Remove debugging code and unused imports

**Checkpoint**: Goals feature complete, responsive, accessible, and integrated.

---

## Dependencies & Execution Order

- **Foundation (Phase 2)**: Migration → model → service → validator → routes → controller → API client.
- **US1 Create (Phase 3)**: After Foundation.
- **US2 Progress (Phase 4)**: After US1 (needs existing goals).
- **US3 Filter (Phase 5)**: After US1 (needs goal list).
- **US4 Edit/Delete (Phase 6)**: After US1. Can parallel with US2/US3.
- **Dashboard (Phase 7)**: After US1.

---

## Technical Debt & Deferred Work

- **Future Improvements**: Sub-goals, automated progress, charts, recurring goals, AI recommendations.
- **Known Limitations**: Categories are hardcoded strings. Progress is manual only. No goal archive.
