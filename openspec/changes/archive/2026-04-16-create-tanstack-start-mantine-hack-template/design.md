## Context

This repository is currently a blank frontend template workspace with OpenSpec configuration only. The requested change turns it into a reusable hackathon-ready React starter built on TanStack Start, TypeScript 6, Bun, Mantine, TanStack Query, and Valibot.

There are two important implementation references:

1. `../rust-hack-template` is the backend contract the starter must work with during local development. Its current auth API is cookie-based and exposes:
   - `POST /auth/register`
   - `POST /auth/login`
   - `POST /auth/logout`
   - `GET /auth/me`
2. `~/Code/mm-frontend` contains a working frontend pattern for auth/session handling using TanStack Query and route guards. The most reusable ideas are:
   - a single session query as the source of truth,
   - login/logout mutations invalidating the session query,
   - route protection through TanStack Router `beforeLoad` checks.

The template must also solve a UX-sensitive theming requirement: system theme is the default, explicit user selection must persist, and the very first paint must already use the resolved color scheme so the page does not flash from light to dark after hydration.

## Goals / Non-Goals

**Goals:**
- Provide a TanStack Start + TypeScript 6 starter template suitable for hackathon teams.
- Use Mantine as the core UI library and integrate its providers correctly.
- Use TanStack Query for server state and session bootstrapping.
- Use Valibot for runtime validation of auth forms, API payloads, and response parsing.
- Ship ESLint and Prettier configuration so the starter has working lint/format workflows from day one.
- Standardize the template on Bun as the package manager and lockfile format.
- Support register, login, logout, and current-session restoration against `../rust-hack-template`.
- Keep session state in memory on the frontend while relying on the backend cookie as the persistence mechanism.
- Configure local frontend-to-backend proxying through Vite so the browser talks to same-origin `/api/*` paths during development.
- Support light, dark, and system color-scheme behavior with persisted preference and no initial flicker.
- Include a minimal but complete shell: home page, auth pages, protected example route, header controls, and logout action.

**Non-Goals:**
- Implement profile editing, password reset, email verification, or OAuth.
- Expand the Rust backend contract beyond what already exists.
- Persist frontend session data in localStorage or another client-side durable store.
- Build a full production design system beyond a starter-quality layout and auth flow.
- Add role-based access control or multi-tenant auth rules.

## Decisions

### 1. Build the template around TanStack Start with a provider-first app shell
The frontend SHALL use TanStack Start as the application foundation, with TypeScript 6 enabled from the start. Global providers will be wired near the application root:
- Mantine provider(s) for styling, theme, and color-scheme management
- TanStack Query `QueryClientProvider`
- TanStack Router integration through TanStack Start's route tree

**Rationale:** This matches the requested stack and gives a modern default for routing, data loading, and future SSR-ready evolution.

**Alternatives considered:**
- Plain Vite + React Router: simpler, but does not satisfy the TanStack Start requirement.
- Next.js/Remix: capable, but mismatched with the requested ecosystem.

