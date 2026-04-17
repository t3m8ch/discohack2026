# discohack2026

Монорепа с:

- `backend/` — Rust + Axum + PostgreSQL + SQLx
- `frontend/` — Bun + TanStack Start + Mantine
- `openspec/` — общий OpenSpec для всего проекта

## Что нужно

Перед запуском должны быть установлены:

- Rust
- Bun
- Docker / Docker Compose
- `just`

## Быстрый запуск

### 1. Поднять базу данных

```bash
cd backend
just dev
```

Postgres поднимется на:

```text
postgres://postgres:postgres@localhost:1311/postgres
```

### 2. Запустить backend

В отдельном терминале:

```bash
cd backend
cargo run
```

Backend будет доступен на:

```text
http://127.0.0.1:8050
```

При старте он сам применит миграции из `backend/migrations/`.

### 3. Запустить frontend

В ещё одном терминале:

```bash
cd frontend
bun install
bun dev
```

Frontend будет доступен на:

```text
http://localhost:3000
```

Frontend ходит в backend через dev proxy на `/api/*`.

## Проверка, что всё работает

1. Открой `http://localhost:3000`
2. Зарегистрируй пользователя на `/register`
3. Войди через `/login`
4. Проверь, что открывается защищённая часть приложения

## Полезные команды

### Backend

```bash
cd backend
cargo fmt
cargo check
cargo test
```

### Frontend

```bash
cd frontend
bun run typecheck
bun run lint
bun run build
```

### OpenSpec

```bash
openspec validate --all --strict --no-interactive
```
