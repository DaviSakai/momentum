# Feature Specification: Goals

**Project**: Momentum

**Feature Branch**: `005-goals`

**Created**: 2026-05-20

**Status**: Draft

**Original Input**: Allow the user to create and track weekly, monthly, and annual goals.

**Spec Owner**: AI-assisted development

**Initial Scope**: MVP

## 1. Feature Name

Goals

## 2. Context and Goal

Goals give Momentum users a way to define what they want to achieve across different time horizons — weekly, monthly, and annual. Unlike tasks (which are concrete actions), goals represent desired outcomes that the user works toward over time through habits, tasks, and daily effort.

**Primary Goal**: Allow users to create, categorize, track progress, and manage goals across different time periods so they can stay focused on what matters most.

**Related Momentum Area**: Goals

**Product Connection**: Goals feed the dashboard summary card, connect to productivity and health categories, and provide the foundation for future reports, analytics, and AI-driven recommendations about goal completion patterns.

## 3. User Problem

**Current Problem**: Users have no structured way to define and track what they want to achieve. Daily check-ins and tasks capture activity, but without goals, there's no sense of direction or progress toward larger outcomes.

**Impact if Unsolved**: Users track daily metrics but cannot see how those metrics connect to bigger aspirations. Momentum becomes a data logger rather than a personal growth platform.

**Desired Outcome**: Users define clear goals, track their progress incrementally, and see how daily actions contribute to longer-term outcomes.

## 4. Target User

- **Primary User**: A person who sets personal, professional, health, or academic goals and wants to track progress.
- **Usage Profile**: Personal organization + Performance tracking
- **Expected Experience Level**: Beginner to intermediate.
- **Expected Frequency**: Weekly (review/update), monthly (create/evaluate).
- **Usage Moment**: Weekly review, monthly planning, daily dashboard glance.

## 5. User Stories

### User Story 1 - Create Goal (Priority: P1)

As a user, I want to create a goal with a title, category, time period, and target, so that I have a clear objective to work toward.

**Priority Rationale**: Goal creation is the core entry point for the entire feature.

**Independent Test**: Create a goal and verify it appears in the goals list.

**Related Requirements**: [FR-001, FR-002, FR-003, FR-004]

**Acceptance Scenarios**:

1. **Given** the goals page, **when** the user fills in title, category, period, and optional target/description, **then** a new goal is created and appears in the list.
2. **Given** the creation form, **when** required fields are missing, **then** validation errors are shown.
3. **Given** a new goal, **when** it is created, **then** its status defaults to "active" with 0% progress.

---

### User Story 2 - Update Goal Progress (Priority: P1)

As a user, I want to update my goal's progress, so that I can track how close I am to achieving it.

**Priority Rationale**: Progress tracking is the core value — goals without progress updates are just text.

**Independent Test**: Create a goal, update its progress to 50%, and verify the progress is reflected.

**Related Requirements**: [FR-005, FR-006]

**Acceptance Scenarios**:

1. **Given** an active goal, **when** the user updates progress (percentage or milestone), **then** the progress is saved and visually reflected.
2. **Given** a goal at 100% progress, **when** the user marks it as completed, **then** the status changes to "completed".

---

### User Story 3 - View and Filter Goals (Priority: P1)

As a user, I want to view my goals filtered by status, category, or period, so that I can focus on what's relevant now.

**Priority Rationale**: As goals accumulate, filtering becomes essential for usability.

**Independent Test**: Create goals in different categories and verify filtering works correctly.

**Related Requirements**: [FR-007, FR-008, FR-009]

**Acceptance Scenarios**:

1. **Given** multiple goals, **when** the user filters by status (active/completed/paused), **then** only matching goals are shown.
2. **Given** multiple goals, **when** the user filters by category, **then** only goals in that category are shown.
3. **Given** multiple goals, **when** the user filters by period (weekly/monthly/annual), **then** only matching goals are shown.

---

### User Story 4 - Edit and Delete Goals (Priority: P2)

As a user, I want to edit goal details or delete goals I no longer want, so that my goal list stays relevant and clean.

**Priority Rationale**: Important for maintenance but not blocking for initial use.

**Independent Test**: Edit a goal title and verify the change persists. Delete a goal and verify it's removed.

