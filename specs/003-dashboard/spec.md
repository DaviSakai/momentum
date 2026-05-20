# Feature Specification: Main Dashboard

**Project**: Momentum

**Feature Branch**: `003-dashboard`

**Created**: 2026-05-20

**Status**: Draft

**Original Input**: Create the main Momentum dashboard that summarizes the user's routine, productivity, health, goals, and tasks.

**Spec Owner**: AI-assisted development

**Initial Scope**: MVP

## 1. Feature Name

Main Dashboard

## 2. Context and Goal

The dashboard is the central hub of Momentum — the first screen users see after logging in. It provides a daily overview of the user's health, productivity, goals, and tasks, enabling quick scanning and informed decisions about the day's priorities.

**Primary Goal**: Give the user a single-screen summary of their current status across health, productivity, goals, and tasks so they can prioritize their day effectively.

**Related Momentum Area**: Dashboard

**Product Connection**: The dashboard consumes data from daily check-ins (004), goals (005), and task kanban (006). It is the primary landing surface for authenticated users and the main visualization point for all Momentum data.

## 3. User Problem

**Current Problem**: After logging in, the user has no overview of their current status. They would need to visit multiple separate pages to understand their sleep quality, mood, energy, task progress, and goal status.

**Impact if Unsolved**: Users lose the "at a glance" experience that makes daily tracking tools valuable. Without a dashboard, Momentum feels like disconnected forms rather than an integrated system.

**Desired Outcome**: The user opens Momentum and instantly sees a meaningful summary of their day — what they've tracked, what needs attention, and what progress they're making.

## 4. Target User

- **Primary User**: A person actively tracking their routine, health, productivity, and goals in Momentum.
- **Usage Profile**: Mixed use — daily overview across all tracked areas.
- **Expected Experience Level**: Beginner to intermediate.
- **Expected Frequency**: Daily — multiple times per day.
- **Usage Moment**: Morning planning, mid-day review, evening reflection.

## 5. User Stories

### User Story 1 - View Daily Status Overview (Priority: P1)

As a Momentum user, I want to see a summary of today's health, productivity, and task status on one screen, so that I can quickly understand where I stand.

**Priority Rationale**: The dashboard is the core value proposition — without it, Momentum is a collection of disconnected forms.

**Independent Test**: Log in and verify the dashboard displays cards for today's check-in status, task summary, and goal progress (or empty states if no data exists).

**Related Requirements**: [FR-001, FR-002, FR-003, FR-004]

**Acceptance Scenarios**:

1. **Given** a logged-in user with today's check-in data, **when** they view the dashboard, **then** health indicators (sleep, mood, energy, focus, hydration) are displayed.
2. **Given** a logged-in user with no check-in for today, **when** they view the dashboard, **then** an empty state card encourages them to complete their daily check-in.
3. **Given** a logged-in user with active goals, **when** they view the dashboard, **then** a summary of goal progress is displayed.
4. **Given** a logged-in user with tasks, **when** they view the dashboard, **then** a summary of today's tasks by status is displayed.

---

### User Story 2 - Empty State Experience (Priority: P1)

As a new user with no data, I want the dashboard to guide me toward my first actions, so that I understand how to start using Momentum.

**Priority Rationale**: New users will always see empty states first. A confusing empty dashboard will cause drop-off.

**Independent Test**: Register a new account and verify the dashboard shows clear empty states with calls to action.

**Related Requirements**: [FR-005, FR-006]

**Acceptance Scenarios**:

1. **Given** a new user with no data, **when** they view the dashboard, **then** each card shows an empty state with a clear call to action.
2. **Given** empty states, **when** the user clicks a CTA, **then** they are navigated to the relevant feature (check-in, goals, tasks).

---

### User Story 3 - Responsive Dashboard Layout (Priority: P1)

As a mobile user, I want the dashboard to be usable on my phone, so that I can check my status anywhere.

**Priority Rationale**: Constitution mandates responsive UX. Dashboard is the most-visited screen.

**Independent Test**: View the dashboard on mobile (375px) and verify cards stack vertically with no overlap or horizontal scrolling.

**Related Requirements**: [FR-007, NFR-001]

**Acceptance Scenarios**:

1. **Given** a mobile viewport (375px), **when** the dashboard loads, **then** cards stack vertically in a single column.
2. **Given** a desktop viewport (1280px+), **when** the dashboard loads, **then** cards arrange in a grid layout.
3. **Given** any viewport, **when** the dashboard loads, **then** no horizontal scrolling occurs and all text is readable.

## 6. Main User Flow

1. User logs in or opens Momentum (already authenticated).
2. System displays the dashboard at `/dashboard`.
3. Dashboard loads data for today's date: check-in status, task summary, goal progress.
4. Each dashboard card displays current data or an empty state with a call to action.
5. User scans their daily status and decides on next actions.
6. User clicks a card or CTA to navigate to the relevant feature.

**Expected Successful End State**: User has a clear picture of their current status and knows what to do next.

**Relevant Alternative Flows**:

- User has partial data (check-in done but no goals) — mixed filled and empty cards.
- User accesses dashboard on different days — data updates to reflect current date.

