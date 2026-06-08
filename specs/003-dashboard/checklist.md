# Dashboard Checklist: Main Dashboard

**Purpose**: Validate that the Momentum dashboard is complete, responsive, and ready as the primary user landing surface.
**Created**: 2026-05-20
**Feature**: [spec.md](./spec.md)
**Stack**: Next.js · React · Node.js · Express · SQLite

## Feature Completeness

- [x] CHK001 Dashboard loads at /dashboard after successful login
- [x] CHK002 Greeting header displays user name and current date
- [x] CHK003 Health summary card shows check-in data or empty state
- [x] CHK004 Task summary card shows task counts or empty state
- [x] CHK005 Goal summary card shows goal progress or empty state
- [x] CHK006 Productivity card shows daily score or empty state
- [x] CHK007 Each empty state has a clear CTA linking to the relevant feature

## Frontend Validation

- [x] CHK008 Dashboard page uses ProtectedRoute — unauthenticated users redirect to /login
- [x] CHK009 Each card component handles loading, empty, error, and populated states independently
- [x] CHK010 Skeleton loaders display during data fetch
- [x] CHK011 Card-level errors show retry button without crashing the entire dashboard
- [x] CHK012 CTA buttons in empty states navigate to correct routes (/checkin, /goals, /tasks)
- [x] CHK013 Component structure follows features/dashboard/components/ organization
- [x] CHK014 Dashboard data is fetched via API service module, not directly

## Responsive UX Validation

- [x] CHK015 Mobile (375px): cards stack in a single column
- [x] CHK016 Tablet (768px): cards display in a 2-column grid
- [x] CHK017 Desktop (1280px+): cards display in a multi-column auto-fit grid
- [x] CHK018 No horizontal scrolling at any breakpoint
- [x] CHK019 Cards maintain consistent min-height across breakpoints
- [x] CHK020 Touch targets (buttons, CTAs) are at least 44px on mobile
- [x] CHK021 Text is readable without zooming on all viewports
- [x] CHK022 Greeting header scales appropriately across breakpoints

## Backend Validation

- [x] CHK023 GET /api/dashboard/summary requires authentication (returns 401 without token)
- [x] CHK024 Summary endpoint returns proper response shape with null/defaults when no data exists
- [x] CHK025 All data queries are filtered by authenticated user_id
- [x] CHK026 Endpoint handles missing feature tables gracefully (no crashes if 004-006 not yet built)
- [x] CHK027 Response time is under 2 seconds

## Error Handling

- [x] CHK028 Individual card API failure does not crash the entire dashboard
- [x] CHK029 Retry button on error cards re-fetches data
- [x] CHK030 Authentication errors redirect to login
- [x] CHK031 Network errors show user-friendly message

## Accessibility Basics

- [x] CHK032 Cards use semantic HTML (article or section with aria-label)
- [x] CHK033 Heading hierarchy is correct (h1 for greeting, h2 or h3 for card titles)
- [x] CHK034 Status indicators use text, not only color
- [x] CHK035 CTA buttons have descriptive accessible text

## Documentation

- [x] CHK036 Dashboard layout decisions documented in docs/decisions/
- [x] CHK037 Card component API documented (props, states)

## Implementation Quality

- [x] CHK038 Cards are independent components — no tight coupling between cards
- [x] CHK039 CSS Grid used for layout (not Flexbox for the grid itself)
- [x] CHK040 CSS uses responsive variables or breakpoint approach from the design system
- [x] CHK041 No hardcoded data — all from API or defaults
- [x] CHK042 Empty states use encouraging tone, not clinical "No data" messages

## Notes

- Dashboard initially shows all empty states until data features (004-006) are implemented
- Dashboard is the most-visited screen — visual quality and performance are critical
- Card independence enables future enhancements (AI cards, custom layout) without refactoring
