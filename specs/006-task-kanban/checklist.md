# Kanban Checklist: Task Kanban

**Purpose**: Validate that the Kanban board works correctly, supports task workflow management, and integrates with the dashboard.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [ ] CHK001 User can create a task with title, priority, category, and due date
- [ ] CHK002 New tasks default to "todo" status and appear in the To Do column
- [ ] CHK003 User can move tasks between To Do, In Progress, and Done via click actions
- [ ] CHK004 User can edit task title, description, priority, category, due date
- [ ] CHK005 User can delete tasks with confirmation
- [ ] CHK006 Dashboard task summary card shows correct counts by status
- [ ] CHK007 Overdue indicator appears on past-due tasks not marked done
- [ ] CHK008 Empty state per column and board-level CTA for zero tasks

## Frontend Validation

- [ ] CHK009 KanbanBoard renders three columns (To Do, In Progress, Done)
- [ ] CHK010 Column headers show column name and task count
- [ ] CHK011 TaskCard displays title, priority badge, due date, and action buttons
- [ ] CHK012 TaskForm validates required fields (title) client-side
- [ ] CHK013 Status change buttons use descriptive labels ("Start", "Complete", "Reopen")
- [ ] CHK014 Optimistic UI update on status change (immediate visual move)
- [ ] CHK015 Confirmation dialog shown before delete
- [ ] CHK016 Edit mode pre-fills form with existing task data
- [ ] CHK017 Tasks grouped by status client-side from a single API fetch

## Responsive UX Validation

- [ ] CHK018 Desktop (1280px+): three columns side by side
- [ ] CHK019 Tablet (768px): three columns visible (may be narrower)
- [ ] CHK020 Mobile (375px): columns navigable via horizontal scroll or tabs
- [ ] CHK021 No horizontal page-level scrolling (board-internal scroll only)
- [ ] CHK022 Column scrolling works when many tasks in one column
- [ ] CHK023 Touch targets on TaskCard actions are at least 44px on mobile
- [ ] CHK024 Column headers remain visible while scrolling tasks

## Backend Validation

- [ ] CHK025 GET /api/tasks returns all tasks for authenticated user with optional filters
- [ ] CHK026 GET /api/tasks/summary returns { todo, in_progress, done, total, overdue }
- [ ] CHK027 POST /api/tasks creates task with 201 response
- [ ] CHK028 PUT /api/tasks/:id updates task with ownership check
- [ ] CHK029 PATCH /api/tasks/:id/status changes status with validation
- [ ] CHK030 DELETE /api/tasks/:id deletes with ownership check
- [ ] CHK031 All endpoints require authentication (401 without token)
- [ ] CHK032 User cannot access another user's tasks (403)

## Database Validation

- [ ] CHK033 tasks table has FK to users(id) with ON DELETE CASCADE
- [ ] CHK034 Indexes exist on (user_id, status) and (user_id, due_date)
- [ ] CHK035 Required fields have NOT NULL constraints
- [ ] CHK036 All types are PostgreSQL-portable
- [ ] CHK037 Position field exists for future drag-and-drop ordering

## Error Handling

- [ ] CHK038 Missing title returns 400 with field-level detail
- [ ] CHK039 Invalid priority or status value returns 400
- [ ] CHK040 Non-existent task ID returns 404
- [ ] CHK041 Optimistic UI reverts on API failure

## Accessibility Basics

- [ ] CHK042 Column headings use proper heading elements (h2 or h3)
- [ ] CHK043 TaskCards are keyboard-focusable with visible focus indicators
- [ ] CHK044 Priority badges use color + text label (not color alone)
- [ ] CHK045 Status change actions are keyboard-accessible
- [ ] CHK046 Confirmation dialog traps focus and is keyboard-dismissible

## Implementation Quality

- [ ] CHK047 Controller/service/model responsibilities are cleanly separated
- [ ] CHK048 Board component handles grouping — columns don't fetch independently
- [ ] CHK049 Components are reusable (TaskCard, PriorityBadge, DueDateIndicator)
- [ ] CHK050 No console.log debugging in committed code
- [ ] CHK051 Click-based movement works without any drag-and-drop library dependency

## Analytics & AI Readiness *(optional)*

- [ ] CHK052 Task data supports future completion time analysis (created_at, updated_at, status changes)
- [ ] CHK053 Summary endpoint is reusable by future reports and analytics

## Notes

- MVP uses click-based status change — drag-and-drop is a future enhancement
- Position field is reserved but not actively used in MVP
- Categories are freeform text, not predefined
- Overdue = due_date < today AND status != done
