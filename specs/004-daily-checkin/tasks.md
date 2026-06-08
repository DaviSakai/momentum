# Tasks: Daily Check-in

**Input**: Design documents from `/specs/004-daily-checkin/`

**Prerequisites**: `plan.md` (required), `spec.md` (required). Features 001 and 002 must be complete.

**Tests**: OPTIONAL — manual form and responsive validation.

## Phase 1: Setup

- [x] T001 Setup - Confirm 002-auth is complete and protected routes work
- [x] T002 Setup - Create frontend/src/features/checkin/components/ directory
- [x] T003 Setup - Confirm database migration system is operational

**Checkpoint**: Feature directory ready.

---

## Phase 2: Foundation

- [x] T004 Database - Create database/migrations/002_create_check_ins.sql with check_ins table (id, user_id, date, sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes, created_at, updated_at) with UNIQUE(user_id, date) and FK to users
- [x] T005 Database - Run migration and verify check_ins table is created
- [x] T006 Backend - Implement backend/src/models/checkinModel.js with create, update, findByUserAndDate, findAllByUser, findById
- [x] T007 Backend - Implement backend/src/services/checkinService.js with upsert logic, range validation, date handling
- [x] T008 Backend - Implement backend/src/validators/checkinValidator.js with validateCheckin(body) for required fields and ranges
- [x] T009 Backend - Create backend/src/routes/checkinRoutes.js with GET /today, GET /, POST /, PUT /:id
- [x] T010 Backend - Create backend/src/controllers/checkinController.js with getToday, getAll, create, update actions
- [x] T011 Backend - Mount checkin routes in backend/src/routes/index.js under /checkins prefix with auth middleware
- [x] T012 Frontend - Create frontend/src/services/checkinApi.js with getToday(), getAll(page), create(data), update(id, data)

**Checkpoint**: Backend CRUD is functional. API client ready.

---

## Phase 3: User Story 1 - Create Check-in (Priority: P1)

**Goal**: Users can submit a daily check-in with health and productivity metrics.

**Independent Test**: Fill form → submit → data persisted → success feedback.

- [x] T013 [P] [US1] Frontend - Implement frontend/src/features/checkin/components/MetricInput.jsx as reusable rating/number input component with label, min, max, step, and error display
- [x] T014 [US1] Frontend - Implement frontend/src/features/checkin/components/CheckInForm.jsx with grouped sections (Wellness, Activity, Productivity), client-side validation, loading/error/success states
- [x] T015 [US1] Frontend - Create frontend/app/checkin/page.js mounting CheckInForm as protected route
- [x] T016 [US1] Frontend - Connect CheckInForm submit to checkinApi.create() with loading indicator and success toast
- [x] T017 [US1] Backend - Verify POST /api/checkins creates check-in and returns 201 with check-in data
- [x] T018 [US1] Backend - Verify POST /api/checkins returns 400 for missing required fields or out-of-range values
- [x] T019 [US1] UX - Validate check-in form on mobile (375px): single column, touch-friendly inputs, no overlap
- [x] T020 [US1] UX - Validate check-in form on desktop (1280px): clean layout, adequate spacing

**Checkpoint**: Users can create check-ins. Form validates input. Responsive layout works.

---

## Phase 4: User Story 2 - Edit Check-in (Priority: P1)

**Goal**: Users can edit their existing check-in for today.

**Independent Test**: Open check-in page with existing data → form pre-filled → edit → save → updated.

- [x] T021 [US2] Frontend - On mount, call checkinApi.getToday() to check for existing check-in
- [x] T022 [US2] Frontend - If check-in exists, pre-fill CheckInForm with existing values and change button to "Update Check-in"
- [x] T023 [US2] Frontend - Connect update submit to checkinApi.update(id, data) with success feedback
- [x] T024 [US2] Backend - Verify PUT /api/checkins/:id updates check-in and returns 200
- [x] T025 [US2] Backend - Verify PUT /api/checkins/:id returns 403 if user doesn't own the check-in
- [x] T026 [US2] Backend - Verify PUT /api/checkins/:id returns 404 if check-in doesn't exist

**Checkpoint**: Edit flow works. Pre-fill verified. Ownership enforced.

---

## Phase 5: User Story 3 - One Per Day (Priority: P1)

**Goal**: System enforces one check-in per user per date.

- [x] T027 [US3] Backend - Verify UNIQUE(user_id, date) constraint prevents duplicate entries at database level
- [x] T028 [US3] Backend - Implement upsert behavior in POST /api/checkins: if check-in exists for date, update instead of creating
- [x] T029 [US3] Frontend - If user navigates to /checkin and today's check-in exists, show edit mode automatically

**Checkpoint**: One-per-day rule enforced at database and application level.

---

## Phase 6: User Story 4 - Check-in History (Priority: P2)

**Goal**: Users can view their past check-ins.

- [x] T030 [US4] Frontend - Implement frontend/src/features/checkin/components/CheckInHistoryItem.jsx showing date, mood, energy, focus, productivity in compact format
- [x] T031 [US4] Frontend - Implement frontend/src/features/checkin/components/CheckInHistoryList.jsx with list of CheckInHistoryItem components
- [x] T032 [US4] Frontend - Create frontend/app/checkin/history/page.js mounting CheckInHistoryList as protected route
- [x] T033 [US4] Frontend - Connect history list to checkinApi.getAll() with loading and empty states
- [x] T034 [US4] Backend - Verify GET /api/checkins returns paginated list sorted by date desc
- [x] T035 [US4] UX - Validate history list on mobile and desktop

**Checkpoint**: History displays past check-ins. Pagination works.

---

## Phase 7: Dashboard Integration

**Purpose**: Connect check-in data to the dashboard health summary card.

- [x] T036 Integration - Update dashboard HealthSummaryCard to fetch and display data from GET /api/checkins/today
- [x] T037 Integration - Verify dashboard shows today's check-in values when data exists
- [x] T038 Integration - Verify dashboard shows empty state CTA when no check-in exists for today
- [x] T039 Integration - Add navigation link from dashboard health card to /checkin

**Checkpoint**: Dashboard reflects check-in data in real time.

---

## Final Phase: Polish & Validation

- [x] T040 UX - Validate complete check-in flow on mobile: create → success → dashboard → edit
- [x] T041 UX - Verify form accessibility: labels, focus, keyboard navigation, error announcements
- [x] T042 Backend - Review controller/service/model boundaries
- [x] T043 Database - Review check_ins schema for PostgreSQL portability
- [x] T044 Frontend - Review component structure and naming consistency
- [x] T045 Docs - Update specs/004-daily-checkin/ with implementation notes
- [x] T046 Cleanup - Remove debugging code and unused imports

**Checkpoint**: Daily check-in feature is complete, responsive, and integrated with dashboard.

---

## Dependencies & Execution Order

- **Foundation (Phase 2)**: Migration → model → service → validator → routes → controller → API client.
- **US1 + US2**: Sequential (edit depends on create existing).
- **US3**: Can be done during US1/US2.
- **US4**: Independent after Foundation.
- **Dashboard Integration**: After US1 is working.

---

## Technical Debt & Deferred Work

- **Future Improvements**: Trend charts, weekly aggregations, reminders, custom metrics, AI insights.
- **Known Limitations**: No pagination UI on history (MVP shows latest N entries).
