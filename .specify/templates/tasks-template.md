---
description: "Momentum task list template for AI-assisted feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Test tasks are OPTIONAL unless the feature specification, implementation plan, or risk level requires them. When included, tests should be written before implementation and should fail for the expected reason.

**Organization**: Tasks are grouped by phase and user story so each story can be implemented, validated, reviewed, and committed as an independent increment.

## Format: `[ID] [P?] [Story?] Area - Outcome-focused task with exact path`

- **[ID]**: Sequential task ID (`T001`, `T002`, `T003`...)
- **[P]**: Can run in parallel because it touches different files and has no unresolved dependency
- **[Story]**: User story label when applicable (`US1`, `US2`, `US3`)
- **Area**: `Contracts`, `Database`, `Backend`, `Frontend`, `Integration`, `Tests`, `Docs`, `Analytics`, `UX`
- **Description**: Start with an implementation verb and include exact repository paths

Good task wording:

- `T014 [P] [US1] Backend - Implement task creation controller in backend/src/controllers/taskController.js`
- `T021 [US1] Frontend - Connect task creation form in frontend/src/features/tasks/components/TaskForm.jsx to frontend/src/services/tasksApi.js`

Avoid vague task wording:

- `Create backend stuff`
- `Improve UI`
- `Handle errors`

## Momentum Path Conventions

Use these repository paths unless `plan.md` documents a justified deviation.

```text
frontend/
|-- app/ or src/app/
|-- components/
|-- features/
|-- hooks/
|-- services/
|-- styles/
|-- lib/
`-- tests/

backend/
|-- src/
|   |-- controllers/
|   |-- services/
|   |-- routes/
|   |-- models/
|   |-- middlewares/
|   |-- database/
|   |-- validators/
|   `-- utils/
`-- tests/

database/
|-- migrations/
`-- seeds/

docs/
`-- decisions/

