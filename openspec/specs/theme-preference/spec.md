# theme-preference Specification

## Purpose
TBD - created by archiving change create-tanstack-start-mantine-hack-template. Update Purpose after archive.
## Requirements
### Requirement: System color scheme is the default
The system SHALL use the operating system's preferred color scheme when the user has not saved an explicit theme preference. This default behavior SHALL apply on the first visit and any later visit where the stored preference is `system` or absent.

#### Scenario: First visit follows system dark mode
- **WHEN** a visitor has no saved theme preference and the operating system prefers dark mode
- **THEN** the application renders using the dark color scheme

#### Scenario: First visit follows system light mode
- **WHEN** a visitor has no saved theme preference and the operating system prefers light mode
- **THEN** the application renders using the light color scheme

### Requirement: User can explicitly choose and persist theme preference
The system SHALL provide a theme control that lets the user choose `light`, `dark`, or `system`. The selected preference SHALL be persisted and reused on subsequent full page loads.

#### Scenario: Explicit dark mode preference persists
- **WHEN** a visitor explicitly selects the dark theme
- **THEN** the application saves the dark preference
- **THEN** a later full page load renders using the dark theme regardless of the current system preference

#### Scenario: User returns to system-controlled preference
- **WHEN** a visitor selects the system theme option after previously choosing a fixed theme
- **THEN** the application saves the system preference
- **THEN** later page loads resolve the theme from the current operating system preference

### Requirement: First paint uses the resolved theme without flicker
The system SHALL resolve and apply the active color scheme before the main React application hydrates. A cold page load SHALL NOT first paint in one theme and then visibly switch to another after client-side JavaScript finishes loading.

#### Scenario: Stored dark preference avoids light-to-dark flash
- **WHEN** a visitor previously saved the dark theme and then loads the page from scratch
- **THEN** the initial document paint uses the dark theme before the main app hydrates
- **THEN** the page does not visibly flash from light mode to dark mode

#### Scenario: System-resolved dark mode avoids light-to-dark flash
- **WHEN** a visitor has no explicit saved preference and the operating system prefers dark mode
- **THEN** the initial document paint uses the dark theme before the main app hydrates
- **THEN** the page does not visibly flash from light mode to dark mode