## 7. Functional Requirements

- **FR-001**: The dashboard MUST display a health summary card showing today's check-in data (sleep, mood, energy, focus, hydration) when available.
- **FR-002**: The dashboard MUST display a task summary card showing counts by status (to do, in progress, done) when tasks exist.
- **FR-003**: The dashboard MUST display a goals summary card showing active goals and their progress when goals exist.
- **FR-004**: The dashboard MUST display a productivity summary card with a daily check-in score or indicator when available.
- **FR-005**: The dashboard MUST show meaningful empty states with calls to action for each card when no data exists.
- **FR-006**: Empty state CTAs MUST navigate to the relevant feature page (check-in form, goal creation, task board).
- **FR-007**: The dashboard MUST use a responsive grid layout that adapts from single column (mobile) to multi-column (desktop).
- **FR-008**: The dashboard MUST show a greeting with the user's name and current date.
- **FR-009**: The dashboard MUST load data from backend API endpoints (not directly from the database).

**Out of Scope for This Version**:

- Charts or graphs (future analytics feature)
- Weekly or monthly summaries
- Drag-and-drop dashboard customization
- Widget configuration
- Real-time updates / WebSocket
- Notifications or alerts
- Calendar view

## 8. Non-Functional Requirements

- **NFR-001**: The dashboard MUST work on mobile (375px), tablet (768px), and desktop (1280px+) without overlap or scrolling issues.
- **NFR-002**: The dashboard MUST load and display content within 2 seconds.
- **NFR-003**: Each card MUST have loading, empty, error, and populated states.
- **NFR-004**: The dashboard MUST only display data belonging to the authenticated user.
- **NFR-005**: The layout MUST feel clean, modern, and premium — consistent with Momentum's design direction (Notion, Stripe, Linear, Apple Health references).
- **NFR-006**: Cards MUST maintain visual consistency in spacing, typography, and hierarchy.

## 9. Acceptance Criteria

- **AC-001**: Given an authenticated user with check-in data for today, when the dashboard loads, then health indicators are visible.
- **AC-002**: Given an authenticated user with no data, when the dashboard loads, then empty state cards with CTAs are visible.
- **AC-003**: Given a mobile viewport, when the dashboard loads, then cards stack in a single column with no overlap.
- **AC-004**: Given a desktop viewport, when the dashboard loads, then cards arrange in a grid layout.
- **AC-005**: Given any dashboard card, when data is loading, then a loading indicator is shown.
- **AC-006**: Given an API error, when the dashboard loads, then an error message is shown with retry option.

## 10. Data and Initial Model

### Core Entities

The dashboard does not create its own entities — it aggregates data from other features:

- **Daily Check-in** (from 004): sleep_hours, mood, energy, focus, hydration, study_hours, training, productivity_score
- **Goals** (from 005): title, status, progress, category, target_date
- **Tasks** (from 006): title, status (to_do, in_progress, done), priority, due_date

### Minimum MVP Data

- User name (from auth)
- Today's date
- Today's check-in summary (if exists)
- Active goals count and progress summary
- Task count by status

### Derived or Calculated Data

- Daily productivity score (from check-in data)
- Task completion percentage for today
- Goal completion rate

## 11. Business Rules

- **BR-001**: The dashboard MUST only display data belonging to the authenticated user.
- **BR-002**: "Today" is determined by the user's local date, sent as a query parameter to the backend.
- **BR-003**: Empty state cards MUST provide actionable next steps, not just "No data" messages.
- **BR-004**: The dashboard MUST gracefully handle partial data — show available cards and empty states for missing data.
- **BR-005**: Dashboard data is read-only — no create, update, or delete operations happen on the dashboard itself.

**Related Technical Decisions**:

- **TD-001**: Dashboard makes multiple API calls (one per data source) rather than a single aggregated endpoint. This keeps APIs modular and reusable. [ASSUMPTION: Multiple API calls are acceptable for MVP performance.]
- **TD-002**: Productivity score is a simple average or sum from check-in data, calculated in the backend service.

## 12. Interface States

- **Initial State**: Dashboard skeleton with greeting and card placeholders loading.
- **Empty State**: Each card shows a friendly empty message and a CTA button (e.g., "Start your first check-in", "Create a goal", "Add a task").
- **Loading State**: Skeleton loaders for each card while API calls are in progress.
- **Success State**: Cards populated with data, visual indicators for status.
- **Error State**: Card-level error with retry button. Dashboard does not break entirely if one API fails.
- **Responsive/Mobile State**: Single-column stacked cards on mobile. Grid on desktop. Touch-friendly card sizes.

## 13. Required Integrations

- **Frontend**: `/dashboard` route (protected). Dashboard page component. Individual card components. API service calls.
- **Backend**: `GET /api/dashboard/summary` or individual endpoints: `GET /api/checkins/today`, `GET /api/goals/summary`, `GET /api/tasks/summary`.
- **Database**: Reads from check_ins, goals, and tasks tables (created by features 004, 005, 006).
- **Authentication**: Requires authenticated user. User ID from auth middleware.
- **Dashboard/Reports**: This IS the dashboard.
- **External Services**: None.
- **Future AI**: Dashboard is the primary surface for future AI-generated insights and recommendations.

