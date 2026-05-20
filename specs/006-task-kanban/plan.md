# Implementation Plan: Task Kanban

**Branch**: `006-task-kanban` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-task-kanban/spec.md`

## Summary

**Primary Requirement**: Allow users to manage tasks through a visual Kanban board with To Do, In Progress, and Done columns.

**User Value**: Tasks complete the personal organization picture — users track health (check-in), direction (goals), and action items (tasks) in one system. The Kanban board provides visual workflow management.

**Affected Momentum Module**: Kanban | Tasks

**Implementation Strategy**: Build a three-column Kanban board at `/tasks`. Tasks use click-based status changes (no drag-and-drop for MVP). The backend provides CRUD endpoints plus a summary endpoint for the dashboard. Tasks are grouped by status client-side after a single API fetch. Priority badges and overdue indicators provide at-a-glance status.

## Technical Context

**Language/Version**: JavaScript / Node.js 20+

**Frontend**: Next.js + React, CSS Grid/Flexbox for column layout, click-based status transitions

**Backend**: Node.js + Express, CRUD + status change + summary endpoints

**Storage**: SQLite — `tasks` table with user_id FK

**API Style**: REST — CRUD under `/api/tasks`

**Testing**: Manual Kanban interaction and responsive validation

**Target Platform**: Responsive web — board must work on mobile and desktop

**Performance Goals**: Board loads within 1 second. Status changes under 500ms.

**Constraints**: API-first, user ownership, click-based movement (no DnD library), minimal dependencies

**Scale/Scope**: Authenticated single-user MVP

**Future Compatibility**: Drag-and-drop, calendar integration, goal linking, recurring tasks

## Constitution Check

- **Clean Code and Boundaries**: taskService handles status logic, overdue detection. taskController handles HTTP. taskModel handles SQL.
- **Next.js + React Alignment**: Tasks page uses App Router at `/tasks`.
- **Decoupled API-First Design**: Frontend calls REST endpoints via taskApi service.
- **Modular Backend Services**: Task logic in taskService, reusable by dashboard, calendar, reports.
- **Responsive-First UX**: Columns adapt to viewport — horizontal on desktop, scrollable/stacked on mobile.
- **Required UI States**: Loading (column skeletons), empty (per-column message), error (retry), populated (cards in columns).
- **Minimal Dependencies**: No new dependencies. No drag-and-drop library for MVP.
- **MVP Discipline**: Click-based status change only. No subtasks, comments, recurring, or drag-and-drop.
- **Constitution Result**: PASS

## Feature Implementation Scope

**MVP Included**:

- Kanban board with three columns (To Do, In Progress, Done)
- Task CRUD (create, read, update, delete)
- Click-based status transitions between columns
- Priority levels (low, medium, high) with visual badges
- Due date with overdue indicator
- Optional category and description
- Filtering by priority, category
- Dashboard task summary integration
- Responsive board layout
- Empty states, loading, error handling

**Explicitly Excluded**:

- Drag-and-drop movement
- Subtasks, checklists
- Comments, activity log
- Calendar view
- Recurring tasks
- Time tracking
- Goal linking
- Custom columns
- Task search

**Dependencies With Other Features**:

- Depends on: 001-project-foundation, 002-auth
- Feeds: 003-dashboard (task summary card)

## Architecture Decisions

**Frontend Route Structure**: `/tasks` — Kanban board page (protected).

**Frontend Component Boundaries**:
- `app/tasks/page.js` — Tasks page
- `src/features/tasks/components/KanbanBoard.jsx` — Three-column layout
- `src/features/tasks/components/KanbanColumn.jsx` — Single column with header and task list
- `src/features/tasks/components/TaskCard.jsx` — Individual task with actions
- `src/features/tasks/components/TaskForm.jsx` — Create/edit form (modal)
- `src/features/tasks/components/TaskFilters.jsx` — Priority/category filters
- `src/features/tasks/components/PriorityBadge.jsx` — Visual priority indicator
- `src/features/tasks/components/DueDateIndicator.jsx` — Due date with overdue styling
- `src/services/taskApi.js` — API client

**Backend Structure**:
- `src/routes/taskRoutes.js`
- `src/controllers/taskController.js` — list, summary, getById, create, update, changeStatus, delete
- `src/services/taskService.js` — status transitions, overdue detection, summary aggregation
- `src/models/taskModel.js` — SQL queries
- `src/validators/taskValidator.js` — input validation

**Database Entities**: `tasks` table with INDEX(user_id, status) and INDEX(user_id, due_date)

## Project Structure

```text
frontend/
|-- app/
|   `-- tasks/
|       `-- page.js
|-- src/
|   |-- features/
|   |   `-- tasks/
|   |       `-- components/
|   |           |-- KanbanBoard.jsx
|   |           |-- KanbanColumn.jsx
|   |           |-- TaskCard.jsx
|   |           |-- TaskForm.jsx
|   |           |-- TaskFilters.jsx
|   |           |-- PriorityBadge.jsx
|   |           `-- DueDateIndicator.jsx
|   `-- services/
|       `-- taskApi.js

backend/
|-- src/
|   |-- controllers/
|   |   `-- taskController.js
|   |-- services/
|   |   `-- taskService.js
|   |-- routes/
|   |   `-- taskRoutes.js
|   |-- models/
|   |   `-- taskModel.js
|   `-- validators/
|       `-- taskValidator.js

database/
`-- migrations/
    `-- 004_create_tasks.sql
```