**Related Requirements**: [FR-010, FR-011]

**Acceptance Scenarios**:

1. **Given** an existing goal, **when** the user edits its title or category, **then** the changes are saved.
2. **Given** an existing goal, **when** the user deletes it, **then** it is removed after confirmation.

## 6. Main User Flow

1. User navigates to the goals page from the dashboard or navigation.
2. System displays the user's goals, grouped or filtered by status/period.
3. User clicks "Create Goal" and fills in the form.
4. System validates and saves the goal.
5. Goal appears in the list with initial 0% progress.
6. User periodically updates progress via the goal detail or inline action.
7. When complete, user marks the goal as done.

**Expected Successful End State**: User has active goals with tracked progress visible on both the goals page and the dashboard.

**Relevant Alternative Flows**:

- User pauses a goal they can't work on right now.
- User filters goals to see only active ones.
- User views completed goals for reflection.

## 7. Functional Requirements

- **FR-001**: The system MUST allow users to create a goal with title (required), description (optional), category (required), period (required: weekly/monthly/annual), target_value (optional numeric), and target_date (optional).
- **FR-002**: The system MUST set the default status to "active" and progress to 0 for new goals.
- **FR-003**: The system MUST associate each goal with the authenticated user.
- **FR-004**: Categories MUST include at minimum: Health, Productivity, Study, Fitness, Career, Personal, Financial. [ASSUMPTION: Categories are predefined, not user-customizable for MVP.]
- **FR-005**: The system MUST allow users to update goal progress as a percentage (0–100).
- **FR-006**: The system MUST allow users to change goal status: active, completed, paused.
- **FR-007**: The system MUST display all goals for the authenticated user.
- **FR-008**: The system MUST support filtering goals by status, category, and period.
- **FR-009**: Goals MUST be sorted by status (active first) then by created_at descending.
- **FR-010**: The system MUST allow users to edit goal title, description, category, period, target_value, and target_date.
- **FR-011**: The system MUST allow users to delete goals with confirmation.

**Out of Scope for This Version**:

- Sub-goals or nested goal hierarchies
- Goal templates or suggestions
- Goal sharing or collaboration
- Automated progress tracking (linked to habits or tasks)
- Goal analytics or trend charts
- Streak tracking
- AI-generated goal recommendations
- Recurring goals

## 8. Non-Functional Requirements

- **NFR-001**: The goals page MUST work on mobile, tablet, and desktop.
- **NFR-002**: Goal list operations MUST respond within 1 second.
- **NFR-003**: The goals page MUST show loading, empty, error, and populated states.
- **NFR-004**: Goal data MUST only be accessible by the owning user.
- **NFR-005**: The UI MUST provide clear visual distinction between active, completed, and paused goals.
- **NFR-006**: Progress indicators MUST be visually clear (progress bar, percentage, or equivalent).

## 9. Acceptance Criteria

- **AC-001**: Given the goals page, when the user creates a goal with valid data, then it appears in the list with 0% progress.
- **AC-002**: Given an active goal, when the user updates progress to 75%, then the progress bar reflects 75%.
- **AC-003**: Given active and completed goals, when the user filters by "active", then only active goals are shown.
- **AC-004**: Given no goals, when the user views the goals page, then an empty state with CTA is displayed.
- **AC-005**: Given the dashboard, when active goals exist, then the goal summary card shows count and progress.
- **AC-006**: Given a mobile viewport, when the goals page loads, then the layout is usable without overlap or horizontal scrolling.

## 10. Data and Initial Model

### Core Entities

- **Goal**: Represents a user-defined objective with progress tracking.
  - **Initial Attributes**: id (INTEGER PRIMARY KEY), user_id (INTEGER, FK → users.id), title (TEXT, required), description (TEXT, optional), category (TEXT, required), period (TEXT, required: weekly/monthly/annual), status (TEXT, default: active), progress (INTEGER, 0–100, default: 0), target_value (REAL, optional), target_date (TEXT, optional YYYY-MM-DD), created_at (TEXT, ISO 8601), updated_at (TEXT, ISO 8601).
  - **Relationships**: Belongs to User (user_id FK).
  - **Ownership**: Each goal belongs to the authenticated user.

### Minimum MVP Data

