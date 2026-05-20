# Feature Specification: Daily Check-in

**Project**: Momentum

**Feature Branch**: `004-daily-checkin`

**Created**: 2026-05-20

**Status**: Draft

**Original Input**: Allow the user to register daily health, focus, energy, mood, hydration, sleep, study, training, and productivity data.

**Spec Owner**: AI-assisted development

**Initial Scope**: MVP

## 1. Feature Name

Daily Check-in

## 2. Context and Goal

The daily check-in is Momentum's primary data collection mechanism. It captures how the user feels and what they accomplished each day, generating the health and productivity data that feeds the dashboard, reports, analytics, and future AI-driven recommendations.

**Primary Goal**: Allow users to record daily health, wellness, and productivity metrics so they can track patterns, build awareness, and make data-informed decisions about their routine.

**Related Momentum Area**: Daily check-in | Health tracking | Productivity

**Product Connection**: Check-in data feeds the dashboard health summary card, productivity score, future weekly/monthly reports, trend analytics, and AI routine optimization.

## 3. User Problem

**Current Problem**: Users have no structured way to capture daily health and productivity data. Without consistent tracking, patterns in sleep, mood, energy, and productivity are invisible.

**Impact if Unsolved**: Users cannot identify what affects their performance. The dashboard has no health data to display. Future analytics and AI recommendations have no input data.

**Desired Outcome**: Users can quickly log their daily status in under 2 minutes, building a personal dataset that enables self-awareness and data-driven routine optimization.

## 4. Target User

- **Primary User**: A person who wants to track daily health, mood, energy, focus, and productivity patterns.
- **Usage Profile**: Health tracking + Productivity
- **Expected Experience Level**: Beginner — the form must be intuitive and fast.
- **Expected Frequency**: Daily — once per day.
- **Usage Moment**: Morning (previous day review) or evening (current day recap).

## 5. User Stories

### User Story 1 - Create Daily Check-in (Priority: P1)

As a Momentum user, I want to submit a daily check-in with my health and productivity metrics, so that I can track how I'm doing over time.

**Priority Rationale**: This is the core action of the feature — without data entry, nothing else works.

**Independent Test**: Submit a check-in form and verify the data is persisted and appears on the dashboard.

**Related Requirements**: [FR-001, FR-002, FR-003, FR-004, FR-005]

**Acceptance Scenarios**:

1. **Given** an authenticated user with no check-in for today, **when** they fill and submit the check-in form, **then** the data is saved and a success message is shown.
2. **Given** the check-in form, **when** the user submits with missing required fields, **then** validation errors are displayed inline.
3. **Given** a successful submission, **when** the user returns to the dashboard, **then** the health summary card shows today's data.

---

### User Story 2 - Edit Daily Check-in (Priority: P1)

As a user who already checked in today, I want to edit my check-in, so that I can correct mistakes or update values later in the day.

**Priority Rationale**: Users often realize they want to adjust values (e.g., logging water intake throughout the day). Blocking edits would force workarounds.

**Independent Test**: Submit a check-in, then edit it, and verify the updated values are persisted.

**Related Requirements**: [FR-006, FR-007]

**Acceptance Scenarios**:

1. **Given** a user with an existing check-in for today, **when** they navigate to the check-in page, **then** the form is pre-filled with existing data.
2. **Given** a pre-filled form, **when** the user changes values and submits, **then** the check-in is updated and a success message is shown.

---

### User Story 3 - One Check-in Per Day (Priority: P1)

As the system, I want to enforce one check-in per day per user, so that data remains consistent and meaningful.

**Priority Rationale**: Multiple check-ins per day would create ambiguity in dashboard and reporting data.

**Independent Test**: Try to create a second check-in for the same date and verify it's blocked or redirected to edit.

**Related Requirements**: [FR-008]

**Acceptance Scenarios**:

