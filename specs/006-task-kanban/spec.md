# Feature Specification: Task Kanban

**Project**: Momentum

**Feature Branch**: `006-task-kanban`

**Created**: 2026-05-20

**Status**: Draft

**Original Input**: Allow the user to manage tasks visually through a simple Kanban workflow.

**Spec Owner**: AI-assisted development

**Initial Scope**: MVP

## 1. Feature Name

Task Kanban

## 2. Context and Goal

Tasks are the smallest actionable units in Momentum. While goals represent desired outcomes and daily check-ins capture how the user feels, tasks represent what the user needs to do. The Kanban board provides a visual workflow for managing tasks through stages — from planned to in progress to done.

**Primary Goal**: Allow users to create, organize, and track tasks through a visual Kanban board with To Do, In Progress, and Done columns.

**Related Momentum Area**: Kanban | Tasks

**Product Connection**: Task data feeds the dashboard task summary card, future reports on task completion rates, and AI-driven productivity analysis. Tasks may eventually link to goals (005) for outcome tracking.

## 3. User Problem

**Current Problem**: Users have no way to manage their to-do items within Momentum. They must use external tools for task management, losing the integration with health, goals, and productivity tracking.

**Impact if Unsolved**: Momentum cannot serve as a complete personal organization system. Users need separate apps for tasks, fragmenting their productivity data.

**Desired Outcome**: Users manage all their tasks within Momentum, see them alongside health and goal data, and track progress through a clean visual workflow.

## 4. Target User

- **Primary User**: A person who manages daily and weekly tasks across personal, professional, and academic domains.
- **Usage Profile**: Productivity + Personal organization
- **Expected Experience Level**: Beginner to intermediate.
- **Expected Frequency**: Daily — multiple times per day.
- **Usage Moment**: Morning planning, throughout the day, evening review.

## 5. User Stories

### User Story 1 - Create Task (Priority: P1)

As a user, I want to create a task with a title, priority, category, and optional due date, so that I can track what I need to do.

**Priority Rationale**: Task creation is the foundation of the entire feature.

**Independent Test**: Create a task and verify it appears in the To Do column.

**Related Requirements**: [FR-001, FR-002, FR-003, FR-004]

**Acceptance Scenarios**:

1. **Given** the Kanban board, **when** the user creates a task with a title, **then** it appears in the To Do column.
2. **Given** the task form, **when** required fields are missing, **then** validation errors are shown.
3. **Given** a new task, **when** created without a status, **then** it defaults to "todo".

---

### User Story 2 - Move Task Between Columns (Priority: P1)

As a user, I want to move tasks between To Do, In Progress, and Done columns, so that I can track my workflow progress.

**Priority Rationale**: Column movement is the core Kanban interaction — without it, the board is just a list.

**Independent Test**: Create a task in To Do, move it to In Progress, then to Done. Verify it appears in the correct column each time.

**Related Requirements**: [FR-005, FR-006]

**Acceptance Scenarios**:

1. **Given** a task in To Do, **when** the user moves it to In Progress, **then** the task appears in the In Progress column and is removed from To Do.
2. **Given** a task in In Progress, **when** the user moves it to Done, **then** the task appears in the Done column.
3. **Given** a task in Done, **when** the user moves it back to In Progress, **then** the task reappears in In Progress.

---

### User Story 3 - Edit and Delete Task (Priority: P1)

As a user, I want to edit task details or delete tasks I no longer need, so that my board stays accurate and relevant.

**Priority Rationale**: Tasks change constantly — editing and deleting are essential daily operations.

**Independent Test**: Edit a task title and verify it updates. Delete a task and verify it's removed.

**Related Requirements**: [FR-007, FR-008]

**Acceptance Scenarios**:

1. **Given** an existing task, **when** the user edits its title, priority, or due date, **then** the changes are saved and reflected on the board.
2. **Given** an existing task, **when** the user deletes it, **then** it is removed from the board after confirmation.

---

### User Story 4 - View Tasks with Filters (Priority: P2)

As a user, I want to filter tasks by priority, category, or due date, so that I can focus on what matters most right now.

**Priority Rationale**: Useful as tasks accumulate but not blocking for initial use.

**Independent Test**: Create tasks with different priorities and verify filtering shows correct results.

**Related Requirements**: [FR-009, FR-010]

**Acceptance Scenarios**:

