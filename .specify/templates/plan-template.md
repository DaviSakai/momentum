# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec and research. Keep this short, concrete, and useful for `/speckit-tasks`.]

**Primary Requirement**: [What the feature must allow the user to do]

**User Value**: [Why this matters for personal organization, productivity, health, studies, analytics, goals, tasks, calendar, reports, or routine optimization]

**Affected Momentum Module**: [Dashboard | Daily planning | Habits | Tasks | Kanban | Calendar | Goals | Health tracking | Study management | Analytics | Reports | Authentication | Shared platform | Future AI]

**Implementation Strategy**: [One paragraph describing the technical approach, including frontend/backend/database boundaries]

## Technical Context

<!--
  ACTION REQUIRED: Replace placeholders with concrete feature decisions.
  Defaults below reflect Momentum's intended architecture. Mark deviations and
  unknowns explicitly with NEEDS CLARIFICATION.
-->

**Language/Version**: JavaScript / Node.js [version or NEEDS CLARIFICATION]

**Frontend**: Next.js + React, modern CSS, responsive-first dashboard UX

**Backend**: Node.js + Express, REST API, modular route/controller/service structure

**Storage**: SQLite initially; keep schema and queries portable for future PostgreSQL migration

**API Style**: Explicit REST contracts between frontend and backend

**Testing**: [Backend unit/integration/API tests; frontend component/UI tests if applicable; manual responsive validation]

**Target Platform**: Responsive web app for mobile, tablet, and desktop

**Project Type**: Decoupled web application with separate frontend and backend

**Performance Goals**: [Expected response time, perceived UI speed, dashboard rendering needs, or NEEDS CLARIFICATION]

**Constraints**: API-first boundary, minimal dependencies, responsive states, clear module boundaries, MVP scope control

**Scale/Scope**: [Single-user local MVP | authenticated multi-user | analytics heavy | reporting heavy | NEEDS CLARIFICATION]

**Future Compatibility**: [PostgreSQL considerations, analytics/reporting reuse, future AI routine optimization relevance, or N/A]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Clean Code and Boundaries**: Frontend components, API clients, backend controllers, services, models, and database access have clear responsibilities. Business rules stay in services where possible.
- **Next.js + React Alignment**: Frontend work uses the approved Next.js + React architecture. If the current area is still Vite-based, the plan identifies whether migration is required before feature implementation.
- **Decoupled API-First Design**: Frontend and backend communicate through explicit REST contracts. No direct database access or hidden coupling from the frontend.
- **Modular Backend Services**: Express routes/controllers remain thin; reusable feature logic lives in framework-independent services where practical.
- **Responsive-First UX**: Primary workflows are usable on mobile, tablet, and desktop without overlap, hidden critical controls, layout jumps, or horizontal scrolling.
- **Required UI States**: Loading, empty, error, and success states are planned for every user-facing async flow.
- **Minimal Dependencies**: New dependencies are avoided unless clearly justified. Existing platform, Next.js, React, Express, and local utilities are preferred.
- **MVP Discipline**: The plan separates the smallest valuable implementation from later improvements and avoids overengineering.
- **Learning and Maintainability**: The feature has explicit learning goals, readable documentation, and decisions worth reviewing later.
- **Constitution Result**: [PASS | PASS WITH JUSTIFIED DEVIATIONS | BLOCKED]

## Feature Implementation Scope

**MVP Included**:

- [Core user workflow included in this implementation]
- [Backend/API capability included]
- [Data persistence or read model included]
- [UI states and responsive behavior included]

**Explicitly Excluded**:

- [Future enhancement not included now]
- [Automation, report, integration, AI behavior, or advanced analytics deferred]

**Dependencies With Other Features**:

- [Authentication, dashboard, goals, tasks, calendar, reports, analytics, or N/A]

**Assumptions**:

- [Reasonable assumption that allows planning to continue]

**Open Questions**:

- [NEEDS CLARIFICATION: question that affects implementation, if any]

## Architecture Decisions

