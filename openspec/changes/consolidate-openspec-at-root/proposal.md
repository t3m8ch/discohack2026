## Why

The repository currently keeps separate OpenSpec workspaces in `backend/openspec` and `frontend/openspec`, which fragments change planning, makes it harder to discover the authoritative specs, and complicates cross-cutting changes that span both applications. We need one shared OpenSpec workspace at the repository root so the backend and frontend can be planned from a single source of truth.

## What Changes

- Consolidate OpenSpec ownership into the root `openspec/` directory.
- Move existing backend and frontend spec documents into the root workspace while preserving their capability definitions.
- Move archived change history from the backend and frontend workspaces into the root workspace so planning history remains discoverable.
- Remove the nested `backend/openspec` and `frontend/openspec` workspaces after their contents are migrated.
- Establish repository-level conventions for where new changes, specs, and archives must live.

## Capabilities

### New Capabilities
- `workspace-openspec-organization`: Defines the repository-level OpenSpec layout, including a single root workspace, migration of existing specs and archived changes into it, and removal of nested workspaces.

### Modified Capabilities
- None.

## Impact

- Affects `openspec/`, `backend/openspec/`, and `frontend/openspec/`.
- Changes documentation/discovery for backend and frontend requirements by making the root workspace authoritative.
- Preserves archived OpenSpec history under `openspec/changes/archive/` instead of per-app workspaces.
- May require updating contributor guidance or scripts that assume per-app OpenSpec directories.
