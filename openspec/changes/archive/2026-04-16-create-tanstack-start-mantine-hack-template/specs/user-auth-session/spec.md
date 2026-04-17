## ADDED Requirements

### Requirement: User registration against the Rust backend
The system SHALL provide a registration form that submits the fields required by `../rust-hack-template` to the proxied registration endpoint. The registration flow SHALL validate inputs on the client, surface backend failures, and transition the user to the login flow after a successful registration.

#### Scenario: Successful registration
- **WHEN** a visitor submits a valid registration form
- **THEN** the frontend sends the request to `/api/auth/register`
- **THEN** the backend creates the account successfully
- **THEN** the frontend transitions the visitor to the login route

### Requirement: User login creates an authenticated in-memory session
The system SHALL provide a login form that authenticates the user through the proxied backend and then refreshes the current-session query. After a successful login, the frontend SHALL treat the authenticated user returned by the session query as the single source of truth for auth-aware UI and routing.

#### Scenario: Successful login
- **WHEN** a visitor submits valid login credentials to `/api/auth/login`
- **THEN** the backend sets the session cookie
- **THEN** the frontend refreshes the current-session query
- **THEN** the application renders authenticated navigation and protected content access

### Requirement: Session bootstrap on application startup
The system SHALL reconstruct frontend auth state on startup by requesting the current user from the proxied backend using the browser's existing session cookie. The resulting session state SHALL be held in memory and SHALL NOT require localStorage persistence of the user payload.

#### Scenario: Existing backend session is restored after reload
- **WHEN** a browser already has a valid backend session cookie and the user loads the frontend from scratch
- **THEN** the frontend requests `/api/auth/me`
- **THEN** the current-session query resolves to an authenticated state
- **THEN** the application renders as signed in without requiring the user to log in again

#### Scenario: No backend session yields unauthenticated state
- **WHEN** a browser has no valid backend session cookie and the user loads the frontend from scratch
- **THEN** the frontend requests `/api/auth/me`
- **THEN** the current-session query resolves to an unauthenticated state
- **THEN** protected routes remain inaccessible until login succeeds

### Requirement: Route access control follows session state
The system SHALL protect authenticated routes by checking the current-session query before navigation completes. The system SHALL also prevent authenticated users from staying on login and registration routes when an active session already exists.

#### Scenario: Unauthenticated user opens a protected route
- **WHEN** an unauthenticated visitor navigates to a protected route
- **THEN** the router blocks access to the protected content
- **THEN** the visitor is redirected to the login route

#### Scenario: Authenticated user opens an auth-only route
- **WHEN** an authenticated user navigates to the login or registration route
- **THEN** the router redirects the user away from the auth-only route to a non-auth route

### Requirement: Logout clears the active frontend session
The system SHALL provide a logout action that calls the proxied backend logout endpoint and invalidates the current-session query afterward. After logout completes, auth-aware UI SHALL update to the unauthenticated state.

#### Scenario: Successful logout
- **WHEN** an authenticated user activates the logout action
- **THEN** the frontend sends a request to `/api/auth/logout`
- **THEN** the backend clears the session cookie
- **THEN** the frontend invalidates the current-session query
- **THEN** authenticated UI and protected-route access are removed