1. **Given** a user who already checked in today, **when** they try to create a new check-in, **then** they are redirected to edit the existing one.
2. **Given** a check-in endpoint, **when** a duplicate date is submitted, **then** a 409 conflict error is returned.

---

### User Story 4 - View Check-in History (Priority: P2)

As a user, I want to view my past check-ins, so that I can review my patterns over time.

**Priority Rationale**: Historical view is valuable but not blocking for MVP — users can see today's data on the dashboard first.

**Independent Test**: Submit check-ins on multiple dates and verify a list of past entries is displayed.

**Related Requirements**: [FR-009, FR-010]

**Acceptance Scenarios**:

1. **Given** a user with multiple check-ins, **when** they view the check-in history, **then** entries are listed in reverse chronological order.
2. **Given** the history list, **when** the user clicks an entry, **then** they can view or edit that check-in.

## 6. Main User Flow

1. User navigates to the check-in page (from dashboard CTA or navigation).
2. System checks if a check-in exists for today.
3. If no check-in: system displays an empty form. If check-in exists: system pre-fills the form.
4. User fills in or updates metrics: sleep hours, mood, energy, focus, hydration, study hours, training, productivity score.
5. User submits the form.
6. System validates input (client + server).
7. System saves or updates the check-in.
8. System shows success feedback and option to return to dashboard.

**Expected Successful End State**: Today's check-in data is persisted and reflected on the dashboard.

**Relevant Alternative Flows**:

- User submits partial data (only some fields filled — optional fields are allowed).
- User navigates to check-in from history and edits a past entry.

## 7. Functional Requirements

- **FR-001**: The system MUST allow users to create a daily check-in with the following metrics: sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes.
- **FR-002**: The system MUST validate input ranges: sleep_hours (0–24), mood (1–5), energy (1–5), focus (1–5), hydration (0–20 glasses), study_hours (0–24), productivity_score (1–10).
- **FR-003**: The check-in MUST be associated with the authenticated user and a specific date.
- **FR-004**: mood, energy, focus, and productivity_score MUST be required fields. Others are optional.
- **FR-005**: The system MUST provide visual feedback on successful submission.
- **FR-006**: The system MUST allow users to edit their existing check-in for any date they own.
- **FR-007**: When editing, the form MUST be pre-filled with existing values.
- **FR-008**: The system MUST enforce one check-in per user per date (unique constraint on user_id + date).
- **FR-009**: The system MUST display a list of past check-ins for the authenticated user.
- **FR-010**: The check-in history MUST be sorted by date in descending order (most recent first).

**Out of Scope for This Version**:

- Charts or trend visualizations (future analytics feature)
- Weekly or monthly aggregation views
- Automated reminders or notifications
- Photo or attachment uploads
- Social sharing
- AI-generated insights based on check-in data
- Check-in streaks display

## 8. Non-Functional Requirements

- **NFR-001**: The check-in form MUST be usable on mobile, tablet, and desktop.
- **NFR-002**: Form submission MUST complete within 1 second under normal conditions.
- **NFR-003**: The form MUST show loading, success, and error states.
- **NFR-004**: Check-in data MUST only be accessible by the owning user.
- **NFR-005**: The form MUST be completable in under 2 minutes.
- **NFR-006**: Input controls MUST be appropriate for the data type (sliders/selects for ratings, number inputs for hours).
- **NFR-007**: The data model MUST support future PostgreSQL migration without schema redesign.

## 9. Acceptance Criteria

- **AC-001**: Given a logged-in user, when they submit a valid check-in, then the data is persisted with user_id and date.
- **AC-002**: Given an existing check-in for today, when the user opens the check-in page, then the form is pre-filled.
- **AC-003**: Given an existing check-in for today, when the user submits a duplicate, then the system updates the existing entry (upsert behavior) or redirects to edit.
- **AC-004**: Given check-in data, when the dashboard loads, then the health summary card reflects the latest values.
- **AC-005**: Given the check-in form on mobile, when the user interacts with it, then all controls are touch-friendly and the layout has no overlap.
- **AC-006**: Given past check-ins, when the user views history, then entries are listed by date descending.