1. **Given** multiple tasks with different priorities, **when** the user filters by high priority, **then** only high-priority tasks are visible across all columns.
2. **Given** tasks with due dates, **when** the user filters by "due today", **then** only today's tasks are shown.

## 6. Main User Flow

1. User navigates to the task board from the dashboard or navigation.
2. System displays the Kanban board with three columns: To Do, In Progress, Done.
3. User clicks "Add Task" in the To Do column header or a floating action button.
4. User fills in task title (required), priority (optional), category (optional), due date (optional), description (optional).
5. System validates and saves the task. It appears in To Do.
6. User moves the task to In Progress when they start working on it (click action or drag).
7. User moves the task to Done when completed.
8. Task counts update on the dashboard.

**Expected Successful End State**: User has an organized board with tasks distributed across status columns, reflecting their current workflow.

**Relevant Alternative Flows**:

- User creates a task directly in In Progress (already started).
- User moves a completed task back to In Progress (needs more work).
- User edits a task's priority or due date.
- User deletes a completed task to clean up the board.

## 7. Functional Requirements

- **FR-001**: The system MUST allow users to create tasks with title (required), description (optional), priority (optional: low/medium/high, default: medium), category (optional), due_date (optional YYYY-MM-DD), and status (default: todo).
- **FR-002**: The system MUST associate each task with the authenticated user.
- **FR-003**: New tasks MUST default to status "todo" unless specified otherwise.
- **FR-004**: The system MUST validate task input: title (required, 1–200 chars), priority (low/medium/high), status (todo/in_progress/done).
- **FR-005**: The system MUST allow users to change task status between todo, in_progress, and done.
- **FR-006**: The Kanban board MUST display tasks organized in three columns by status.
- **FR-007**: The system MUST allow users to edit task title, description, priority, category, and due_date.
- **FR-008**: The system MUST allow users to delete tasks with confirmation.
- **FR-009**: The system MUST support filtering tasks by priority, category, and due date.
- **FR-010**: Within each column, tasks SHOULD be sorted by priority (high first) then by created_at.
- **FR-011**: The system MUST provide a task summary for the dashboard: counts by status.

**Out of Scope for This Version**:

- Drag-and-drop task movement (use click-based status change for MVP)
- Task assignments (multi-user)
- Subtasks or checklists within tasks
- Task comments or activity log
- Calendar view integration
- Recurring tasks
- Time tracking on tasks
- Task attachments
- Linking tasks to goals
- Task notifications or reminders
- Board customization (custom columns)

## 8. Non-Functional Requirements

- **NFR-001**: The Kanban board MUST work on mobile, tablet, and desktop.
- **NFR-002**: Task operations MUST respond within 1 second.
- **NFR-003**: The board MUST show loading, empty, and error states per column.
- **NFR-004**: Task data MUST only be accessible by the owning user.
- **NFR-005**: Column scrolling MUST work when many tasks exist in one column.
- **NFR-006**: On mobile, columns MUST be navigable (horizontal scroll, tabs, or stacked layout).
- **NFR-007**: Priority levels MUST be visually distinct (color + label, not color alone).

## 9. Acceptance Criteria

- **AC-001**: Given the Kanban board, when the user creates a task, then it appears in the To Do column.
- **AC-002**: Given a task in To Do, when the user changes status to in_progress, then it moves to the In Progress column.
- **AC-003**: Given tasks in all columns, when the dashboard loads, then the task summary card shows correct counts.
- **AC-004**: Given no tasks, when the board loads, then empty state columns with CTAs are shown.
- **AC-005**: Given a mobile viewport, when the board loads, then all columns are accessible without layout issues.
- **AC-006**: Given a task with a due date, when the date has passed, then the task shows a visual overdue indicator.

## 10. Data and Initial Model

### Core Entities

- **Task**: Represents an actionable item on the Kanban board.
  - **Initial Attributes**: id (INTEGER PRIMARY KEY), user_id (INTEGER, FK → users.id), title (TEXT, required), description (TEXT, optional), status (TEXT, default: todo), priority (TEXT, default: medium), category (TEXT, optional), due_date (TEXT, optional YYYY-MM-DD), position (INTEGER, optional — for ordering within column), created_at (TEXT, ISO 8601), updated_at (TEXT, ISO 8601).
  - **Relationships**: Belongs to User (user_id FK).
  - **Ownership**: Each task belongs to the authenticated user.

