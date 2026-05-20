# Dashboard Checklist: Main Dashboard

**Purpose**: Validate that the Momentum dashboard is complete, responsive, and ready as the primary user landing surface.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [ ] CHK001 Dashboard loads at /dashboard after successful login
- [ ] CHK002 Greeting header displays user name and current date
- [ ] CHK003 Health summary card shows check-in data or empty state
- [ ] CHK004 Task summary card shows task counts or empty state
- [ ] CHK005 Goal summary card shows goal progress or empty state
- [ ] CHK006 Productivity card shows daily score or empty state
- [ ] CHK007 Each empty state has a clear CTA linking to the relevant feature

## Frontend Validation

- [ ] CHK008 Dashboard page uses ProtectedRoute — unauthenticated users redirect to /login
- [ ] CHK009 Each card component handles loading, empty, error, and populated states independently
- [ ] CHK010 Skeleton loaders display during data fetch
- [ ] CHK011 Card-level errors show retry button without crashing the entire dashboard
- [ ] CHK012 CTA buttons in empty states navigate to correct routes (/checkin, /goals, /tasks)
- [ ] CHK013 Component structure follows features/dashboard/components/ organization
- [ ] CHK014 Dashboard data is fetched via API service module, not directly

## Responsive UX Validation

- [ ] CHK015 Mobile (375px): cards stack in a single column
- [ ] CHK016 Tablet (768px): cards display in a 2-column grid
- [ ] CHK017 Desktop (1280px+): cards display in a multi-column auto-fit grid
- [ ] CHK018 No horizontal scrolling at any breakpoint
- [ ] CHK019 Cards maintain consistent min-height across breakpoints
- [ ] CHK020 Touch targets (buttons, CTAs) are at least 44px on mobile
- [ ] CHK021 Text is readable without zooming on all viewports
- [ ] CHK022 Greeting header scales appropriately across breakpoints

## Backend Validation

- [ ] CHK023 GET /api/dashboard/summary requires authentication (returns 401 without token)
- [ ] CHK024 Summary endpoint returns proper response shape with null/defaults when no data exists
- [ ] CHK025 All data queries are filtered by authenticated user_id
- [ ] CHK026 Endpoint handles missing feature tables gracefully (no crashes if 004-006 not yet built)
- [ ] CHK027 Response time is under 2 seconds

## Error Handling

- [ ] CHK028 Individual card API failure does not crash the entire dashboard
- [ ] CHK029 Retry button on error cards re-fetches data
- [ ] CHK030 Authentication errors redirect to login
- [ ] CHK031 Network errors show user-friendly message

## Accessibility Basics

- [ ] CHK032 Cards use semantic HTML (article or section with aria-label)
- [ ] CHK033 Heading hierarchy is correct (h1 for greeting, h2 or h3 for card titles)
- [ ] CHK034 Status indicators use text, not only color
- [ ] CHK035 CTA buttons have descriptive accessible text

## Documentation

- [ ] CHK036 Dashboard layout decisions documented in docs/decisions/
- [ ] CHK037 Card component API documented (props, states)

## Implementation Quality

- [ ] CHK038 Cards are independent components — no tight coupling between cards
- [ ] CHK039 CSS Grid used for layout (not Flexbox for the grid itself)
- [ ] CHK040 CSS uses responsive variables or breakpoint approach from the design system
- [ ] CHK041 No hardcoded data — all from API or defaults
- [ ] CHK042 Empty states use encouraging tone, not clinical "No data" messages

## Notes

- Dashboard initially shows all empty states until data features (004-006) are implemented
- Dashboard is the most-visited screen — visual quality and performance are critical
- Card independence enables future enhancements (AI cards, custom layout) without refactoring