## 14. Frontend Impact

- **Pages/Screens**: `/dashboard` — main authenticated landing page.
- **Components**: DashboardPage, GreetingHeader, HealthSummaryCard, TaskSummaryCard, GoalSummaryCard, ProductivityCard, EmptyStateCard, CardSkeleton.
- **Local/Global State**: Dashboard data fetched on mount. Loading states per card. Error states per card.
- **API Calls**: GET /api/checkins/today, GET /api/goals/summary, GET /api/tasks/summary (or a combined endpoint).
- **UI Validation**: None — dashboard is read-only.
- **Accessibility**: Cards use semantic HTML (article or section), heading hierarchy within cards, sufficient contrast, screen reader friendly status indicators.
- **Responsiveness**: CSS Grid for desktop layout. Single column on mobile. Cards maintain minimum readable width.
- **UX Risks**: Too many loading states may feel slow. Consider skeleton loaders over spinners.

## 15. Backend Impact

- **Expected Endpoints**:
  - `GET /api/checkins/today` — Returns today's check-in data or null. Filtered by authenticated user and today's date.
  - `GET /api/goals/summary` — Returns active goals with progress. Filtered by authenticated user.
  - `GET /api/tasks/summary` — Returns task counts by status. Filtered by authenticated user.
- **Server Validation**: Date parameter validation (ISO format), user ownership enforcement.
- **Services/Controllers**: dashboardController.js (orchestrates summary calls) or individual feature controllers. checkinService, goalService, taskService for data retrieval.
- **Authentication/Authorization**: All endpoints require auth middleware. All queries filtered by req.user.id.
- **API Errors**: 401 for unauthenticated, 500 for unexpected errors. No 404 — empty data returns empty arrays/null.
- **Future Reuse**: Summary endpoints are reusable by weekly/monthly reports and future analytics.

## 16. Database Impact

- **New Tables**: None — dashboard reads from tables created by features 004, 005, 006.
- **Important Indexes or Queries**: user_id + date queries for check-ins. user_id + status queries for goals and tasks. These indexes should be created in their respective feature migrations.
- **Future Migration Notes**: Summary queries should use standard SQL compatible with both SQLite and PostgreSQL.

## 17. Errors, Validation, and Edge Cases

- **Permission Error**: User can only see their own dashboard data — enforced by user_id filtering.
- **Connection/API Error**: Individual card errors should not crash the entire dashboard. Show error per card with retry.
- **Edge Cases**: Timezone differences (use user's local date), first day with no data (all empty states), partial data (some cards filled, some empty), stale data after midnight crossing.
- **User-Facing Messages**: Empty states should be encouraging, not clinical. "No check-in for today — how are you feeling?" rather than "No data found."

## 18. Metrics, Analytics, and Observability

### Product Metrics Generated by This Feature

- Dashboard load time (perceived performance).
- Card interaction rates (which cards do users click first?).
- Empty state CTA conversion (do new users follow guidance?).

### Technical Metrics or Observability Signals

- API response times for each dashboard endpoint.
- Error rates per data source.
- Dashboard page load time.

### Future AI Potential

- Dashboard is the primary surface for AI-generated daily recommendations ("Based on your sleep and energy trends, consider...").
- Card data provides the aggregated view that AI models would consume for pattern detection.
- User interaction patterns with dashboard cards inform feature prioritization.

## 19. Technical Learning Points

- **Frontend**: Component composition, CSS Grid layouts, skeleton loading pattern, responsive card design, data aggregation in the UI.
- **Backend**: Read-only summary endpoints, query optimization, multi-source data aggregation.
- **Database**: Efficient date-range queries, index strategy for summary lookups.
- **Architecture**: How a dashboard consumes multiple feature APIs without tight coupling.
- **Quality**: Empty state design, error resilience, progressive data display.
- **AI-Assisted Development**: How to specify aggregation requirements for AI agents building read-only dashboards.

## 20. Future Enhancements

- Interactive charts and graphs (weekly/monthly trends)
- Customizable card layout (drag-and-drop positioning)
- Weekly and monthly summary views
- Streak indicators for habits
- AI-generated daily insights and recommendations
- Notification badges on cards
- Quick actions from dashboard cards (mark task done, log water, etc.)
- Calendar mini-view on dashboard
- Dark mode optimizations for dashboard visuals

**When to Revisit This Feature**: After 004-daily-checkin, 005-goals, and 006-task-kanban are implemented. The dashboard will need real data integrations and possibly a dedicated summary API endpoint for performance.

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

- [ASSUMPTION: Dashboard will initially show placeholder/empty state cards since features 004-006 will be built after it. The dashboard structure should be ready to receive real data once those features exist.]
- [ASSUMPTION: Multiple API calls (one per card data source) is acceptable for MVP rather than a single aggregated endpoint.]
- [ASSUMPTION: "Today" is the user's local date, sent as a query parameter.]
- [ASSUMPTION: 002-auth is complete before dashboard work begins.]