### Minimum MVP Data

- title (required)
- status (required, default: todo)
- priority (default: medium)
- user_id (from auth)

### Derived or Calculated Data

- Task count by status (for dashboard)
- Tasks due today count
- Overdue task count
- Task completion rate

## 11. Business Rules

- **BR-001**: Users can only view, create, edit, and delete tasks they own.
- **BR-002**: Valid status values: todo, in_progress, done.
- **BR-003**: Valid priority values: low, medium, high.
- **BR-004**: Status transitions are unrestricted — any status can move to any other status.
- **BR-005**: Deleting a task is permanent (no soft delete for MVP).
- **BR-006**: Tasks in the Done column remain visible until deleted or filtered out.
- **BR-007**: A task with a due_date in the past and status not "done" is considered overdue.

**Related Technical Decisions**:

- **TD-001**: Use click-based status change (button/dropdown) instead of drag-and-drop for MVP. Drag-and-drop adds complexity and library dependencies. [ASSUMPTION: Click-based movement is acceptable for MVP.]
- **TD-002**: Store position as INTEGER for future drag-and-drop ordering within columns. Default to created_at order for MVP.
- **TD-003**: Categories are freeform TEXT, not predefined like goals. Users can enter any category.

## 12. Interface States

- **Initial State**: Kanban board with three columns. Tasks in their respective columns.
- **Empty State**: Each empty column shows "No tasks here" with a contextual message. Overall empty state: "Create your first task to get started."
- **Loading State**: Column skeletons during initial load. Button spinner during task operations.
- **Success State**: Task appears/moves/updates immediately. Toast on create/delete.
- **Error State**: Column-level error with retry. Inline validation on task form.
- **Editing State**: Modal or inline expansion with pre-filled task data.
- **Deletion State**: Confirmation dialog before permanent delete.
- **Responsive/Mobile State**: Columns displayed as horizontal scrollable sections, tabs, or vertically stacked with collapsible sections.

## 13. Required Integrations

- **Frontend**: `/tasks` route (protected). Kanban board with three columns. Task form.
- **Backend**: CRUD endpoints under `/api/tasks`. Summary endpoint for dashboard.
- **Database**: `tasks` table with user_id FK.
- **Authentication**: All endpoints require auth. All queries filtered by user_id.
- **Dashboard/Reports**: Dashboard task summary card consumes `GET /api/tasks/summary`.
- **External Services**: None.
- **Future AI**: Task completion patterns, priority distributions, overdue rates feed AI productivity analysis. Future calendar integration for due date visualization.

## 14. Frontend Impact

- **Pages/Screens**: `/tasks` — Kanban board page.
- **Components**: KanbanBoard, KanbanColumn, TaskCard, TaskForm (create/edit), TaskFilters, PriorityBadge, DueDateIndicator.
- **Local/Global State**: Tasks fetched on mount, grouped by status client-side. Filter state managed locally. Optimistic status updates.
- **API Calls**: GET /api/tasks (all tasks), POST /api/tasks (create), PUT /api/tasks/:id (update), PATCH /api/tasks/:id/status (move), DELETE /api/tasks/:id, GET /api/tasks/summary (dashboard).
- **UI Validation**: Title required. Priority from select. Due date format.
- **Accessibility**: Column headings with task counts. Task cards are focusable. Status change announced. Priority badges have text labels. Confirmation dialog keyboard-accessible.
- **Responsiveness**: Three-column horizontal layout on desktop. Horizontal scroll or tab navigation on mobile. Column headers sticky on desktop.
- **UX Risks**: Three columns side-by-side may be cramped on mobile. Tab-based or stacked layout may be needed.

## 15. Backend Impact

- **Expected Endpoints**:
  - `GET /api/tasks` — All tasks for user with optional filters (?priority=high&category=work&status=todo).
  - `GET /api/tasks/summary` — Returns { todo, in_progress, done, total, overdue } for dashboard.
  - `GET /api/tasks/:id` — Single task detail.
  - `POST /api/tasks` — Create task. Payload: { title, description, priority, category, due_date, status }.
  - `PUT /api/tasks/:id` — Full update.
  - `PATCH /api/tasks/:id/status` — Status change only. Payload: { status }.
  - `DELETE /api/tasks/:id` — Delete with ownership check.