## 10. Data and Initial Model

### Core Entities

- **CheckIn**: Represents one daily check-in entry for a user.
  - **Initial Attributes**: id (INTEGER PRIMARY KEY), user_id (INTEGER, FK → users.id), date (TEXT, ISO date YYYY-MM-DD), sleep_hours (REAL, optional), mood (INTEGER, 1-5, required), energy (INTEGER, 1-5, required), focus (INTEGER, 1-5, required), hydration (INTEGER, glasses, optional), study_hours (REAL, optional), training_done (INTEGER, 0/1, optional), productivity_score (INTEGER, 1-10, required), notes (TEXT, optional), created_at (TEXT, ISO 8601), updated_at (TEXT, ISO 8601).
  - **Relationships**: Belongs to User (user_id FK).
  - **Ownership**: Each check-in belongs to the authenticated user. Users cannot access other users' check-ins.

### Minimum MVP Data

- user_id (required, from auth)
- date (required, YYYY-MM-DD)
- mood (required, 1–5)
- energy (required, 1–5)
- focus (required, 1–5)
- productivity_score (required, 1–10)

### Derived or Calculated Data

- Daily wellness score (average of mood + energy + focus)
- Weekly averages (future)
- Trend direction (improving/declining/stable — future)

## 11. Business Rules

- **BR-001**: Each user can have at most one check-in per date (UNIQUE on user_id + date).
- **BR-002**: Users can only view, create, and edit check-ins they own.
- **BR-003**: mood, energy, and focus use a 1–5 scale (1 = very low, 5 = excellent).
- **BR-004**: productivity_score uses a 1–10 scale.
- **BR-005**: sleep_hours accepts decimal values (e.g., 7.5 hours).
- **BR-006**: Creating a check-in for a date that already has one results in an update (upsert) or a redirect to edit.
- **BR-007**: Check-in date defaults to today but can be set to past dates for retroactive entries.

**Related Technical Decisions**:

- **TD-001**: Use upsert (INSERT OR REPLACE) behavior for the check-in endpoint to simplify the create/edit flow. [ASSUMPTION: Upsert is preferred over separate create and update endpoints for the MVP.]
- **TD-002**: Store date as TEXT in YYYY-MM-DD format for SQLite/PostgreSQL portability.
- **TD-003**: Use INTEGER (0/1) for boolean fields (training_done) for SQLite compatibility.

## 12. Interface States

- **Initial State**: Empty check-in form with default values and clear labels.
- **Empty State**: "You haven't checked in today — how are you feeling?" with CTA.
- **Loading State**: Submit button shows loading indicator. Fields disabled during submission.
- **Success State**: Toast or banner: "Check-in saved!" with link back to dashboard.
- **Error State**: Inline validation errors per field. Server error shows banner with retry.
- **Editing State**: Form pre-filled with existing values. Submit button says "Update" instead of "Save".
- **Responsive/Mobile State**: Single-column form layout. Touch-friendly sliders or select inputs. Full-width on mobile.

## 13. Required Integrations

- **Frontend**: `/checkin` route (protected). Check-in form component. History list component.
- **Backend**: `GET /api/checkins/today`, `GET /api/checkins`, `POST /api/checkins`, `PUT /api/checkins/:id`.
- **Database**: `check_ins` table with user_id FK to users.
- **Authentication**: Requires authenticated user. All queries filtered by user_id.
- **Dashboard/Reports**: Dashboard health card consumes `GET /api/checkins/today`. Future reports consume historical data.
- **External Services**: None.
- **Future AI**: Check-in data is the primary input for AI routine analysis — mood/energy/sleep patterns, productivity correlations, personalized recommendations.

## 14. Frontend Impact