- title (required)
- category (required)
- period (required: weekly/monthly/annual)
- status (default: active)
- progress (default: 0)

### Derived or Calculated Data

- Goal completion rate (completed / total goals)
- Active goals count by category
- Average progress across active goals

## 11. Business Rules

- **BR-001**: Users can only view, create, edit, and delete goals they own.
- **BR-002**: Goal status transitions: active → completed, active → paused, paused → active, completed → active (reopen).
- **BR-003**: Progress must be between 0 and 100 (percentage).
- **BR-004**: Setting progress to 100 does not automatically change status to completed — user must explicitly complete.
- **BR-005**: Deleting a goal is permanent (no soft delete for MVP).
- **BR-006**: Categories are predefined strings stored in the database field.

**Related Technical Decisions**:

- **TD-001**: Store category as TEXT, not a separate categories table. Keeps schema simple for MVP. Can be normalized later.
- **TD-002**: Store period as TEXT (weekly/monthly/annual) rather than date ranges for simplicity.
- **TD-003**: Progress is a user-entered percentage, not calculated from sub-items.

## 12. Interface States

- **Initial State**: Goals list with any existing goals, or empty state for new users.
- **Empty State**: "No goals yet — set your first goal and start tracking progress!" with CTA button.
- **Loading State**: Skeleton loaders for goal list. Button spinner during create/update.
- **Success State**: Toast on create/update/delete. Goal appears/updates in list immediately.
- **Error State**: Inline form errors for validation. Banner for server errors.
- **Editing State**: Modal or inline form with pre-filled values.
- **Deletion State**: Confirmation dialog before permanent deletion.
- **Responsive/Mobile State**: Goal cards stack vertically. Filter controls accessible. Touch-friendly progress update.

## 13. Required Integrations

- **Frontend**: `/goals` route (protected). Goal list, creation form, edit form, filter controls.
- **Backend**: CRUD endpoints under `/api/goals`. Summary endpoint for dashboard.
- **Database**: `goals` table with user_id FK.
- **Authentication**: All endpoints require auth. All queries filtered by user_id.
- **Dashboard/Reports**: Dashboard goal summary card consumes `GET /api/goals/summary`.
- **External Services**: None.
- **Future AI**: Goal completion patterns, category trends, and timeline data can inform AI recommendations for goal setting and priority adjustment.

## 14. Frontend Impact

- **Pages/Screens**: `/goals` (list + create), `/goals/:id` (detail + edit, optional for MVP).
- **Components**: GoalList, GoalCard, GoalForm (create/edit), GoalFilters, GoalProgressBar, GoalStatusBadge, EmptyGoalsState.
- **Local/Global State**: Goals list fetched on mount. Filter state managed locally. Optimistic updates on progress change.
- **API Calls**: GET /api/goals (list with filters), POST /api/goals (create), PUT /api/goals/:id (update), DELETE /api/goals/:id, GET /api/goals/summary (dashboard).
- **UI Validation**: Title required, category required, period required, progress 0–100.
- **Accessibility**: Status badges have text labels. Progress bar has aria-valuenow. Filter controls labeled. Confirmation dialog is keyboard-accessible.
- **Responsiveness**: Goal cards fill available width on mobile. Filters collapse or simplify on small screens.
- **UX Risks**: Too many filter options could overwhelm. Keep filters simple — status, category, period.

## 15. Backend Impact

- **Expected Endpoints**:
  - `GET /api/goals` — List goals with optional filters (?status=active&category=Health&period=monthly). Sorted by status then created_at desc.
  - `GET /api/goals/summary` — Returns { active, completed, total, avg_progress } for dashboard.
  - `GET /api/goals/:id` — Single goal detail.
  - `POST /api/goals` — Create goal. Payload: { title, description, category, period, target_value, target_date }.
  - `PUT /api/goals/:id` — Update goal fields or progress.
  - `PATCH /api/goals/:id/progress` — Update progress only. Payload: { progress }.
  - `DELETE /api/goals/:id` — Delete goal. Validates ownership.
