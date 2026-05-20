# Momentum Constitution

## Core Principles

### I. Clean Code Is Required
All production code MUST be clear, cohesive, and easy to change. Names MUST
describe intent, modules MUST keep a single primary responsibility, and shared
logic MUST be extracted only when it removes real duplication or reduces
complexity. New complexity MUST be justified in the implementation plan.

Rationale: Momentum is a portfolio-grade learning project. The codebase must
teach maintainable engineering practices through its structure, not only through
documentation.

### II. Responsive UX By Default
Every user-facing feature MUST support efficient use on mobile, tablet, and
desktop viewports. Primary workflows MUST remain reachable, readable, and usable
without horizontal scrolling, overlapping content, hidden critical controls, or
layout jumps that interrupt the task.

Rationale: Momentum is a daily-use product. Tracking health, habits, studies,
and routine data must work naturally across the devices users actually use.

### III. Responsive Design Standards
UI implementation MUST use fluid layouts, stable component dimensions,
accessible spacing, and readable type across supported breakpoints. Components
MUST be designed from their smallest practical viewport upward, then enhanced
for larger screens. Visual polish MUST NOT come at the cost of legibility,
touch targets, or content hierarchy.

Rationale: A modern dashboard experience requires more than visual styling; it
requires resilient layout behavior under real content and real screen sizes.

### IV. Framework Alignment: Next.js + React
The frontend and backend SHOULD remain decoupled through explicit APIs in order to preserve architectural clarity, scalability, maintainability, and future extensibility across the Momentum ecosystem. Backend services MUST remain modular and framework-independent where possible so that business logic, validation rules, analytics systems, AI integrations, and future infrastructure changes can evolve without tightly coupling core application behavior to a specific framework implementation.

Feature plans MUST explicitly identify the affected API boundaries, backend modules, service responsibilities, database interactions, and frontend integration points before implementation begins.

Current architectural direction: Momentum adopts a decoupled application structure using Next.js + React for the frontend layer and Node.js + Express for backend services. This separation MUST be preserved unless a future constitution amendment formally approves a different architectural approach.

Rationale: Maintaining a clear separation between frontend presentation and backend services improves long-term maintainability, enables cleaner scaling strategies, simplifies future integrations such as AI-driven systems and mobile applications, and reinforces professional software engineering practices throughout the evolution of the project.


### V. Minimal Dependencies
Dependencies MUST be added only when they provide clear product or engineering
value that cannot be achieved simply with the existing stack. Each new runtime
dependency MUST be justified in the plan, including purpose, expected scope,
and why native platform, Next.js, React, or existing project code is not enough.

Rationale: Fewer dependencies reduce maintenance cost, security exposure,
bundle size, and learning noise.

## Product Experience Constraints

Momentum MUST feel clean, focused, modern, and practical. User interfaces MUST
prioritize clear information hierarchy, predictable navigation, fast scanning,
and direct task completion over decorative complexity. Dashboard surfaces MUST
remain useful with empty, partial, loading, and error states.

Accessibility and responsiveness are mandatory quality attributes. Interactive
controls MUST have adequate labels, keyboard reachability where applicable,
visible focus states, and touch targets appropriate for mobile use.

## Development Workflow

Every feature plan MUST pass the Constitution Check before research/design work
continues and again before task generation. The plan MUST explicitly address:

- Clean code boundaries and any complexity justification.
- Responsive UX and responsive design validation.
- Next.js + React alignment for frontend work.
- Dependency additions, removals, and alternatives considered.

Tasks MUST include implementation and verification work needed to satisfy these
principles. UI changes MUST include viewport checks for mobile and desktop.

## Governance

This constitution supersedes conflicting project guidance. Amendments MUST be
documented in this file with a Sync Impact Report, semantic version update, and
template synchronization review.

Versioning policy:

- MAJOR: Removes or redefines a core principle in a way that breaks prior plans.
- MINOR: Adds a principle, required section, or materially expands governance.
- PATCH: Clarifies wording without changing compliance expectations.

Compliance review is required for every feature plan, task list, and pull
request. Any accepted violation MUST be documented with the reason, simpler
alternative rejected, and follow-up path back to compliance.

**Version**: 1.0.0 | **Ratified**: 2026-05-19 | **Last Amended**: 2026-05-19