- **Pages/Screens**: `/checkin` (create/edit form), `/checkin/history` (list of past check-ins).
- **Components**: CheckInForm (main form with all metric inputs), CheckInHistoryList (list of past entries), CheckInHistoryItem (single entry summary), MetricInput (reusable rating/slider component).
- **Local/Global State**: Form state managed locally. Today's check-in status fetched on mount.
- **API Calls**: GET /api/checkins/today (check if exists), POST /api/checkins (create/upsert), PUT /api/checkins/:id (update), GET /api/checkins (history list).
- **UI Validation**: Required fields (mood, energy, focus, productivity), range validation, numeric-only for hours.
- **Accessibility**: Labels for all inputs, aria-valuemin/max for sliders, error messages linked to fields, keyboard-operable controls.
- **Responsiveness**: Single-column form on mobile. Possible 2-column grid on desktop for related fields. Full-width inputs.
- **UX Risks**: Too many fields could feel overwhelming. Group fields by category (wellness, activity, productivity) and consider progressive disclosure.

## 15. Backend Impact

- **Expected Endpoints**:
  - `GET /api/checkins/today` — Returns today's check-in for the user or null. Used by dashboard.
  - `GET /api/checkins` — Returns paginated list of user's check-ins sorted by date desc.
  - `POST /api/checkins` — Create or upsert a check-in. Payload: { date, sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes }.
  - `PUT /api/checkins/:id` — Update existing check-in. Validates ownership.
- **Server Validation**: Required fields, range validation, date format, user ownership.
- **Services/Controllers**: checkinController.js (create, update, getToday, getAll), checkinService.js (validation, upsert logic, queries).
- **Authentication/Authorization**: All endpoints require auth middleware. All queries filter by req.user.id.
- **API Errors**: 400 for validation, 401 for unauthenticated, 403 for unauthorized (wrong user), 404 for not found, 409 for duplicate date.
- **Future Reuse**: checkinService.getByDateRange() will be reused by reports and analytics.

## 16. Database Impact

- **New Tables**: `check_ins`
- **Main Fields**:
  - `id` INTEGER PRIMARY KEY
  - `user_id` INTEGER NOT NULL — FK → users.id
  - `date` TEXT NOT NULL — YYYY-MM-DD
  - `sleep_hours` REAL — 0–24, optional
  - `mood` INTEGER NOT NULL — 1–5
  - `energy` INTEGER NOT NULL — 1–5
  - `focus` INTEGER NOT NULL — 1–5
  - `hydration` INTEGER — glasses, optional
  - `study_hours` REAL — 0–24, optional
  - `training_done` INTEGER — 0/1, optional
  - `productivity_score` INTEGER NOT NULL — 1–10
  - `notes` TEXT — optional free text
  - `created_at` TEXT NOT NULL — ISO 8601
  - `updated_at` TEXT NOT NULL — ISO 8601
- **Relationships**: FK to users(id) with ON DELETE CASCADE.
- **Important Indexes**: UNIQUE index on (user_id, date). Index on user_id for list queries.
- **Data Integrity**: UNIQUE constraint on (user_id, date). NOT NULL on required fields. FK constraint to users.
- **Future Migration Notes**: REAL type maps to FLOAT/DOUBLE in PostgreSQL. TEXT dates map to DATE or TIMESTAMP. INTEGER booleans map to BOOLEAN.

## 17. Errors, Validation, and Edge Cases

- **Input Validation**: mood (1–5 integer), energy (1–5 integer), focus (1–5 integer), productivity_score (1–10 integer), sleep_hours (0–24 real), hydration (0–20 integer), study_hours (0–24 real), training_done (0 or 1), notes (max 1000 chars), date (YYYY-MM-DD format).
- **Permission Error**: User cannot access another user's check-ins.
- **Duplicate Error**: Second check-in for same date → upsert or redirect to edit.
- **Not Found Error**: Check-in ID not found → 404.
- **Edge Cases**: Future dates (allow? restrict to today and past?), timezone handling (use local date from client), midnight boundary (user checks in at 11:55 PM vs 12:05 AM), very old dates, decimal sleep hours.
- **User-Facing Messages**: Clear, actionable. "Please rate your mood from 1 to 5." "Check-in saved successfully!"

