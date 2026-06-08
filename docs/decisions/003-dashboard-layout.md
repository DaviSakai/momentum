# Decision: Dashboard Layout

**Feature**: 003-dashboard
**Date**: 2026-06-02
**Status**: Accepted

## Context

The Momentum dashboard is the primary user-facing surface after login. It needs to display summary cards for 4 domains (Health, Tasks, Goals, Productivity) in a responsive layout that works from mobile to desktop.

## Decisions

### 1. CSS Grid for Card Layout

- **Decision**: Use CSS Grid (`auto-fit` + `minmax`) for the dashboard card grid.
- **Rationale**: CSS Grid provides two-dimensional control ideal for card layouts. `auto-fit` with `minmax(280px, 1fr)` automatically adjusts columns based on available width while maintaining minimum card readability.
- **Alternative Considered**: Flexbox — rejected because it requires manual wrapping calculations and doesn't maintain consistent card heights across rows.

### 2. Breakpoint Strategy

| Viewport | Columns | Breakpoint |
|----------|---------|------------|
| Mobile (<768px) | 1 column | `max-width: 767px` |
| Tablet (768–1279px) | 2 columns | `min-width: 768px` and `max-width: 1279px` |
| Desktop (1280px+) | auto-fit | `min-width: 1280px` |

- **Rationale**: Follows common device breakpoints. Tablet at 768px ensures iPad and similar devices get 2 columns. Desktop auto-fit allows optimal use of wider screens.

### 3. Independent Card Components

- **Decision**: Each card is an independent component managing its own loading/empty/error/populated states.
- **Rationale**: Card independence enables:
  - Partial failures (one card can error without crashing the entire dashboard)
  - Independent retry buttons per card
  - Future feature additions without modifying existing cards
  - Parallel development of different cards
- **Component interface**: `{ data, isLoading, error, onRetry }` props pattern.

### 4. Single Summary API Endpoint

- **Decision**: Use `GET /api/dashboard/summary` to fetch all card data in one request.
- **Rationale**: Reduces HTTP requests from 4 (one per card) to 1. The backend assembles data from multiple tables. Gracefully returns null/defaults when feature tables don't exist yet (004-006 not built).
- **Future Path**: Split into individual endpoints when data volume grows or cards need independent refresh.

### 5. Empty State as First-Class UX

- **Decision**: Each card has a dedicated empty state with icon, descriptive message, and CTA button.
- **Rationale**: The dashboard is the first screen users see after registration. Empty states with CTAs guide users toward their first actions, reducing abandonment.
- **Tone**: Encouraging ("Registre como você está hoje") rather than clinical ("Nenhum dado encontrado").

### 6. Time-Based Greeting

- **Decision**: Greeting changes based on time of day (Bom dia/Boa tarde/Boa noite).
- **Rationale**: Adds warmth and personal touch to the dashboard experience.

## Consequences

- **Positive**: Dashboard is functional and visually complete even with zero data. Cards can be developed and tested independently. Layout adapts cleanly to all viewport sizes.
- **Negative**: Single API call means all-or-nothing loading. If the summary endpoint is slow, all cards wait. Acceptable for MVP.