## Frontend Plan

**Affected Routes**: `/tasks` — protected Kanban board page.

**Components**: KanbanBoard wraps three KanbanColumn components. Each column renders TaskCard components. TaskForm as modal for create/edit. TaskFilters above the board.

**State Management**: Fetch all tasks once, group by status client-side into three arrays. Optimistic updates on status change. Re-fetch after create/delete.

**Forms and Validation**: Title required. Priority from select. Due date optional date picker. Category optional text input.

**UI States**:
- **Loading**: Column skeleton placeholders
- **Empty**: Per-column "No tasks" message. Board-level "Create your first task" CTA if zero tasks
- **Error**: Board-level error with retry
- **Success**: Task appears/moves immediately. Toast on create/delete

**Responsive Behavior**: Desktop: three-column horizontal layout with CSS Grid/Flexbox. Tablet: three narrower columns or horizontal scroll. Mobile: horizontally scrollable columns or tab-based column switching. Column headers with task counts always visible.

**Accessibility**: Column headings (`h2`) with task counts. TaskCards are focusable (`tabindex`). Status change buttons have descriptive labels ("Move to In Progress"). Priority and overdue indicators use text + color.

## Backend Plan

**Endpoints**:
- `GET /api/tasks?priority=high&category=work` — All tasks with optional filters
- `GET /api/tasks/summary` — { todo, in_progress, done, total, overdue }
- `GET /api/tasks/:id` — Single task
- `POST /api/tasks` — Create. Body: { title, description, priority, category, due_date, status }
- `PUT /api/tasks/:id` — Full update
- `PATCH /api/tasks/:id/status` — Status only. Body: { status }
- `DELETE /api/tasks/:id` — Delete with ownership check

**Validation**: title (1–200), priority (low/medium/high), status (todo/in_progress/done), due_date (YYYY-MM-DD or null), description (max 2000).

**Error Handling**: 400 validation, 401 unauth, 403 not owner, 404 not found, 500 unexpected.

## Database Plan

**Tables**: `tasks`

**Fields**: id, user_id, title, description, status, priority, category, due_date, position, created_at, updated_at.

**Indexes**: INDEX(user_id, status), INDEX(user_id, due_date).

**Relationships**: FK user_id → users(id) ON DELETE CASCADE.

**SQLite → PostgreSQL**: All types portable. Position field for future drag-and-drop ordering.

## API Contract Plan

**Request — Create Task**:
```json
{
  "title": "Review authentication flow",
  "description": "Check JWT token handling and expiry",
  "priority": "high",
  "category": "development",
  "due_date": "2026-05-25"
}
```

**Response — Task (201/200)**:
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Review authentication flow",
  "description": "Check JWT token handling and expiry",
  "status": "todo",
  "priority": "high",
  "category": "development",
  "due_date": "2026-05-25",
  "position": null,
  "created_at": "2026-05-20T14:00:00.000Z",
  "updated_at": "2026-05-20T14:00:00.000Z"
}
```

**Request — Change Status**:
```json
{ "status": "in_progress" }
```

**Summary Response**:
```json
{
  "todo": 3,
  "in_progress": 2,
  "done": 5,
  "total": 10,
  "overdue": 1
}
```

## Testing Strategy

**Manual Testing Checklist**:
- [ ] Create task → appears in To Do column
- [ ] Move task To Do → In Progress → Done via click actions
- [ ] Move task Done → In Progress (backward movement)
- [ ] Edit task title, priority, due date → changes saved
- [ ] Delete task with confirmation → removed from board
- [ ] Filter by priority → correct tasks shown
- [ ] Empty board shows "Create your first task" CTA
- [ ] Dashboard task summary reflects correct counts
- [ ] Overdue indicator appears on past-due tasks not done
- [ ] Mobile: columns navigable (scroll/tabs/stack)
- [ ] Desktop: three-column layout without overlap

## Learning Goals

**Concepts Practiced**: Kanban UI pattern, column-based layout, status state management, client-side grouping, optimistic updates, overdue date logic, responsive multi-column strategies.

## Implementation Phases

**Phase 1**: Setup — directories, API client.
**Phase 2**: Database — migration, model.
**Phase 3**: Backend — service, validator, controller, routes.
**Phase 4**: Frontend — board layout, columns, task cards, form.
**Phase 5**: Status transitions — click-based movement.
**Phase 6**: Filters and extras — priority/category filter, overdue indicator.
**Phase 7**: Dashboard integration — summary card.
**Phase 8**: Polish — responsive, accessibility, mobile UX.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| Click-based instead of drag-and-drop | Avoids DnD library dependency | Drag-and-drop adds complexity + accessibility challenges | Add DnD after MVP if user feedback requests it |
