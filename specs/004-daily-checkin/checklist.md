# Check-in Checklist: Daily Check-in

**Purpose**: Validate that the daily check-in feature works correctly, handles edge cases, and integrates with the dashboard.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [ ] CHK001 User can create a daily check-in with all metric fields
- [ ] CHK002 User can edit an existing check-in for today
- [ ] CHK003 Only one check-in per user per date is enforced
- [ ] CHK004 Form pre-fills with existing data when check-in exists for today
- [ ] CHK005 User can view past check-ins in reverse chronological order
- [ ] CHK006 Dashboard health summary card reflects today's check-in data
- [ ] CHK007 Success feedback is shown after save/update

## Frontend Validation

- [ ] CHK008 Form groups metrics into logical sections (wellness, activity, productivity)
- [ ] CHK009 Required fields (mood, energy, focus, productivity_score) show validation errors when empty
- [ ] CHK010 Range validation works client-side (mood 1-5, productivity 1-10, sleep 0-24)
- [ ] CHK011 Loading state shown during form submission
- [ ] CHK012 Error state shows inline field-level messages
- [ ] CHK013 Edit mode changes submit button text to "Update Check-in"
- [ ] CHK014 MetricInput component is reusable across different metric types
- [ ] CHK015 History list shows date, mood, energy, focus, productivity in compact format

## Responsive UX Validation

- [ ] CHK016 Check-in form usable on mobile (375px) — single column, touch-friendly inputs
- [ ] CHK017 Check-in form usable on tablet (768px) and desktop (1280px)
- [ ] CHK018 No horizontal scrolling on the form at any breakpoint
- [ ] CHK019 Touch targets for sliders/selects are at least 44px on mobile
- [ ] CHK020 History list is readable on mobile

## Backend Validation

- [ ] CHK021 POST /api/checkins creates check-in with 201 response
- [ ] CHK022 PUT /api/checkins/:id updates check-in with 200 response
- [ ] CHK023 GET /api/checkins/today returns today's check-in or null
- [ ] CHK024 GET /api/checkins returns paginated history sorted by date desc
- [ ] CHK025 Upsert behavior works — POST for existing date updates instead of duplicating
- [ ] CHK026 All endpoints require authentication (401 without token)
- [ ] CHK027 User ownership enforced — users cannot access other users' check-ins

## Database Validation

- [ ] CHK028 check_ins table has UNIQUE constraint on (user_id, date)
- [ ] CHK029 FK to users(id) with ON DELETE CASCADE
- [ ] CHK030 All field types are PostgreSQL-portable (TEXT dates, INTEGER booleans, REAL for hours)
- [ ] CHK031 Required fields have NOT NULL constraints

## API Validation

- [ ] CHK032 Request/response shapes match documented contracts
- [ ] CHK033 Error responses use consistent shape { error: { code, message } }
- [ ] CHK034 Pagination parameters (page, limit) work correctly on GET /api/checkins

## Error Handling

- [ ] CHK035 Missing required fields return 400 with field-level details
- [ ] CHK036 Out-of-range values return 400 with clear messages
- [ ] CHK037 Unauthorized access returns 403 (wrong user's check-in)
- [ ] CHK038 Non-existent check-in ID returns 404

## Analytics & AI Readiness *(optional)*

- [ ] CHK039 Check-in data fields are structured for future trend analysis (numeric scales, consistent date format)
- [ ] CHK040 Historical query supports date range filtering for future reporting

## Implementation Quality

- [ ] CHK041 Controller → service → model boundaries are clean
- [ ] CHK042 Validation logic is shared between validator and service (not duplicated)
- [ ] CHK043 Form component is maintainable — adding new metrics requires minimal changes
- [ ] CHK044 No console.log debugging in committed code

## Notes

- Check-in is the primary data input for Momentum — data quality matters
- The upsert pattern simplifies the create/edit UX significantly
- Dashboard integration (CHK006) requires 003-dashboard to be partially complete
