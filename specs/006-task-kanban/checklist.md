# Kanban Checklist: Task Kanban

**Purpose**: Validate that the Kanban board works correctly, supports task workflow management, and integrates with the dashboard.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [x] CHK001 User can create a task with title, priority, category, and due date
- [x] CHK002 New tasks default to "todo" status and appear in the To Do column
- [x] CHK003 User can move tasks between To Do, In Progress, and Done via click actions
- [x] CHK004 User can edit task title, description, priority, category, due date
- [x] CHK005 User can delete tasks with confirmation
- [x] CHK006 Dashboard task summary card shows correct counts by status
- [x] CHK007 Overdue indicator appears on past-due tasks not marked done
- [x] CHK008 Empty state per column and board-level CTA for zero tasks

## Frontend Validation

- [x] CHK009 KanbanBoard renders three columns (To Do, In Progress, Done)
- [x] CHK010 Column headers show column name and task count
- [x] CHK011 TaskCard displays title, priority badge, due date, and action buttons
- [x] CHK012 TaskForm validates required fields (title) client-side
- [x] CHK013 Status change buttons use descriptive labels ("Start", "Complete", "Reopen")
- [x] CHK014 Optimistic UI update on status change (immediate visual move)
- [x] CHK015 Confirmation dialog shown before delete
- [x] CHK016 Edit mode pre-fills form with existing task data
- [x] CHK017 Tasks grouped by status client-side from a single API fetch

## Responsive UX Validation

- [x] CHK018 Desktop (1280px+): three columns side by side
- [x] CHK019 Tablet (768px): three columns visible (may be narrower)
- [x] CHK020 Mobile (375px): columns navigable via horizontal scroll or tabs
- [x] CHK021 No horizontal page-level scrolling (board-internal scroll only)
- [x] CHK022 Column scrolling works when many tasks in one column
- [x] CHK023 Touch targets on TaskCard actions are at least 44px on mobile
- [x] CHK024 Column headers remain visible while scrolling tasks

## Backend Validation

- [x] CHK025 GET /api/tasks returns all tasks for authenticated user with optional filters
- [x] CHK026 GET /api/tasks/summary returns { todo, in_progress, done, total, overdue }
- [x] CHK027 POST /api/tasks creates task with 201 response
- [x] CHK028 PUT /api/tasks/:id updates task with ownership check
- [x] CHK029 PATCH /api/tasks/:id/status changes status with validation
- [x] CHK030 DELETE /api/tasks/:id deletes with ownership check
- [x] CHK031 All endpoints require authentication (401 without token)
- [x] CHK032 User cannot access another user's tasks (403)

## Database Validation

- [x] CHK033 tasks table has FK to users(id) with ON DELETE CASCADE
- [x] CHK034 Indexes exist on (user_id, status) and (user_id, due_date)
- [x] CHK035 Required fields have NOT NULL constraints
- [x] CHK036 All types are PostgreSQL-portable
- [x] CHK037 Position field exists for future drag-and-drop ordering

## Error Handling

- [x] CHK038 Missing title returns 400 with field-level detail
- [x] CHK039 Invalid priority or status value returns 400
- [x] CHK040 Non-existent task ID returns 404
- [x] CHK041 Optimistic UI reverts on API failure

## Accessibility Basics

- [x] CHK042 Column headings use proper heading elements (h2 or h3)
- [x] CHK043 TaskCards are keyboard-focusable with visible focus indicators
- [x] CHK044 Priority badges use color + text label (not color alone)
- [x] CHK045 Status change actions are keyboard-accessible
- [x] CHK046 Confirmation dialog traps focus and is keyboard-dismissible

## Implementation Quality

- [x] CHK047 Controller/service/model responsibilities are cleanly separated
- [x] CHK048 Board component handles grouping — columns don't fetch independently
- [x] CHK049 Components are reusable (TaskCard, PriorityBadge, DueDateIndicator)
- [x] CHK050 No console.log debugging in committed code
- [x] CHK051 Click-based movement works without any drag-and-drop library dependency

## Analytics & AI Readiness *(optional)*

- [x] CHK052 Task data supports future completion time analysis (created_at, updated_at, status changes)
- [x] CHK053 Summary endpoint is reusable by future reports and analytics

## Notes

- MVP uses click-based status change — drag-and-drop is a future enhancement
- Position field is reserved but not actively used in MVP
- Categories are freeform text, not predefined
- Overdue = due_date < today AND status != done