specs/[###-feature-name]/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
`-- tasks.md
```

## Momentum Task Generation Rules

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md, preserving priorities P1, P2, P3...
  - Functional requirements, non-functional requirements, and acceptance criteria
  - Architecture decisions and structure from plan.md
  - Entities, relationships, ownership rules, and SQLite -> PostgreSQL notes from data-model.md
  - REST contracts from contracts/
  - Manual validation steps from quickstart.md

  Generated tasks MUST:
  - Preserve the task format: T001, T002, [P], [USx]
  - Use exact Momentum repository paths
  - Separate frontend, backend, database, contracts, tests, docs, analytics, integration, and UX work
  - Keep user stories independently implementable and independently testable
  - Prefer small, outcome-focused tasks over broad multi-file tasks
  - Identify dependencies when a task cannot be parallelized
  - Avoid assigning two parallel tasks to the same file

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup

**Purpose**: Prepare the repository, feature folders, environment, and implementation surface without building user story behavior yet.

- [ ] T001 Setup - Confirm feature documents exist under specs/[###-feature-name]/ and record missing inputs in specs/[###-feature-name]/tasks.md
- [ ] T002 Setup - Confirm frontend route target under frontend/app/ or frontend/src/app/ from plan.md
- [ ] T003 Setup - Confirm backend module targets under backend/src/routes/, backend/src/controllers/, backend/src/services/, backend/src/models/, and backend/src/validators/
- [ ] T004 [P] Setup - Add or update feature environment keys in frontend/.env.example and backend/.env.example if required by plan.md
- [ ] T005 [P] Setup - Install or verify approved dependencies for Next.js, React, Express, SQLite, validation, or testing as justified by plan.md
- [ ] T006 Setup - Document any new dependency decision in docs/decisions/[feature-name]-dependencies.md when dependencies are added

**Checkpoint**: Project structure, dependency decisions, route targets, environment requirements, and feature documents are ready. No user story behavior is expected to work yet.

---

## Phase 2: Foundation

**Purpose**: Build shared infrastructure that blocks all user stories and defines the feature's architectural boundaries.

**Critical**: No user story implementation should begin until this phase is complete.

- [ ] T007 Contracts - Create or update REST contract for [resource] in specs/[###-feature-name]/contracts/[resource].md or specs/[###-feature-name]/contracts/[resource].openapi.yaml
- [ ] T008 Database - Create initial migration for [entity/table] in database/migrations/[timestamp]_[feature_name].sql
- [ ] T009 [P] Database - Add seed data for local validation in database/seeds/[feature_name].sql if required by quickstart.md
- [ ] T010 Backend - Implement shared database access helper or query module in backend/src/database/[featureName]Repository.js
- [ ] T011 Backend - Implement validation schema for shared request rules in backend/src/validators/[featureName]Validator.js
- [ ] T012 Backend - Register base Express route module in backend/src/routes/[featureName]Routes.js
- [ ] T013 Backend - Connect route module to the application router in backend/src/routes/index.js or the existing route registration file
- [ ] T014 Backend - Implement shared error mapping for feature validation, not-found, conflict, and authorization failures in backend/src/utils/[featureName]Errors.js
- [ ] T015 Backend - Verify authentication and user ownership middleware usage in backend/src/middlewares/ or the route module
- [ ] T016 Frontend - Create typed or documented API client functions in frontend/src/services/[featureName]Api.js
- [ ] T017 Frontend - Create feature folder structure under frontend/src/features/[feature-name]/ for components, hooks, and local utilities
- [ ] T018 [P] Docs - Record architecture boundary notes in docs/decisions/[feature-name]-architecture.md when plan.md includes new patterns

**Checkpoint**: Database shape, API contract, route registration, validation boundary, auth/ownership approach, frontend API client, and feature folders are in place. User stories can now be implemented in priority order or in parallel if their files do not conflict.

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

**Goal**: [Briefly describe the independently valuable behavior delivered by this story]

**Independent Test**: [Describe how to validate this story without depending on later stories]

**Learning Checkpoint**: [Concepts practiced, such as API-first design, service boundaries, form state, SQL modeling, responsive UI, or validation]

**Architecture Notes**: [Story-specific boundaries, tradeoffs, or dependencies from plan.md]

### Tests for User Story 1 (OPTIONAL - include only if required)

- [ ] T019 [P] [US1] Tests - Add API contract test for [endpoint] in backend/tests/contract/[featureName].contract.test.js
- [ ] T020 [P] [US1] Tests - Add backend integration test for [workflow] in backend/tests/integration/[featureName].integration.test.js
- [ ] T021 [P] [US1] Tests - Add frontend behavior test for [component/page] in frontend/tests/[featureName].test.jsx

### Database for User Story 1

- [ ] T022 [US1] Database - Extend migration or repository query for [US1 persistence need] in database/migrations/[timestamp]_[feature_name].sql
- [ ] T023 [US1] Database - Ensure user ownership, date handling, and SQLite-compatible fields for [entity] in backend/src/database/[featureName]Repository.js

### Backend for User Story 1

- [ ] T024 [P] [US1] Backend - Implement [business operation] service in backend/src/services/[featureName]Service.js
- [ ] T025 [US1] Backend - Implement [endpoint] controller action in backend/src/controllers/[featureName]Controller.js
- [ ] T026 [US1] Backend - Wire [method] [route] in backend/src/routes/[featureName]Routes.js
- [ ] T027 [US1] Backend - Apply request validation, authorization, and user-safe error responses for [endpoint]

### Frontend for User Story 1

- [ ] T028 [P] [US1] Frontend - Implement page or route entry for [screen] in frontend/app/[route]/page.jsx or frontend/src/app/[route]/page.jsx
- [ ] T029 [P] [US1] Frontend - Implement [feature component] in frontend/src/features/[feature-name]/components/[ComponentName].jsx
- [ ] T030 [US1] Frontend - Implement [feature hook/state] in frontend/src/features/[feature-name]/hooks/use[FeatureName].js
- [ ] T031 [US1] Frontend - Connect UI to API client in frontend/src/services/[featureName]Api.js
- [ ] T032 [US1] Frontend - Add loading, empty, error, and success states for [screen/component]

### Integration, Analytics, and UX for User Story 1

- [ ] T033 [US1] Integration - Verify frontend request and backend response match specs/[###-feature-name]/contracts/[resource].md
- [ ] T034 [US1] Analytics - Add event, metric, or log hook for [observable action] in backend/src/services/[featureName]Service.js or frontend/src/lib/analytics.js if applicable
- [ ] T035 [US1] UX - Validate mobile, tablet, and desktop layout for [screen] with no overlap, horizontal scrolling, or hidden primary actions
- [ ] T036 [US1] UX - Verify keyboard focus, labels, contrast, and user-facing error messages for [screen/component]

**Checkpoint**: User Story 1 is complete, independently testable, responsive, contract-compatible, and safe to commit or demo as the MVP increment.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Briefly describe the independently valuable behavior delivered by this story]

**Independent Test**: [Describe how to validate this story while preserving US1 behavior]

**Learning Checkpoint**: [Concepts practiced by this story]

**Architecture Notes**: [Dependencies on US1, shared files touched, or boundaries to preserve]

### Tests for User Story 2 (OPTIONAL - include only if required)

- [ ] T037 [P] [US2] Tests - Add API contract test for [endpoint] in backend/tests/contract/[featureName].contract.test.js
- [ ] T038 [P] [US2] Tests - Add integration test for [workflow] in backend/tests/integration/[featureName].integration.test.js
- [ ] T039 [P] [US2] Tests - Add frontend behavior test for [component/page] in frontend/tests/[featureName].test.jsx

### Implementation for User Story 2

- [ ] T040 [US2] Database - Add or update repository support for [US2 data need] in backend/src/database/[featureName]Repository.js
- [ ] T041 [P] [US2] Backend - Implement [business operation] in backend/src/services/[featureName]Service.js
- [ ] T042 [US2] Backend - Implement [endpoint] controller and route wiring in backend/src/controllers/[featureName]Controller.js and backend/src/routes/[featureName]Routes.js
- [ ] T043 [P] [US2] Frontend - Implement [component/page] in frontend/src/features/[feature-name]/components/[ComponentName].jsx or frontend/app/[route]/page.jsx
- [ ] T044 [US2] Frontend - Connect [interaction] to frontend/src/services/[featureName]Api.js with loading, empty, error, and success states
- [ ] T045 [US2] Integration - Verify US2 works without regressing US1 acceptance criteria
- [ ] T046 [US2] UX - Validate responsive behavior and accessibility basics for US2 on mobile, tablet, and desktop

**Checkpoint**: User Stories 1 and 2 work independently, shared files remain coherent, and the feature can still be committed or demoed after either story.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Briefly describe the independently valuable behavior delivered by this story]

**Independent Test**: [Describe how to validate this story while preserving earlier stories]

**Learning Checkpoint**: [Concepts practiced by this story]

**Architecture Notes**: [Dependencies on earlier stories or cross-cutting concerns]

### Tests for User Story 3 (OPTIONAL - include only if required)

- [ ] T047 [P] [US3] Tests - Add API contract test for [endpoint] in backend/tests/contract/[featureName].contract.test.js
- [ ] T048 [P] [US3] Tests - Add integration test for [workflow] in backend/tests/integration/[featureName].integration.test.js
- [ ] T049 [P] [US3] Tests - Add frontend behavior test for [component/page] in frontend/tests/[featureName].test.jsx

### Implementation for User Story 3

- [ ] T050 [US3] Database - Add or update persistence support for [US3 data need] in backend/src/database/[featureName]Repository.js
- [ ] T051 [P] [US3] Backend - Implement [business operation] in backend/src/services/[featureName]Service.js
- [ ] T052 [US3] Backend - Implement [endpoint] controller and route wiring in backend/src/controllers/[featureName]Controller.js and backend/src/routes/[featureName]Routes.js
- [ ] T053 [P] [US3] Frontend - Implement [component/page] in frontend/src/features/[feature-name]/components/[ComponentName].jsx or frontend/app/[route]/page.jsx
- [ ] T054 [US3] Frontend - Connect [interaction] to frontend/src/services/[featureName]Api.js with required UI states
- [ ] T055 [US3] Integration - Verify US3 works without regressing US1 or US2 acceptance criteria
- [ ] T056 [US3] UX - Validate responsive behavior and accessibility basics for US3 on mobile, tablet, and desktop

**Checkpoint**: All selected user stories are independently functional, contract-compatible, responsive, and ready for final cross-story validation.

---

[Add more user story phases as needed, following the same structure.]

---

## Final Phase: Polish & Validation

**Purpose**: Cross-cutting validation and cleanup after the selected user stories work independently.

- [ ] T057 Tests - Run backend unit, integration, and contract tests from backend/tests/ as applicable
- [ ] T058 Tests - Run frontend behavior and component tests from frontend/tests/ as applicable
- [ ] T059 Integration - Run the quickstart validation steps in specs/[###-feature-name]/quickstart.md
- [ ] T060 UX - Validate mobile viewport layout for primary flows, empty states, loading states, error states, and success states
- [ ] T061 UX - Validate tablet and desktop layouts for stable spacing, readable data density, and no overlapping controls
- [ ] T062 UX - Review accessibility basics: semantic headings, labels, keyboard navigation, focus visibility, and contrast
- [ ] T063 Backend - Review controllers, services, validators, models, and database modules for clean responsibility boundaries
- [ ] T064 Database - Review SQLite queries, fields, indexes, and constraints for future PostgreSQL portability
- [ ] T065 Frontend - Review components, hooks, services, and styles for maintainability and responsive-first behavior
- [ ] T066 Analytics - Verify metrics, logs, dashboard hooks, or future AI data signals are implemented only where specified
- [ ] T067 Docs - Update specs/[###-feature-name]/quickstart.md with final validation notes
- [ ] T068 [P] Docs - Update docs/decisions/[feature-name]-architecture.md with final tradeoffs if architecture changed during implementation
- [ ] T069 Dependencies - Review new dependencies and remove or document unjustified packages
- [ ] T070 Cleanup - Remove dead code, unused styles, console debugging, temporary fixtures, and obsolete TODOs introduced by the feature

**Checkpoint**: Selected scope passes automated checks where available, manual responsive validation is complete, documentation reflects the implemented behavior, and the feature is ready for review, commit, or deployment.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundation (Phase 2)**: Depends on Setup; blocks all user story work.
- **User Stories (Phase 3+)**: Depend on Foundation; proceed in priority order for MVP delivery or in parallel when file ownership is isolated.
- **Final Phase**: Depends on all selected user stories being implemented and independently validated.

### User Story Dependencies

- **User Story 1 (P1)**: First MVP increment. Should not depend on later stories.
- **User Story 2 (P2)**: May reuse US1 infrastructure but must remain independently testable.
- **User Story 3 (P3)**: May build on earlier shared services or UI patterns but must not break earlier story acceptance criteria.

### Within Each User Story

- Contracts before frontend/backend implementation that depends on request or response shape.
- Database migrations and repository methods before services that persist or query data.
- Services before controllers and routes.
- API client functions before UI integration.
- Core UI before responsive polish.
- Integration validation after both frontend and backend pieces exist.
- Responsive and accessibility validation before marking the story complete.

### Parallel Execution Rules

- Mark a task `[P]` only when it touches different files and does not depend on another incomplete task.
- Do not run parallel tasks that edit the same controller, route, service, component, test file, or migration.
- Prefer parallel frontend/backend work after contracts are stable.
- Prefer parallel tests only when each test file is separate.
- Keep cross-cutting files, such as route registries, shared API clients, global styles, and migration indexes, as sequential tasks.
- When multiple AI agents work at once, assign disjoint ownership: one agent for backend service/controller files, one for frontend feature components, one for tests/docs, or similar.

---

## Parallel Example: User Story 1

```text
# Safe parallel tasks after contracts and foundation are ready:
Task: "T024 [P] [US1] Backend - Implement [business operation] service in backend/src/services/[featureName]Service.js"
Task: "T029 [P] [US1] Frontend - Implement [feature component] in frontend/src/features/[feature-name]/components/[ComponentName].jsx"
Task: "T021 [P] [US1] Tests - Add frontend behavior test for [component/page] in frontend/tests/[featureName].test.jsx"

# Sequential tasks because they share dependencies:
Task: "T025 [US1] Backend - Implement [endpoint] controller action in backend/src/controllers/[featureName]Controller.js"
Task: "T026 [US1] Backend - Wire [method] [route] in backend/src/routes/[featureName]Routes.js"
Task: "T033 [US1] Integration - Verify frontend request and backend response match the contract"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundation.
3. Implement only User Story 1.
4. Stop and validate User Story 1 independently against its acceptance criteria, contract, UI states, and responsive behavior.
5. Commit, demo, or deploy the MVP increment if it is stable.

### Incremental Delivery

1. Build the smallest valuable story first.
2. Validate each story independently before starting the next priority story.
3. Keep earlier stories working while adding later stories.
4. Commit after each checkpoint or coherent group of tasks.
5. Defer enhancements that are not required for the selected story's acceptance criteria.

### AI-Assisted Execution

1. Give AI agents the current `spec.md`, `plan.md`, `data-model.md`, `contracts/`, and this `tasks.md`.
2. Assign tasks by file ownership to reduce conflicts.
3. Ask agents to report changed files, validation performed, and unresolved assumptions.
4. Require exact paths and task IDs in implementation notes.
5. Review generated code for architecture boundaries, user ownership, error handling, and responsive UI states.

### Branch Strategy

1. Work on the active Spec Kit feature branch (`[###-feature-name]`).
2. Keep commits aligned with checkpoints: setup/foundation, each user story, final polish.
3. Avoid mixing unrelated refactors with feature work.
4. Record postponed cleanup in the Technical Debt & Deferred Work section instead of hiding it in code.

### Validation Checkpoints

- **After Setup**: Structure, dependencies, and environment assumptions are clear.
- **After Foundation**: Contracts, persistence approach, backend boundaries, and frontend feature folders are ready.
- **After Each Story**: That story works end to end, has required UI states, respects API contracts, and passes available checks.
- **After Final Phase**: Selected scope is responsive, accessible at a basic level, documented, and review-ready.

---

## Testing Guidance

Use the lightest test set that matches feature risk and spec requirements.

- **API Contract Tests**: Verify status codes, request bodies, response bodies, error shape, authentication, and ownership rules against `contracts/`.
- **Backend Integration Tests**: Verify services, database persistence, migrations, validation, and important workflows in `backend/tests/integration/`.
- **Frontend Behavior Tests**: Verify forms, lists, filters, loading/empty/error/success states, and API client interactions in `frontend/tests/`.
- **Manual Validation**: Follow `quickstart.md` for the main flow and acceptance criteria.
- **Responsive Validation**: Check mobile, tablet, and desktop layouts for overlap, horizontal scrolling, hidden primary actions, readable text, and touch-friendly controls.

Tests remain optional unless required by `spec.md`, `plan.md`, or feature risk. If tests are omitted, manual validation tasks must still be concrete.

---

## Technical Debt & Deferred Work

Use this section to keep MVP delivery honest without losing important follow-up work.

- **Postponed Refactors**: [Refactor deferred, affected files, and reason it is safe to postpone]
- **Temporary Shortcuts**: [Shortcut taken for MVP, risk, and cleanup trigger]
- **Known Limitations**: [Current limitation, user impact, and when to revisit]
- **Future Improvements**: [Enhancement, analytics/reporting opportunity, AI opportunity, or PostgreSQL migration follow-up]
- **Dependency Review Items**: [Package or tool to reassess after real usage]

---

## Notes

- `[P]` tasks must be independent and touch different files.
- `[USx]` labels map implementation work back to user stories for traceability.
- Each user story should produce a working, reviewable increment.
- Frontend must stay decoupled from database concerns through explicit REST services.
- Backend controllers should translate HTTP concerns; business rules belong in services where practical.
- Database work should remain SQLite-friendly while avoiding choices that block future PostgreSQL migration.
- Every user-facing async flow needs loading, empty, error, and success states.
- Responsive UX validation is part of implementation, not optional polish.
- Learning notes are useful when they explain architecture reasoning, tradeoffs, or concepts practiced.
