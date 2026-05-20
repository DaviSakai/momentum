# Tasks: Task Kanban

**Input**: Design documents from `/specs/006-task-kanban/`

**Prerequisites**: `plan.md` (required), `spec.md` (required). Features 001 and 002 must be complete.

**Tests**: OPTIONAL — manual Kanban interaction and responsive validation.

## Phase 1: Setup

- [ ] T001 Setup - Confirm 002-auth is complete and protected routes work
- [ ] T002 Setup - Create frontend/src/features/tasks/components/ directory

**Checkpoint**: Feature directory ready.

---

## Phase 2: Foundation

- [ ] T003 Database - Create database/migrations/004_create_tasks.sql with tasks table (id, user_id, title, description, status, priority, category, due_date, position, created_at, updated_at) with FK to users, indexes on (user_id, status) and (user_id, due_date)
- [ ] T004 Database - Run migration and verify tasks table is created
- [ ] T005 Backend - Implement backend/src/models/taskModel.js with create, findAllByUser (with filters), findById, update, updateStatus, delete, getSummary
- [ ] T006 Backend - Implement backend/src/services/taskService.js with status transitions, overdue detection, summary aggregation
- [ ] T007 Backend - Implement backend/src/validators/taskValidator.js with validateTask(body) and validateStatus(body)
- [ ] T008 Backend - Create backend/src/routes/taskRoutes.js with GET /, GET /summary, GET /:id, POST /, PUT /:id, PATCH /:id/status, DELETE /:id
- [ ] T009 Backend - Create backend/src/controllers/taskController.js with list, summary, getById, create, update, changeStatus, delete actions
- [ ] T010 Backend - Mount task routes in backend/src/routes/index.js under /tasks prefix with auth middleware
- [ ] T011 Frontend - Create frontend/src/services/taskApi.js with getAll(filters), getSummary(), getById(id), create(data), update(id, data), changeStatus(id, status), delete(id)

**Checkpoint**: Backend CRUD functional. API client ready.

---

## Phase 3: User Story 1 - Create Task (Priority: P1)

**Goal**: Users can create tasks that appear in the To Do column.

**Independent Test**: Fill form → submit → task appears in To Do.

- [ ] T012 [P] [US1] Frontend - Implement frontend/src/features/tasks/components/PriorityBadge.jsx with visual priority indicator (low=green, medium=yellow, high=red) using color + text label
- [ ] T013 [P] [US1] Frontend - Implement frontend/src/features/tasks/components/DueDateIndicator.jsx showing formatted date and overdue styling when past due and not done
- [ ] T014 [US1] Frontend - Implement frontend/src/features/tasks/components/TaskCard.jsx displaying title, priority badge, due date indicator, category, and action buttons (edit, delete, status change)
- [ ] T015 [US1] Frontend - Implement frontend/src/features/tasks/components/TaskForm.jsx with title, description, priority select, category input, due_date picker, and client-side validation
- [ ] T016 [US1] Frontend - Implement frontend/src/features/tasks/components/KanbanColumn.jsx with column header (name + count), scrollable task list, and empty state
- [ ] T017 [US1] Frontend - Implement frontend/src/features/tasks/components/KanbanBoard.jsx composing three KanbanColumn components (To Do, In Progress, Done) with CSS Grid/Flexbox layout
- [ ] T018 [US1] Frontend - Create frontend/app/tasks/page.js mounting KanbanBoard as protected route
- [ ] T019 [US1] Frontend - Connect TaskForm submit to taskApi.create() with success toast and board refresh
- [ ] T020 [US1] Frontend - Fetch all tasks on mount, group by status into three arrays for column rendering
- [ ] T021 [US1] Backend - Verify POST /api/tasks creates task with default status "todo" and returns 201
- [ ] T022 [US1] Backend - Verify POST /api/tasks returns 400 for missing title
- [ ] T023 [US1] UX - Validate Kanban board on desktop (1280px): three visible columns

**Checkpoint**: Task creation works. Board displays with three columns.

---

## Phase 4: User Story 2 - Move Tasks Between Columns (Priority: P1)

**Goal**: Users can move tasks between To Do, In Progress, and Done via click actions.

**Independent Test**: Create task in To Do → move to In Progress → move to Done → verify column placement.

- [ ] T024 [US2] Frontend - Add status change buttons to TaskCard: "Start" (todo→in_progress), "Complete" (in_progress→done), "Reopen" (done→in_progress/todo)
- [ ] T025 [US2] Frontend - Connect status buttons to taskApi.changeStatus(id, status) with optimistic UI update
- [ ] T026 [US2] Frontend - Move task card to new column immediately on click (optimistic), revert on API failure
- [ ] T027 [US2] Backend - Verify PATCH /api/tasks/:id/status changes status and returns 200
- [ ] T028 [US2] Backend - Verify PATCH /api/tasks/:id/status returns 403 for other user's tasks
- [ ] T029 [US2] Backend - Verify PATCH /api/tasks/:id/status returns 400 for invalid status value
- [ ] T030 [US2] UX - Verify status transitions are visually clear (card moves to new column)