- **Server Validation**: title (1–200), priority (low/medium/high), status (todo/in_progress/done), due_date (YYYY-MM-DD or null), description (max 2000 chars).
- **Services/Controllers**: taskController.js, taskService.js (status change, summary, overdue detection), taskModel.js (SQL queries).
- **Authentication/Authorization**: All endpoints require auth. Ownership check on update/delete.
- **API Errors**: 400 validation, 401 unauthenticated, 403 not owner, 404 not found, 500 unexpected.
- **Future Reuse**: taskService queries reusable by calendar, reports, analytics.

## 16. Database Impact

- **New Tables**: `tasks`
- **Main Fields**:
  - `id` INTEGER PRIMARY KEY
  - `user_id` INTEGER NOT NULL — FK → users(id)
  - `title` TEXT NOT NULL
  - `description` TEXT
  - `status` TEXT NOT NULL DEFAULT 'todo' — todo/in_progress/done
  - `priority` TEXT NOT NULL DEFAULT 'medium' — low/medium/high
  - `category` TEXT
  - `due_date` TEXT — YYYY-MM-DD
  - `position` INTEGER — for future ordering within column
  - `created_at` TEXT NOT NULL
  - `updated_at` TEXT NOT NULL
- **Relationships**: FK user_id → users(id) ON DELETE CASCADE.
- **Important Indexes**: INDEX(user_id, status) for column queries. INDEX(user_id, due_date) for due date filtering.
- **Data Integrity**: NOT NULL on required fields. FK constraint.
- **Future Migration Notes**: TEXT enums → PostgreSQL ENUM. All types portable. Position field ready for drag-and-drop ordering.

## 17. Errors, Validation, and Edge Cases

- **Input Validation**: title (1–200 chars, trimmed), priority (low/medium/high), status (todo/in_progress/done), due_date (YYYY-MM-DD or null), description (max 2000 chars).
- **Permission Error**: User cannot access/modify another user's tasks.
- **Not Found Error**: Task ID not found → 404.
- **Edge Cases**: Many tasks in one column (scroll performance), overdue tasks with no visual indication, task with very long title (truncation), past due dates on done tasks (not overdue), timezone for "today" comparison.
- **User-Facing Messages**: "Task created!" "Task moved to In Progress." "Are you sure you want to delete this task?"

## 18. Metrics, Analytics, and Observability

### Product Metrics Generated by This Feature

- Task completion rate (done / total per period).
- Average time from creation to done.
- Tasks created per day/week.
- Priority distribution.
- Overdue task rate.
- Most common task categories.

### Technical Metrics or Observability Signals

- Task CRUD operation counts.
- Status change frequency.
- API response times.

### Future AI Potential

- Productivity pattern analysis (when do users complete most tasks?).
- Priority recommendation (suggest priority based on category and past behavior).
- Workload balancing suggestions.
- Task duration estimation based on historical completion times.
- Correlation between task completion and daily check-in productivity scores.

## 19. Technical Learning Points

- **Frontend**: Kanban board layout, column-based UI, click-based workflow transitions, responsive multi-column strategies, overdue date detection.
- **Backend**: Status-based filtering, summary aggregation, date comparison for overdue detection.
- **Database**: Multi-column index strategy, status-based grouping queries, position field for future ordering.
- **Architecture**: How a visual workflow feature integrates with a data-centric dashboard.
- **Quality**: Mobile-friendly multi-column layouts, status transition UX.

## 20. Future Enhancements

- Drag-and-drop task movement
- Subtasks and checklists within tasks
- Task comments and activity history
- Calendar view integration (tasks on calendar by due date)
- Recurring tasks
- Time tracking on tasks
- Link tasks to goals (005)
- Task templates
- Bulk operations (move/delete multiple)
- Task notifications and reminders
- Custom columns/statuses
- Task search
- Task archiving

**When to Revisit This Feature**: After calendar feature is designed (due date integration), after analytics are designed (task completion patterns), and when drag-and-drop UX is prioritized.

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

- [ASSUMPTION: Click-based status change (not drag-and-drop) is acceptable for MVP.]
- [ASSUMPTION: Three columns (To Do, In Progress, Done) are sufficient — no custom columns for MVP.]
- [ASSUMPTION: Categories are freeform text, not predefined enums.]
- [ASSUMPTION: Position field is reserved for future ordering but not actively used in MVP.]
- [ASSUMPTION: 002-auth is complete before task kanban work begins.]
