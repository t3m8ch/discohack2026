## ADDED Requirements

### Requirement: Starter stack and providers
The template SHALL provide a TanStack Start application written in TypeScript 6 and managed with Bun. The template SHALL configure Mantine, TanStack Query, and Valibot as first-class runtime dependencies. The application SHALL initialize the Mantine provider tree, the TanStack Query client, and the TanStack router context in the default app bootstrap path.

#### Scenario: Application boots with required providers
- **WHEN** a developer installs dependencies with Bun and starts the frontend application
- **THEN** the app renders successfully with Mantine styling available, TanStack Query available to routes and components, and the Bun-based workflow works with the committed lockfile

### Requirement: Development API proxying to the Rust backend
The template SHALL expose a frontend-local `/api` namespace for backend requests during development. Requests sent to `/api/auth/*` SHALL be proxied through Vite to the backend located in `../rust-hack-template` and rewritten to the backend's `/auth/*` endpoints while preserving cookie-based session behavior.

#### Scenario: Auth request is forwarded through the dev proxy
- **WHEN** the frontend sends a request to `/api/auth/login` in local development
- **THEN** Vite forwards the request to the Rust backend's `/auth/login` endpoint and the browser can participate in the cookie-based session flow without additional CORS setup

### Requirement: Starter includes linting and formatting tooling
The template SHALL include ESLint and Prettier configuration suitable for the default TypeScript and React codebase. The template SHALL expose package scripts for linting and formatting so teams can enforce a consistent code style from the start.

#### Scenario: Developer runs lint and format commands
- **WHEN** a developer runs the template's lint and format scripts
- **THEN** ESLint checks the frontend source code and Prettier formats the project files using the committed template configuration

### Requirement: Starter shell demonstrates public and protected navigation
The template SHALL include a minimal application shell with a public home route, login route, registration route, and at least one protected route. The header/navigation area SHALL expose authentication actions and theme controls appropriate to the current session state.

#### Scenario: Anonymous user sees starter navigation
- **WHEN** an unauthenticated visitor opens the application
- **THEN** the visitor can reach the home, login, and registration routes from the starter shell

#### Scenario: Authenticated user sees protected navigation
- **WHEN** an authenticated visitor opens the application
- **THEN** the starter shell exposes navigation to the protected area and a logout action
