## 1. Project bootstrap and core configuration

- [x] 1.1 Scaffold the TanStack Start + TypeScript frontend project structure in this repository, standardize it on Bun, and add the required runtime/dev dependencies for Mantine, TanStack Query, Valibot, routing, and forms/API utilities.
- [x] 1.2 Wire the root application bootstrap so Mantine providers, the TanStack Query client, and the router context are available throughout the app.
- [x] 1.3 Configure development proxying for `/api/*` requests so `/api/auth/*` is forwarded to `../rust-hack-template`'s `/auth/*` endpoints with cookie-based auth support.
- [x] 1.4 Configure ESLint and Prettier, including package scripts and baseline rules/settings appropriate for the generated TypeScript + React template.
- [x] 1.5 Add the minimal starter route structure for a public home page, auth pages, and a protected example page.

## 2. Auth and session implementation

- [x] 2.1 Create typed frontend auth/session API helpers for register, login, logout, and current-user requests against `/api/auth/*`.
- [x] 2.2 Implement the TanStack Query session resource and auth mutations using the `mm-frontend` invalidation/refresh pattern.
- [x] 2.3 Add route-guard logic that redirects unauthenticated users away from protected routes and redirects authenticated users away from login/register routes.
- [x] 2.4 Build Mantine-based registration and login forms that match the current Rust backend contract and surface client/server errors.
- [x] 2.5 Add auth-aware header behavior, including signed-in navigation state and a working logout action that clears the in-memory session state.

## 3. Theme preference and no-flash rendering

- [x] 3.1 Implement a color-scheme preference model with `light`, `dark`, and `system` options plus persistent browser storage for the selected preference.
- [x] 3.2 Add pre-hydration theme resolution so the initial document paint uses the resolved color scheme before the main React app hydrates.
- [x] 3.3 Build a Mantine-based theme control in the starter shell and ensure the UI responds correctly to explicit and system-controlled theme changes.

## 4. Template verification and polish

- [x] 4.1 Verify the full auth flow against `../rust-hack-template`: register, login, cold reload with session restoration, protected-route access, and logout.
- [x] 4.2 Verify theme persistence and confirm there is no visible light/dark flicker on hard reloads for stored and system-resolved preferences.
- [x] 4.3 Verify the lint and format scripts run successfully against the generated template.
- [x] 4.4 Clean up project scripts/configuration as needed so the template starts, builds, lints, formats, and serves as a usable hackathon baseline.
