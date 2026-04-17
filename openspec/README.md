# OpenSpec workspace

This repository uses a single shared OpenSpec workspace at the root:

- active changes: `openspec/changes/`
- archived changes: `openspec/changes/archive/`
- repository capabilities: `openspec/specs/`

## Scope

The root workspace is authoritative for the entire monorepo:

- backend work in `backend/`
- frontend work in `frontend/`
- cross-cutting changes that affect both applications

Do not create separate OpenSpec workspaces inside app directories.

## Working conventions

- Create new changes from the repository root so they land in `openspec/changes/`.
- Update or add capability specs only in `openspec/specs/`.
- Keep archived planning history in `openspec/changes/archive/`.
- When proposing a change, state whether it impacts backend, frontend, or both.