### 2. Use a frontend-local `/api` namespace and Vite proxy rewrite to the Rust backend
Frontend API calls will target same-origin paths such as `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, and `/api/auth/me`. In development, Vite will proxy `/api/*` to the Rust backend in `../rust-hack-template`, rewriting `/api/auth/*` to `/auth/*` and forwarding cookies.

**Rationale:** Same-origin browser requests avoid CORS configuration during local development, keep frontend code environment-agnostic, and make cookie-based auth work predictably.

**Alternatives considered:**
- Calling `http://127.0.0.1:8050/auth/*` directly from the browser: requires CORS handling and creates environment-specific client code.
- Using only an environment variable without proxying: still leaves cookie/CORS issues unsolved in dev.

### 3. Model the authenticated user as a single TanStack Query session resource
The frontend will follow the `mm-frontend` pattern: one query represents the current session and returns either an authenticated user or an unauthenticated state. Login and logout mutations invalidate or refresh this query. Route guards will use the query client to ensure session data before allowing navigation.

The session result will live only in memory in the query cache. Persistence across reloads is provided by the backend session cookie; on startup the app re-fetches `/api/auth/me` to reconstruct in-memory state.

**Rationale:** This provides a single source of truth, avoids ad-hoc global auth stores, and aligns with the existing reference implementation.

**Alternatives considered:**
- Storing the user/session payload in localStorage: violates the requested in-memory-only session model and creates stale-session risks.
- Custom React context without TanStack Query: duplicates state-management concerns already solved by the stack.

### 4. Adapt auth forms to the actual Rust backend contract, not the richer reference app contract
`mm-frontend` demonstrates the session/query orchestration well, but its registration shape is richer than `../rust-hack-template`. The starter will therefore reuse the orchestration pattern while adapting the forms and API typing to the backend's current request/response contract.

Expected baseline behavior:
- Registration submits `email` and `password` (with optional client-side `confirmPassword` only for UX validation)
- Login submits `email` and `password`
- Logout performs a POST and clears in-memory session state afterward

**Rationale:** The template must work out of the box with the adjacent backend template.

**Alternatives considered:**
- Matching the `mm-frontend` registration fields exactly: would fail against the current backend contract.
- Auto-login immediately after registration: possible, but adds extra branching; redirecting to login is simpler and clearer for a starter.

### 5. Use Mantine color-scheme infrastructure plus pre-hydration theme resolution
The template will use Mantine's theming/color-scheme support, but with explicit control over preference resolution:
- If the user saved `light` or `dark`, that value wins.
- If the user saved `system` or no preference exists, the app resolves from `prefers-color-scheme`.
- A pre-hydration script in the document head will set the initial color-scheme marker before the main app renders.

The persisted preference will be stored in browser storage under a stable key. The UI control will expose three states: `system`, `light`, and `dark`.

**Rationale:** Mantine already supports this problem space, and a head script is the safest way to eliminate first-paint mismatch.

**Alternatives considered:**
- Resolving theme only after React mounts: causes the exact flash the user wants to avoid.
- Supporting only a binary toggle: cannot express “follow system” once the user has overridden the theme before.

### 6. Standardize the template on Bun and Valibot
The template will use Bun for dependency installation and script execution, with `bun.lock` committed as the source of truth for dependency resolution. Runtime validation will use Valibot instead of Zod to keep the validation layer small, explicit, and aligned with the existing `mm-frontend` reference patterns.

**Rationale:** Bun gives the template a fast default package manager/runtime workflow, and Valibot aligns better with the existing reference code while keeping schema parsing lightweight.

**Alternatives considered:**
- Staying on npm: workable, but slower and less consistent with the desired Bun-based template workflow.
- Using Zod for validation: common, but unnecessary here given the Valibot precedent in the reference app and the lighter surface area needed for this starter.

### 7. Ship baseline ESLint and Prettier tooling with the template
The template will include ESLint and Prettier configuration files plus package scripts for common workflows such as linting and formatting. The initial configuration will target the generated TypeScript and React codebase without introducing excessive rule complexity.

**Rationale:** Hackathon teams benefit from having consistent formatting and basic code-quality checks available immediately, without spending setup time on local conventions.

**Alternatives considered:**
- Omitting lint/format tooling entirely: faster initial scaffold, but pushes repetitive setup work onto every team.
- Adding a highly opinionated or strict enterprise rule set: useful in some products, but heavier than necessary for a starter template.

### 8. Include a minimal but complete starter shell with auth-aware header behavior
The starter will ship with a small but coherent shell:
- public landing/home route
- login route
- registration route
- protected example route
- header with brand, theme control, auth-aware navigation, and logout action for authenticated users

**Rationale:** A starter template is more useful when it demonstrates the intended architecture end-to-end instead of only shipping isolated utilities.

**Alternatives considered:**
- Shipping utilities without pages: less opinionated, but weaker as a template.
- Shipping a larger dashboard UI: too much surface area for a base starter.

## Risks / Trade-offs

- **[TanStack Start + Vite proxy integration details may differ from plain Vite]** → Mitigation: keep proxy configuration isolated in the app config layer and validate it with live auth requests against the Rust backend.
- **[Backend contract may evolve independently]** → Mitigation: centralize API client functions and typed DTOs so endpoint or payload changes stay localized.
- **[Cookie-based auth can fail silently if credentials are omitted]** → Mitigation: enforce `credentials: 'include'`/equivalent in all session-related client calls and verify with integration smoke tests.
- **[Theme no-flash behavior is sensitive to script ordering]** → Mitigation: place the theme bootstrap script in the earliest document/head position and keep its logic dependency-free.
- **[Starter complexity may grow if too many conveniences are added]** → Mitigation: keep the initial shell deliberately small and defer advanced UX concerns to future changes.

## Migration Plan

1. Scaffold the TanStack Start + TypeScript project structure in this repository.
2. Add and configure Mantine, TanStack Query, and the app-level provider composition.
3. Add Vite dev proxy settings for the adjacent Rust backend.
4. Implement API helpers, typed auth/session models, and TanStack Query hooks.
5. Create login, registration, and protected example routes plus route-guard wiring.
6. Add theme preference storage, no-flash bootstrap script, and header controls.
7. Validate the full flow against `../rust-hack-template`: register, login, restore session on reload, access protected route, logout, and theme persistence across hard reloads.
8. Validate ESLint and Prettier scripts against the generated template and keep the initial codebase clean.
9. Validate Bun-based install/typecheck/build workflows and keep the dependency graph pinned with committed versions and lockfile.

Rollback is straightforward because this repository is a template workspace: revert the generated frontend files and dependency changes if the approach needs to be replaced.

## Open Questions

- No blocking open questions for the proposal phase.
- If the Rust backend later expands its user profile fields, the registration form can be extended in a follow-up change without altering the overall architecture.
