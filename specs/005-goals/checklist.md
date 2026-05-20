# Goals Checklist: Goals

**Purpose**: Validate that the goals feature supports complete CRUD, progress tracking, filtering, and dashboard integration.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [ ] CHK001 User can create a goal with title, category, and period
- [ ] CHK002 User can update goal progress (0–100%)
- [ ] CHK003 User can change goal status (active, completed, paused)
- [ ] CHK004 User can edit goal title, description, category, period
- [ ] CHK005 User can delete a goal with confirmation
- [ ] CHK006 User can filter goals by status, category, and period
- [ ] CHK007 Dashboard goal summary card reflects active goals and progress
- [ ] CHK008 Empty state with CTA shown when no goals exist

## Frontend Validation

- [ ] CHK009 GoalForm validates required fields (title, category, period) client-side
- [ ] CHK010 GoalProgressBar visually reflects current progress with aria attributes
- [ ] CHK011 GoalStatusBadge distinguishes active/completed/paused with color AND text
- [ ] CHK012 Loading skeletons display during list fetch
- [ ] CHK013 Success toast shown after create/update/delete
- [ ] CHK014 Confirmation dialog shown before delete
- [ ] CHK015 Edit mode pre-fills form with existing goal data
- [ ] CHK016 Filter results update immediately on filter change

## Responsive UX Validation

- [ ] CHK017 Goal cards stack vertically on mobile (375px)
- [ ] CHK018 Multi-column grid on tablet (768px) and desktop (1280px)
- [ ] CHK019 Filter controls accessible on mobile (collapsible or simplified)
- [ ] CHK020 No horizontal scrolling at any breakpoint
- [ ] CHK021 Touch targets on cards and buttons are at least 44px on mobile

## Backend Validation

- [ ] CHK022 GET /api/goals returns filtered list for authenticated user
- [ ] CHK023 GET /api/goals/summary returns { active, completed, total, avg_progress }
- [ ] CHK024 POST /api/goals creates goal with 201 response
- [ ] CHK025 PUT /api/goals/:id updates goal with ownership check
- [ ] CHK026 PATCH /api/goals/:id/progress updates progress only
- [ ] CHK027 DELETE /api/goals/:id deletes with ownership check
- [ ] CHK028 All endpoints require authentication (401 without token)
- [ ] CHK029 User cannot access another user's goals (403)

## Database Validation

- [ ] CHK030 goals table has FK to users(id) with ON DELETE CASCADE
- [ ] CHK031 Indexes exist on (user_id, status) and (user_id, category)
- [ ] CHK032 Required fields have NOT NULL constraints
- [ ] CHK033 All types are PostgreSQL-portable

## Error Handling

- [ ] CHK034 Missing required fields return 400 with details
- [ ] CHK035 Invalid category or period returns 400
- [ ] CHK036 Progress outside 0–100 returns 400
- [ ] CHK037 Non-existent goal ID returns 404

## Implementation Quality

- [ ] CHK038 Controller/service/model responsibilities are cleanly separated
- [ ] CHK039 Category and period enums validated consistently on frontend and backend
- [ ] CHK040 Goal components are reusable (GoalCard, GoalProgressBar, GoalStatusBadge)
- [ ] CHK041 No console.log debugging in committed code

## Analytics & AI Readiness *(optional)*

- [ ] CHK042 Goal data structure supports future trend queries (category, period, progress over time)
- [ ] CHK043 Summary endpoint is reusable by future reports

## Notes

- Progress is manually entered by the user for MVP — automated tracking is a future enhancement
- Categories are predefined strings, not a separate table
- Dashboard integration (CHK007) requires 003-dashboard to be partially complete
