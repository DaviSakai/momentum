# Tasks: Main Dashboard

**Input**: Design documents from `/specs/003-dashboard/`

**Prerequisites**: `plan.md` (required), `spec.md` (required). Features 001-project-foundation and 002-auth must be complete.

**Tests**: OPTIONAL — manual responsive validation is the primary method.

**Organization**: Tasks grouped by phase and user story.

## Phase 1: Setup

- [ ] T001 Setup - Confirm 002-auth is complete: login, register, logout, protected routes work
- [ ] T002 Setup - Confirm feature documents exist under specs/003-dashboard/
- [ ] T003 Setup - Create frontend/src/features/dashboard/components/ directory

**Checkpoint**: Dashboard feature directory ready. Auth confirmed working.

---

## Phase 2: Foundation

**Purpose**: Build shared dashboard infrastructure — layout, API client, backend route.

- [ ] T004 Backend - Create backend/src/routes/dashboardRoutes.js with GET /summary route
- [ ] T005 Backend - Create backend/src/controllers/dashboardController.js with getSummary action returning default/null data for all sections
- [ ] T006 Backend - Mount dashboard routes in backend/src/routes/index.js under /dashboard prefix with auth middleware
- [ ] T007 Frontend - Create frontend/src/services/dashboardApi.js with getSummary(date) function
- [ ] T008 [P] Frontend - Create frontend/src/features/dashboard/components/CardSkeleton.jsx with animated loading placeholder
- [ ] T009 [P] Frontend - Create frontend/src/features/dashboard/components/EmptyStateCard.jsx with icon, message, and CTA button props

**Checkpoint**: Backend endpoint returns default data. Frontend has API client and reusable card primitives.

---

## Phase 3: User Story 1 - Daily Status Overview (Priority: P1)

**Goal**: Authenticated user sees a card-based dashboard with today's status summary.

**Independent Test**: Log in → see dashboard with greeting, health card, task card, goal card, productivity card (all empty states initially).

**Learning Checkpoint**: CSS Grid responsive layout, component composition, card architecture.

### Frontend for User Story 1

- [ ] T010 [US1] Frontend - Create frontend/app/dashboard/page.js as protected dashboard route
- [ ] T011 [US1] Frontend - Implement frontend/src/features/dashboard/components/DashboardLayout.jsx with CSS Grid responsive layout (1col mobile → 2col tablet → auto-fit desktop)
- [ ] T012 [US1] Frontend - Implement frontend/src/features/dashboard/components/GreetingHeader.jsx displaying user name and formatted current date
- [ ] T013 [P] [US1] Frontend - Implement frontend/src/features/dashboard/components/HealthSummaryCard.jsx showing check-in data or empty state
- [ ] T014 [P] [US1] Frontend - Implement frontend/src/features/dashboard/components/TaskSummaryCard.jsx showing task counts by status or empty state
- [ ] T015 [P] [US1] Frontend - Implement frontend/src/features/dashboard/components/GoalSummaryCard.jsx showing active goals progress or empty state
- [ ] T016 [P] [US1] Frontend - Implement frontend/src/features/dashboard/components/ProductivityCard.jsx showing daily score or empty state
- [ ] T017 [US1] Frontend - Connect dashboard page to dashboardApi.getSummary() with loading states per card
- [ ] T018 [US1] Frontend - Add card-level error handling with retry button for failed API calls
- [ ] T019 [US1] Frontend - Update auth flow to redirect to /dashboard after successful login (instead of /)
- [ ] T020 [US1] Integration - Verify dashboard loads with greeting and all empty state cards after login

**Checkpoint**: Dashboard page works with greeting and cards. All cards show empty states with loading/error handling.

---

## Phase 4: User Story 2 - Empty State Experience (Priority: P1)

**Goal**: New users see helpful empty states with CTAs guiding them to first actions.

**Independent Test**: Register new account → see empty state cards with clear CTAs.

**Learning Checkpoint**: Empty state UX design, CTA navigation patterns.