**Frontend Route Structure**: [Next.js route(s), nested layouts, route groups, or migration path if current code is not yet Next.js]

**Frontend Component Boundaries**: [Page-level components, feature components, shared components, hooks, API service modules]

**Backend Route/Controller/Service Structure**: [Express route files, controller actions, service modules, model/database access responsibilities]

**Database Entities**: [Tables/entities touched or created, ownership rules, relationships]

**API Boundaries**: [REST resources, DTO/request/response shapes, error model, versioning or naming choices]

**Authentication Impact**: [Requires logged-in user? Ownership checks? Authorization rules? N/A]

**Analytics/Reporting Impact**: [Metrics produced or consumed, dashboard/report reuse, observability signals, or N/A]

**Future AI Impact**: [Data useful for future recommendations/pattern detection/routine optimization, privacy considerations, or N/A]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
|-- spec.md              # Feature specification input
|-- plan.md              # This file (/speckit-plan command output)
|-- research.md          # Phase 0 output (/speckit-plan command)
|-- data-model.md        # Phase 1 output (/speckit-plan command)
|-- quickstart.md        # Phase 1 output (/speckit-plan command)
|-- contracts/           # Phase 1 output (/speckit-plan command)
`-- tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Keep this Momentum-oriented structure, delete paths not
  touched by the feature, and expand real paths as needed. The delivered plan
  should name concrete files/modules when known.
-->

```text
backend/
|-- src/
|   |-- controllers/
|   |-- services/
|   |-- routes/
|   |-- models/
|   |-- middlewares/
|   |-- database/
|   `-- utils/
`-- tests/

frontend/
|-- app/ or src/app/
|   |-- [routes]/
|   `-- layout files
|-- src/
|   |-- components/
|   |-- features/
|   |-- hooks/
|   |-- services/
|   |-- styles/
|   `-- lib/
`-- tests/

database/
|-- migrations/
`-- seeds/

docs/
`-- decisions/
```

**Structure Decision**: [Document the selected structure and reference the real directories captured above]

## Frontend Plan

**Affected Routes**:

- `[route]` - [Purpose, page ownership, and navigation entry point]

**Pages and Layouts**: [Pages, layouts, route groups, metadata, loading/error boundaries if applicable]

**Components**: [Feature components, shared components, dashboards/cards/forms, charts, lists, modals, filters]

**State Management**: [Local state, URL state, React hooks, context, cache, or server data fetching approach]

**Forms and Validation**: [Inputs, client validation, server validation feedback, submission behavior]

**UI States**:

- **Loading**: [Skeleton, spinner, disabled actions, optimistic/pessimistic flow]
- **Empty**: [What appears when no records exist and next action]
- **Error**: [Message, retry/recovery action, field-level errors]
- **Success**: [Confirmation, updated list/dashboard state, navigation]

**Responsive Behavior**: [Mobile-first layout, tablet/desktop enhancements, stable dimensions, touch targets, overflow handling]

**Accessibility Notes**: [Labels, focus states, keyboard flow, contrast, semantic structure, chart/table alternatives]

## Backend Plan

**Endpoints**:

- `GET [path]` - [List/read purpose, filters, ownership]
- `POST [path]` - [Create purpose, payload, validation]
- `PATCH/PUT [path]` - [Update purpose, payload, validation]
- `DELETE [path]` - [Delete/archive purpose, constraints]

**Routes**: [Files under `backend/src/routes/`]

**Controllers**: [Files/actions under `backend/src/controllers/`; keep HTTP translation here]

**Services**: [Files under `backend/src/services/`; business rules, calculations, reusable logic]

**Models/Data Access**: [Files under `backend/src/models/` or `backend/src/database/`; SQL/query responsibilities]

**Validation**: [Required fields, types, ranges, dates, ownership, state transitions]

**Authentication/Authorization**: [Middleware, user ownership checks, public vs private endpoints]

**Error Handling**: [400 validation, 401/403 auth, 404 missing resource, 409 conflict, 500 unexpected errors; user-safe messages]

## Database Plan

**Tables**:

