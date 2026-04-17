## Why

We need a reusable frontend starter for hackathons so teams can begin with routing, data fetching, UI primitives, auth, and theming already wired instead of rebuilding the same setup from scratch. This change also needs to integrate cleanly with the existing Rust backend template in `../rust-hack-template`, including cookie-based session auth and a polished no-flash theme experience.

## What Changes

- Scaffold a TanStack Start frontend template using TypeScript 6 and Bun.
- Add Mantine as the primary component library and wire global providers.
- Add TanStack Query for server state, including session bootstrap and cache invalidation.
- Use Valibot for runtime validation and typed auth/session parsing.
- Configure ESLint and Prettier so the template ships with linting and formatting out of the box.
- Configure Vite development proxying from the frontend to the backend in `../rust-hack-template` so auth requests work without CORS setup.
- Implement registration, login, current-session fetch, and logout flows against the Rust backend's cookie-based auth endpoints.
- Add protected/public route handling based on the current in-memory session state.
- Implement color-scheme support that:
  - follows the system preference by default,
  - lets the user explicitly choose light or dark,
  - persists the explicit choice,
  - avoids initial theme flicker on a cold page load.
- Provide a minimal application shell suitable for a hackathon starter template.

## Capabilities

### New Capabilities
- `hackathon-frontend-template`: Scaffold a TanStack Start + TypeScript frontend template with Bun, Mantine, TanStack Router/Query, provider setup, ESLint/Prettier tooling, and Vite proxy integration for local backend development.
- `user-auth-session`: Support register, login, logout, and current-session flows against the Rust backend, with TanStack Query-backed session bootstrap and route protection.
- `theme-preference`: Support system-aware theming with a persisted user override and no-flash initial rendering.

### Modified Capabilities
- None.

## Impact

- Affects the entire frontend template structure in this repository.
- Introduces frontend dependencies for TanStack Start, Mantine, TanStack Query, Valibot, ESLint, Prettier, and supporting frontend utilities.
- Standardizes the template on Bun with a committed `bun.lock` lockfile.
- Establishes a local development contract with `../rust-hack-template` and its auth endpoints (`/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`) using cookie-based sessions.
- Requires app bootstrap logic for providers, session loading, route guards, and pre-hydration theme initialization.
