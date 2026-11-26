# Copilot Instructions

# Project Coding Instructions

When working on this project:

1. Follow the existing Angular architecture and coding conventions.
2. Use TypeScript strict typing. Avoid using `any`.
3. Prefer reusing existing components and services.
4. Do not introduce unnecessary dependencies.
5. Keep components focused and maintainable.
6. Follow the existing naming conventions.
7. Do not modify unrelated files.
8. Before making changes, explain the proposed approach.
9. After implementation, summarize modified files and explain how to verify the changes.
10. Preserve existing functionality.

## Project overview

This is an Angular 21 standalone-component application for creating, editing, filtering, and deleting tasks.

- Package manager: npm
- UI framework: Angular with OnPush change detection
- State: signal-based `TaskStore`
- HTTP: `HttpClient` wrapped by `TaskApiService`
- Backend: mock HTTP interceptor backed by `localStorage`
- Tests: Angular CLI/Vitest with jsdom
- Styling: global `src/styles.scss` plus component-local SCSS

## Repository structure

- `src/main.ts` bootstraps the application.
- `src/app/app.config.ts` configures the router and HTTP providers.
- `src/app/app.routes.ts` contains root routes.
- `src/app/core/` contains app-wide models, API access, notifications, and utilities.
- `src/app/features/tasks/` contains task pages, components, routes, and state.
- `src/app/shared/` contains reusable UI components and shared pages.
- `src/app/testing/` contains test fixtures.

Keep this feature-first structure. Put framework-independent task behavior in `core/`; put task UI and state in `features/tasks/`; put reusable UI with no task-specific knowledge in `shared/`.

## Development commands

- Install: `npm install`
- Start: `npm start`
- Build: `npm run build`
- Test once: `npm test`
- Watch tests: `npm run test:watch`

When running Angular CLI commands, use the npm scripts. The scripts explicitly invoke the local Angular CLI through Node to support the repository's Windows setup.

## Architecture conventions

- Use standalone components and route-level lazy loading.
- Use typed Angular `input()`, `output()`, and `signal()` APIs.
- Preserve OnPush/change-detection and zoneless-compatible patterns.
- Inject services with `inject()` rather than constructor injection.
- Keep components as presentational where possible:
  - Pages coordinate routing and call `TaskStore` methods.
  - Child components receive data through `input()` and emit actions through `output()`.
  - Components outside the state layer should not inject `HttpClient`.
- `TaskStore` is the single source of truth for task data and task UI state.
- `TaskApiService` is the only task-related place that calls `HttpClient`.
- Keep HTTP and mutation logic out of presentational components.

## State and data flow

Follow this flow:

`Component/Page -> TaskStore -> TaskApiService -> HttpClient -> Backend`

For task UI:

`TaskStore` signals/computed values -> presentational component inputs -> component outputs -> page/store methods

When modifying state:

- Replace state values immutably.
- Do not mutate arrays or objects already stored in a signal.
- Use `computed()` for derived values such as filtered tasks and statistics.
- Preserve loading, saving, loaded, and error state behavior.

Create/update operations should remain cold observables and should be subscribed to by their calling pages. Delete is intentionally store-owned and optimistic; preserve rollback behavior for failed deletes.

## Task model

Task types are defined in `src/app/core/models/task.model.ts`.

- `TaskStatus`: `todo`, `in-progress`, `completed`
- `TaskPriority`: `low`, `medium`, `high`
- A task is overdue when it is not completed and `dueDate` is earlier than today's ISO date.
- Use the derived `TASK_STATUSES` and `TASK_PRIORITIES` arrays and their label maps for options and display text.
- Due dates are ISO `YYYY-MM-DD` strings.

Do not introduce `any`. Preserve strict TypeScript and strict Angular template typing.

## Search and filtering

- Keep filter state in `TaskStore`.
- Keep filter controls in `TaskFiltersComponent`.
- Keep pure filtering logic in `filterTasks()` in `src/app/core/utils/task.utils.ts`.
- Search by title, not description.
- Trim and lowercase the search term.
- Debounce search input changes.
- Status and priority filters use `all` to disable filtering.
- Filters should remain in the store when navigating away from the Tasks page unless there is an intentional URL/query-param change.

## Forms and validation

- Use typed reactive forms and `NonNullableFormBuilder`.
- Use `TaskFormComponent` for both create and edit flows.
- Preserve the existing title rules:
  - required
  - not whitespace-only
  - at least 3 trimmed characters
- Description is optional and has a maximum of 500 characters.
- Status, priority, and due date are required.
- Emit a complete `CreateTaskDto` only after validation succeeds.
- Trim the title and description before submission.

## HTTP and mock backend

- `TaskApiService` owns task endpoints and URL construction.
- Encode route IDs when constructing task URLs.
- The mock interceptor is intended to behave like a REST backend.
- Preserve support for:
  - `GET /api/tasks`
  - `GET /api/tasks/:id`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Preserve request validation and `localStorage` persistence unless explicitly asked to change them.
- Removing the mock interceptor from `app.config.ts` should allow switching to a real API without changing components or the store.

## Errors and notifications

- Inline load errors should contain a retry action.
- Mutation errors should generally use `NotificationService` toasts.
- Successful create, update, and delete actions should show success toasts.
- Convert unknown HTTP errors through `toErrorMessage()` rather than exposing raw errors.
- Do not add broad catches or silent fallback behavior.

## Routing

- `/` redirects to `/tasks`.
- `/tasks` displays the task list.
- `/tasks/new` creates a task.
- `/tasks/:id/edit` edits a task.
- Unknown routes use the not-found page.
- Route parameter binding uses `withComponentInputBinding()`.
- Load feature routes lazily rather than importing every feature eagerly.

## Accessibility and UI

- Keep controls visibly and programmatically labelled.
- Preserve `aria-invalid` and `aria-describedby` for invalid form fields.
- Preserve table caption and column semantics.
- Use `@for` with `track` based on stable IDs.
- Keep live regions for loading/result/error feedback and toasts.
- Preserve the delete confirmation dialog's Escape behavior and Cancel focus.
- Preserve responsive behavior.

## Testing

Add or update focused tests for behavior changes:

- State/store behavior in `task.store.spec.ts`
- Mock backend behavior in `mock-backend.interceptor.spec.ts`
- Form validation in `task-form.component.spec.ts`
- Task list integration behavior in `task-list-page.component.spec.ts`
- Pure filtering, overdue, and statistics behavior in `task.utils.spec.ts`

When changing task behavior:

- Run `npm test`.
- Run `npm run build` for production integration or template verification.
- Test both success and failure cases where relevant.
- Verify loading, empty, filtered-empty, error, and retry states.
- Verify route parameter and deep-link behavior.

Do not modify unrelated files or generated build output.