- [ ] T021 [US2] Frontend - Add CTA buttons to HealthSummaryCard empty state: "Start your daily check-in" → links to /checkin
- [ ] T022 [US2] Frontend - Add CTA buttons to TaskSummaryCard empty state: "Create your first task" → links to /tasks
- [ ] T023 [US2] Frontend - Add CTA buttons to GoalSummaryCard empty state: "Set your first goal" → links to /goals
- [ ] T024 [US2] Frontend - Add CTA to ProductivityCard empty state: "Complete a check-in to see your score" → links to /checkin
- [ ] T025 [US2] Frontend - Verify CTA links navigate to correct routes (pages may not exist yet — verify URL changes)
- [ ] T026 [US2] UX - Review empty state messages for encouraging, actionable tone (not clinical "No data found")

**Checkpoint**: Empty states guide new users toward first actions. CTAs link to correct feature routes.

---

## Phase 5: User Story 3 - Responsive Layout (Priority: P1)

**Goal**: Dashboard works beautifully on mobile, tablet, and desktop.

**Independent Test**: View dashboard at 375px, 768px, and 1280px — all cards visible, no overlap, no scrolling.

**Learning Checkpoint**: CSS Grid breakpoints, responsive card sizing, touch target sizing.

- [ ] T027 [US3] Frontend - Verify CSS Grid layout: 1 column at 375px mobile
- [ ] T028 [US3] Frontend - Verify CSS Grid layout: 2 columns at 768px tablet
- [ ] T029 [US3] Frontend - Verify CSS Grid layout: auto-fit multi-column at 1280px+ desktop
- [ ] T030 [US3] Frontend - Verify no horizontal scrolling at any breakpoint
- [ ] T031 [US3] Frontend - Verify card minimum height and consistent spacing across breakpoints
- [ ] T032 [US3] Frontend - Verify greeting header scales appropriately (font size, spacing)
- [ ] T033 [US3] Frontend - Verify CTA buttons have adequate touch targets (44px+) on mobile
- [ ] T034 [US3] UX - Verify text readability on mobile without zooming

**Checkpoint**: Dashboard is fully responsive and usable across all viewports.

---

## Final Phase: Polish & Validation

- [ ] T035 Integration - Verify dashboard requires authentication (unauthenticated → redirect to /login)
- [ ] T036 Integration - Verify dashboard shows correct user name in greeting
- [ ] T037 Backend - Verify GET /api/dashboard/summary requires auth and returns 401 without token
- [ ] T038 Backend - Verify summary endpoint returns proper response shape with null/default data
- [ ] T039 UX - Review visual consistency: card spacing, typography, color hierarchy
- [ ] T040 UX - Verify dark mode foundation if CSS variables are set up
- [ ] T041 UX - Review accessibility: semantic HTML, aria labels on cards, heading hierarchy
- [ ] T042 Frontend - Review component composition for maintainability and clean separation
- [ ] T043 Docs - Update specs/003-dashboard/ with final implementation notes
- [ ] T044 [P] Docs - Document dashboard layout decisions in docs/decisions/003-dashboard-layout.md
- [ ] T045 Cleanup - Remove console.log debugging and unused imports

**Checkpoint**: Dashboard is polished, responsive, accessible, and documented. Ready for data integration with 004-006.

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Depends on 002-auth.
- **Foundation (Phase 2)**: Depends on Setup.
- **US1 Overview (Phase 3)**: Depends on Foundation. Card components (T013-T016) are parallel.
- **US2 Empty States (Phase 4)**: Depends on US1 cards existing.
- **US3 Responsive (Phase 5)**: Depends on US1 layout existing.
- **Final Phase**: Depends on all stories.

---

## Technical Debt & Deferred Work

- **Temporary Shortcuts**: Dashboard shows empty states only — real data integration deferred to 004-006 implementation.
- **Known Limitations**: No charts, no weekly/monthly views, no customization.
- **Future Improvements**: Chart library integration, AI insight cards, drag-and-drop layout, calendar mini-view.

---

## Notes

- Dashboard is read-only — no CRUD operations.
- Each card must handle its own data lifecycle independently.
- Empty states are a first-class UX concern, not an afterthought.
- CSS Grid is preferred over Flexbox for the dashboard layout due to two-dimensional control.
- Dashboard will evolve significantly as data features are added.
