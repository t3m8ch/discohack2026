## Context

The repository is a monorepo with separate backend and frontend applications, but OpenSpec content is currently split across three locations:

- `openspec/` at the repository root, which only contains the base scaffold
- `backend/openspec/`, which contains backend specs and archived backend changes
- `frontend/openspec/`, which contains frontend specs and archived frontend changes

This layout makes the root workspace incomplete and forces contributors to know which subproject owns a given spec before they can inspect requirements or create new changes. It also makes cross-cutting work awkward because there is no single authoritative OpenSpec workspace for the repository.

The change is mostly a content migration and governance update, but it touches historical artifacts and contributor workflow, so it benefits from an explicit design.

## Goals / Non-Goals

**Goals:**
- Establish `openspec/` at the repository root as the only authoritative OpenSpec workspace.
- Preserve all existing capability specs from backend and frontend workspaces.
- Preserve archived change history so previously implemented changes remain discoverable.
- Remove nested OpenSpec workspaces after migration so future work cannot accidentally diverge again.
- Clarify repository-level convention that all future OpenSpec changes, specs, and archives live under the root workspace.

**Non-Goals:**
- Rewriting the substance of existing backend or frontend requirements.
- Renaming capabilities unless required to resolve a concrete collision.
- Changing backend or frontend runtime code as part of this migration.
- Reconstructing missing historical metadata beyond what already exists in the current workspaces.

## Decisions

### 1. Make the root `openspec/` directory the single source of truth
All active and archived OpenSpec artifacts will live under the repository root. The nested `backend/openspec` and `frontend/openspec` directories will be removed after migration.

**Rationale:** Contributors should have one predictable place to read specs and create changes. This also matches the repository layout better because requirements can span both applications.

**Alternatives considered:**
- Keep separate per-app workspaces and document them better: rejected because it preserves fragmentation.
- Keep per-app workspaces plus a root index: rejected because it still creates multiple authorities.

### 2. Migrate existing capability specs into `openspec/specs/` with current capability names
Existing spec folders from backend and frontend will be copied into the root `openspec/specs/` directory without rewriting requirement content. Current names will be preserved as long as there are no collisions.

**Rationale:** Preserving names keeps the migration low-risk and avoids unnecessary spec churn. The current backend and frontend capability names are already distinct.

**Alternatives considered:**
- Prefix every capability with `backend-` or `frontend-`: rejected because it creates unnecessary renames and breaks continuity.
- Collapse multiple specs into a smaller number of broader specs: rejected because it changes scope instead of just consolidating location.

### 3. Migrate archived changes into `openspec/changes/archive/` and preserve their original contents
Archived change directories from backend and frontend will be moved into the root archive. The implementation should preserve each archived change directory structure and contents.

**Rationale:** Historical proposals, designs, and tasks are part of the repository's planning record and should remain available after consolidation.

**Alternatives considered:**
- Keep old archives in place while moving only current specs: rejected because the old nested workspaces would still exist.
- Copy only proposal summaries and discard full archive content: rejected because it loses traceability.

### 4. Treat name collisions as an explicit migration check
The migration should verify that spec folder names and archived change directory names do not collide before moving content. If a collision is found, the migration should stop and require an explicit rename strategy.

**Rationale:** Silent overwrites would destroy planning history. Failing loudly is safer than auto-merging unrelated artifacts.

**Alternatives considered:**
- Overwrite existing content if paths match: rejected because it risks data loss.
- Automatically append prefixes/suffixes on collision: rejected because it hides a semantic decision inside the migration.

### 5. Update root workspace guidance to reflect monorepo ownership
The root OpenSpec configuration and any relevant contributor-facing docs should reflect that the workspace covers both backend and frontend work.

**Rationale:** Consolidation is not complete unless the repository communicates the new convention clearly enough to prevent future re-fragmentation.

**Alternatives considered:**
- Rely only on directory removal: rejected because conventions are easy to forget without documentation.

## Risks / Trade-offs

- **[Risk] Historical artifacts could be lost during migration** → Mitigation: verify source and destination paths before removal, migrate archives explicitly, and use git-tracked moves/copies.
- **[Risk] Path collisions could overwrite specs or archives** → Mitigation: add a pre-migration collision check and stop on conflicts.
- **[Risk] Contributors may keep using old paths from habit** → Mitigation: remove nested workspaces and add root-level guidance.
- **[Trade-off] Preserving capability names keeps continuity but does not encode backend/frontend ownership in names** → Mitigation: rely on spec content and future naming discipline; only introduce prefixes if a real collision appears.

## Migration Plan

1. Inspect `backend/openspec` and `frontend/openspec` for specs and archived changes.
2. Copy or move their spec directories into `openspec/specs/` after verifying there are no name conflicts.
3. Copy or move their archived change directories into `openspec/changes/archive/` after verifying there are no directory conflicts.
4. Update root OpenSpec guidance/configuration to state that the root workspace is authoritative for the entire repository.
5. Validate that the expected files now exist under `openspec/`.
6. Remove `backend/openspec` and `frontend/openspec` once migration is confirmed.
7. Run OpenSpec validation/status commands against the root workspace.

**Rollback:** Restore the previous layout with git if validation fails or if migrated content is incomplete.

## Open Questions

- None at the moment; the migration can proceed as long as no name collisions are discovered.
