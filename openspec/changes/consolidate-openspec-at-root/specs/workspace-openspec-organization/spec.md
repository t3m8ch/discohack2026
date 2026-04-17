## ADDED Requirements

### Requirement: Repository OpenSpec workspace SHALL live at the repository root
The repository SHALL use `openspec/` at the repository root as the single authoritative OpenSpec workspace for both backend and frontend planning artifacts. New changes, active artifacts, and future specs SHALL be created in the root workspace instead of in application-specific subdirectories.

#### Scenario: Contributor creates a new change
- **WHEN** a contributor starts a new OpenSpec change for backend, frontend, or cross-cutting work
- **THEN** the change is created under the root `openspec/changes/` directory
- **THEN** the contributor does not need a separate backend or frontend OpenSpec workspace

### Requirement: Existing capability specs SHALL be consolidated into the root workspace
The repository SHALL store the currently defined backend and frontend capability specs under `openspec/specs/` in the root workspace, preserving the requirement content of each migrated capability.

#### Scenario: Migrated capability specs are discoverable from the root workspace
- **WHEN** a contributor inspects the root `openspec/specs/` directory after the migration
- **THEN** the capability specs that previously lived in `backend/openspec/specs/` and `frontend/openspec/specs/` are present there
- **THEN** their requirement content remains available from the migrated root copies

### Requirement: Archived change history SHALL be preserved in the root workspace
The repository SHALL preserve archived backend and frontend OpenSpec changes by storing them under `openspec/changes/archive/` in the root workspace.

#### Scenario: Contributor reviews historical change artifacts
- **WHEN** a contributor inspects `openspec/changes/archive/` after the migration
- **THEN** the archived backend and frontend change directories are present in the root archive
- **THEN** their proposal, design, tasks, and spec artifacts remain readable

### Requirement: Nested OpenSpec workspaces SHALL be removed after successful migration
After specs and archived change history are migrated into the root workspace, the repository SHALL no longer keep `backend/openspec/` or `frontend/openspec/` as standalone OpenSpec workspaces.

#### Scenario: Repository layout after consolidation
- **WHEN** the migration is complete
- **THEN** `backend/openspec/` does not exist as a separate workspace
- **THEN** `frontend/openspec/` does not exist as a separate workspace
- **THEN** the root `openspec/` directory is the only OpenSpec workspace in the repository

### Requirement: Consolidation SHALL fail instead of overwriting conflicting artifacts
If a migrated spec directory or archived change directory would conflict with an existing path in the root workspace, the consolidation process SHALL stop before overwriting the existing artifact and SHALL require an explicit conflict resolution step.

#### Scenario: Name collision is detected during migration
- **WHEN** a backend or frontend spec/archive path matches an existing destination path in the root workspace
- **THEN** the migration stops before overwriting files
- **THEN** the conflict is surfaced for explicit resolution