- **Server Validation**: title (required, 1–200 chars), category (required, valid enum), period (required, weekly/monthly/annual), progress (0–100), status (active/completed/paused).
- **Services/Controllers**: goalController.js, goalService.js (business rules, status transitions), goalModel.js (SQL queries).
- **Authentication/Authorization**: All endpoints require auth. Ownership check on update/delete.
- **API Errors**: 400 validation, 401 unauthenticated, 403 not owner, 404 not found, 500 unexpected.
- **Future Reuse**: goalService queries reusable by reports, analytics, AI modules.

## 16. Database Impact

- **New Tables**: `goals`
- **Main Fields**:
  - `id` INTEGER PRIMARY KEY
  - `user_id` INTEGER NOT NULL — FK → users(id)
  - `title` TEXT NOT NULL
  - `description` TEXT
  - `category` TEXT NOT NULL
  - `period` TEXT NOT NULL — weekly/monthly/annual
  - `status` TEXT NOT NULL DEFAULT 'active' — active/completed/paused
  - `progress` INTEGER NOT NULL DEFAULT 0 — 0–100
  - `target_value` REAL
  - `target_date` TEXT — YYYY-MM-DD
  - `created_at` TEXT NOT NULL
  - `updated_at` TEXT NOT NULL
- **Relationships**: FK user_id → users(id) ON DELETE CASCADE.
- **Important Indexes**: INDEX(user_id, status), INDEX(user_id, category).
- **Data Integrity**: NOT NULL on required fields. FK constraint. CHECK progress BETWEEN 0 AND 100.
- **Future Migration Notes**: TEXT enums → PostgreSQL ENUM or CHECK constraints. No SQLite-specific features used.

## 17. Errors, Validation, and Edge Cases

- **Input Validation**: title (1–200 chars), category (valid enum), period (weekly/monthly/annual), progress (0–100 integer), target_value (positive number), target_date (YYYY-MM-DD, future or past allowed).
- **Permission Error**: User cannot access/modify another user's goals.
- **Not Found Error**: Goal ID not found → 404.
- **Invalid State Error**: Invalid status transition (e.g., paused → completed directly — decide if allowed).
- **Edge Cases**: Goal with no target_date (open-ended), goal with 100% progress but not marked complete, many goals (performance), category with no goals (filter shows empty).
- **User-Facing Messages**: Clear validation feedback. "Goal created!" "Goal updated." "Are you sure you want to delete this goal?"

## 18. Metrics, Analytics, and Observability

### Product Metrics Generated by This Feature

- Goal completion rate by category and period.
- Average time to complete goals.
- Most popular goal categories.
- Active goals count over time.
- Progress velocity (how fast users advance toward goals).

### Technical Metrics or Observability Signals

- Goal creation/completion rates.
- API response times.
- Filter usage patterns.

### Future AI Potential

- Goal setting recommendations based on past completion patterns.
- Optimal goal count suggestions (preventing overcommitment).
- Category balance analysis (health vs career vs study).
- Correlation between daily check-in data and goal progress.
- Predictive goal completion estimates.

## 19. Technical Learning Points

- **Frontend**: List/filter UI patterns, progress visualization, CRUD form patterns, optimistic updates.
- **Backend**: Filtering with query parameters, enum validation, status state machines.
- **Database**: Index optimization for filtered queries, CHECK constraints, enum-like TEXT fields.
- **Architecture**: How a CRUD feature integrates with dashboard aggregation.
- **Quality**: Filter UX, confirmation dialogs, status badge design.

## 20. Future Enhancements

- Sub-goals and milestone tracking
- Goal templates and suggestions
- Automated progress from linked tasks/habits
- Goal analytics and trend charts
- Recurring goals (repeat weekly/monthly)
- Goal sharing and accountability partners
- AI-powered goal recommendations
- Goal reminders and notifications
- Goal archiving (soft delete)
- Goal timeline visualization

**When to Revisit This Feature**: After analytics/reporting features, after habit tracking is implemented, and when AI recommendations are being designed.

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

- [ASSUMPTION: Categories are predefined (not user-customizable) for MVP.]
- [ASSUMPTION: Progress is manually entered by the user, not calculated from linked items.]
- [ASSUMPTION: Goal deletion is permanent (no soft delete or archive for MVP).]
- [ASSUMPTION: Period is a label (weekly/monthly/annual), not enforced with start/end dates for MVP.]
- [ASSUMPTION: 002-auth is complete before goals work begins.]