- `[table_name]` - [Purpose and owning module]

**Fields**:

- `[field_name]` `[conceptual type]` - [Required? default? reason?]

**Relationships**: [Foreign keys, user ownership, 1:N or N:N relationships, cascade/restrict behavior]

**Indexes**: [Queries that need indexes, e.g. `user_id + date`, `user_id + status`, date ranges]

**Migrations/Seeds**: [Migration files and seed data needed, if any]

**SQLite -> PostgreSQL Compatibility**: [Avoid non-portable types/functions, prefer ISO timestamps, stable IDs, explicit constraints where possible]

## API Contract Plan

**Contract Files**:

- `specs/[###-feature]/contracts/[resource].md` or `[resource].openapi.yaml`

**Request Shape**:

```json
{
  "exampleField": "example value"
}
```

**Response Shape**:

```json
{
  "id": "example-id",
  "exampleField": "example value"
}
```

**Error Shape**:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-safe message",
    "details": []
  }
}
```

**Authentication Requirements**: [None | authenticated user | role/ownership checks]

**Contract Validation Notes**: [How frontend services and backend tests will verify the contract]

## Testing Strategy

**Unit Tests**: [Services, validation helpers, calculations, data transforms]

**Integration Tests**: [Backend service + database behavior, important user flows, persistence]

**API Tests**: [Endpoint status codes, request/response contracts, authentication and ownership checks]

**UI Tests**: [Component/page behavior, forms, UI states, responsive checks if applicable]

**Manual Testing Checklist**:

- [ ] MVP user flow works end to end
- [ ] Loading, empty, error, and success states are visible and understandable
- [ ] Mobile, tablet, and desktop layouts are usable without overlap or horizontal scrolling
- [ ] API errors are surfaced safely in the UI
- [ ] Data persists and reloads correctly
- [ ] Dashboard/reporting/analytics impact is verified when applicable

## Learning Goals

**Concepts Practiced**: [React/Next.js routing, forms, state, Express routing, service boundaries, SQL modeling, testing, responsive design, etc.]

**Architecture Decisions Being Learned**: [API-first design, controller/service separation, SQLite portability, analytics-ready data modeling, feature-module organization]

**Documentation for Future Review**: [Decision notes, quickstart lessons, tradeoffs, migration notes, testing notes]

## Implementation Phases

**Phase 0: Research**: Use `/speckit-plan` to resolve unknowns, compare simple approaches, document dependency decisions, and identify constitutional risks.

**Phase 1: Design**: Define frontend routes/components, backend modules, database shape, responsive UX states, and implementation boundaries.

**Phase 2: Data Model and API Contracts**: Produce `data-model.md`, contract files under `contracts/`, and quickstart validation guidance.

**Phase 3: Backend Implementation**: Implement migrations/models, services/controllers/routes, validation, auth checks, and API tests.

**Phase 4: Frontend Implementation**: Implement routes/pages/components, API service calls, forms, UI states, responsive behavior, and accessibility details.

**Phase 5: Integration and Validation**: Connect frontend to backend, verify contracts, run automated tests, and complete the manual responsive checklist.

**Phase 6: Documentation and Review**: Update `quickstart.md`, decisions docs, learning notes, and prepare `/speckit-tasks` output for implementation tracking.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations or deviations that must be justified**

| Deviation | Why Needed | Simpler Alternative Rejected Because | Follow-Up Path |
|-----------|------------|--------------------------------------|----------------|
| [Additional dependency] | [Specific feature need] | [Why existing stack is insufficient] | [Remove/keep/review condition] |
| [Architectural exception] | [Specific constraint] | [Why standard boundary does not work] | [How to return to standard design] |
| [Temporary technical debt] | [Why acceptable for MVP] | [Why fixing now is too costly] | [Planned cleanup trigger] |
| [Postponed refactor] | [Reason] | [Why current shape is tolerable] | [When to revisit] |
| [Performance tradeoff] | [Reason] | [Why simpler implementation is acceptable] | [Metric or threshold for optimization] |
