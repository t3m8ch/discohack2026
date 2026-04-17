## 1. Inventory and migration safety checks

- [x] 1.1 Enumerate all spec directories and archived change directories under `backend/openspec/` and `frontend/openspec/`.
- [x] 1.2 Compare the source directories against `openspec/specs/` and `openspec/changes/archive/` to confirm there are no path collisions before migrating files.
- [x] 1.3 Decide whether any root `openspec/config.yaml` context or contributor guidance needs to be updated to describe repository-wide ownership.

## 2. Migrate OpenSpec content into the root workspace

- [x] 2.1 Move or copy backend capability spec directories from `backend/openspec/specs/` into `openspec/specs/` and verify their contents match the originals.
- [x] 2.2 Move or copy frontend capability spec directories from `frontend/openspec/specs/` into `openspec/specs/` and verify their contents match the originals.
- [x] 2.3 Move or copy archived backend and frontend change directories into `openspec/changes/archive/` while preserving each archive directory structure and artifact files.

## 3. Remove nested workspaces and validate the new layout

- [x] 3.1 Update root OpenSpec guidance/configuration so contributors know the root workspace is authoritative for backend and frontend work.
- [x] 3.2 Remove `backend/openspec/` and `frontend/openspec/` after confirming all required specs and archived changes exist under the root workspace.
- [x] 3.3 Run OpenSpec status/validation commands from the repository root and verify the root `openspec/` workspace is the only remaining OpenSpec workspace.