## 18. Metrics, Analytics, and Observability

### Product Metrics Generated by This Feature

- Daily mood, energy, focus averages over time.
- Sleep duration trends.
- Productivity score patterns.
- Check-in consistency (days with check-ins vs days without).
- Hydration and study hour tracking.

### Technical Metrics or Observability Signals

- Check-in creation/update rate.
- Form completion time.
- Validation error frequency (which fields cause most errors).
- API response time for check-in endpoints.

### Future AI Potential

- Mood/energy/sleep correlations for personalized recommendations.
- Productivity pattern analysis (best days, worst days, contributing factors).
- Routine optimization suggestions based on check-in history.
- Anomaly detection (unusual mood drops, sleep pattern changes).
- Predictive modeling (expected energy based on sleep and habits).

## 19. Technical Learning Points

- **Frontend**: Form handling with multiple input types (sliders, numbers, toggles, text), client-side validation, upsert UX pattern (create vs edit in same form).
- **Backend**: Upsert logic with SQLite, date handling, range validation, history pagination.
- **Database**: Composite unique constraints, date-based queries, index optimization for user + date lookups.
- **Architecture**: How a data entry feature integrates with a dashboard through APIs.
- **Quality**: Input validation patterns, edge case handling for dates and numeric ranges.
- **AI-Assisted Development**: Structured check-in data as foundation for future ML models.

## 20. Future Enhancements

- Visual trend charts (mood over time, sleep patterns, energy curves)
- Weekly and monthly aggregation reports
- Check-in reminders and notifications
- Streak tracking and gamification
- Photo attachments for daily journal entries
- Custom metrics (user-defined tracking fields)
- Export data as CSV/JSON
- AI-generated daily insights
- Correlation analysis (sleep vs productivity, mood vs energy)
- Social sharing of milestones

**When to Revisit This Feature**: After analytics/reporting features are designed. Check-in data is the primary input for all Momentum analytics.

## 21. Final Spec Checklist

- [x] The feature problem and goal are clear.
- [x] The target user and usage context are identified.
- [x] User stories are prioritized and independently testable.
- [x] Each main user story has related requirements and acceptance criteria.
- [x] The main flow and relevant alternative flows are described.
- [x] MVP scope is separated from future enhancements.
- [x] Functional requirements are verifiable.
- [x] Non-functional requirements cover UX, responsiveness, security, modularity, and technical evolution.
- [x] Acceptance criteria use observable results.
- [x] Required data, entities, relationships, and ownership are mapped.
- [x] Business rules and relevant technical decisions are described.
- [x] Interface states are covered.
- [x] Frontend, backend, database, authentication, reports, and future AI integrations are considered.
- [x] Predictable errors, validation rules, and edge cases are listed.
- [x] Metrics, analytics, and observability signals are considered.
- [x] Technical learning points are recorded.
- [x] Future enhancements are separated from current scope.
- [ ] Open questions are marked with `[NEEDS CLARIFICATION: ...]`.
- [x] Temporary assumptions are marked with `[ASSUMPTION: ...]`.

## Assumptions

- [ASSUMPTION: Upsert behavior (create or update if exists) is preferred for the check-in endpoint.]
- [ASSUMPTION: Date is determined by the user's local date, sent from the frontend.]
- [ASSUMPTION: Future dates are allowed for the MVP (no restriction). Can be revisited.]
- [ASSUMPTION: The form groups metrics into categories (wellness, activity, productivity) for better UX.]
- [ASSUMPTION: 002-auth is complete before daily check-in work begins.]