**Checkpoint**: Click-based column movement works in all directions.

---

## Phase 5: User Story 3 - Edit and Delete Tasks (Priority: P1)

**Goal**: Users can edit task details and delete tasks.

- [ ] T031 [US3] Frontend - Add edit action to TaskCard that opens TaskForm modal with pre-filled values
- [ ] T032 [US3] Frontend - Connect edit submit to taskApi.update(id, data) with board refresh
- [ ] T033 [US3] Frontend - Add delete action to TaskCard with confirmation dialog
- [ ] T034 [US3] Frontend - Connect delete confirmation to taskApi.delete(id) with board refresh
- [ ] T035 [US3] Backend - Verify PUT /api/tasks/:id updates task and returns 200
- [ ] T036 [US3] Backend - Verify DELETE /api/tasks/:id deletes task with ownership check
- [ ] T037 [US3] UX - Verify confirmation dialog is keyboard-accessible and mobile-friendly

**Checkpoint**: Full CRUD complete. Edit and delete with confirmation.

---

## Phase 6: User Story 4 - Filters and Extras (Priority: P2)

**Goal**: Users can filter tasks and see overdue indicators.

- [ ] T038 [US4] Frontend - Implement frontend/src/features/tasks/components/TaskFilters.jsx with priority and category filter controls
- [ ] T039 [US4] Frontend - Connect filters to re-group displayed tasks (client-side filtering or API re-fetch)
- [ ] T040 [US4] Frontend - Apply overdue styling to DueDateIndicator for tasks with past due_date and status != done
- [ ] T041 [US4] Backend - Verify GET /api/tasks?priority=high returns only high-priority tasks
- [ ] T042 [US4] Backend - Verify overdue count is correct in GET /api/tasks/summary
- [ ] T043 [US4] UX - Verify filters work on mobile

**Checkpoint**: Filtering and overdue indicators work.

---

## Phase 7: Dashboard Integration

- [ ] T044 Integration - Verify GET /api/tasks/summary returns { todo, in_progress, done, total, overdue }
- [ ] T045 Integration - Update dashboard TaskSummaryCard to fetch and display data from summary endpoint
- [ ] T046 Integration - Verify dashboard shows task counts when tasks exist
- [ ] T047 Integration - Verify dashboard shows empty state CTA when no tasks exist
- [ ] T048 Integration - Add navigation from dashboard task card to /tasks

**Checkpoint**: Dashboard reflects task data.

---

## Phase 8: Responsive & Polish

**Purpose**: Ensure the Kanban board works across all viewports.

- [ ] T049 UX - Validate desktop layout: three columns side by side, scrollable columns
- [ ] T050 UX - Validate tablet layout: three narrower columns or horizontal scroll
- [ ] T051 UX - Validate mobile layout: horizontally scrollable columns or tab-based column switching
- [ ] T052 UX - Verify column headers with task counts are always visible
- [ ] T053 UX - Verify no horizontal page scrolling (only within the board area)
- [ ] T054 UX - Verify priority badges use color + text (not color alone)
- [ ] T055 UX - Verify TaskCards are keyboard-focusable with clear focus indicators

**Checkpoint**: Board is fully responsive and accessible.

---

## Final Phase: Validation

- [ ] T056 Integration - Test full flow: create task → move through columns → edit → delete
- [ ] T057 Backend - Review controller/service/model boundaries
- [ ] T058 Database - Review tasks schema for PostgreSQL portability
- [ ] T059 Frontend - Review component structure for maintainability
- [ ] T060 Docs - Update specs/006-task-kanban/ with implementation notes
- [ ] T061 [P] Docs - Document Kanban layout decisions in docs/decisions/006-task-kanban-layout.md
- [ ] T062 Cleanup - Remove debugging code and unused imports

**Checkpoint**: Task Kanban feature complete, responsive, accessible, and integrated. All 6 MVP features documented and ready.

---

## Dependencies & Execution Order

- **Foundation (Phase 2)**: Migration → model → service → validator → routes → controller → API client.
- **US1 Create (Phase 3)**: After Foundation. Board + column + card components.
- **US2 Move (Phase 4)**: After US1 (needs tasks to move).
- **US3 Edit/Delete (Phase 5)**: After US1. Can parallel with US2.
- **US4 Filters (Phase 6)**: After US1.
- **Dashboard (Phase 7)**: After US1.
- **Responsive (Phase 8)**: After US1-US3 (needs full board).

---

## Technical Debt & Deferred Work

- **Temporary Shortcuts**: Click-based status change instead of drag-and-drop. No position-based ordering.
- **Future Improvements**: Drag-and-drop (react-beautiful-dnd or similar), subtasks, comments, calendar integration, recurring tasks, goal linking, custom columns.
- **Dependency Review Items**: Evaluate drag-and-drop library when DnD is prioritized.
