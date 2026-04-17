# react-hack-template

Хакатонный frontend-шаблон на:

- Bun
- TanStack Start
- TypeScript 6
- Mantine
- TanStack Query
- Valibot

Из коробки уже настроены:

- логин, регистрация, logout
- восстановление сессии через backend cookie
- protected/public routes
- Vite proxy на Rust backend
- светлая / тёмная / системная тема
- сохранение выбора темы
- отсутствие theme flicker при cold load через `ColorSchemeScript`
- ESLint + Prettier

## Backend contract

Шаблон ожидает соседний backend из `../rust-hack-template`.

Используемые endpoint'ы:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

Во frontend запросы идут через `/api/auth/*`, а Vite в dev-прокси переписывает их в `/auth/*`.

## Быстрый старт

### 1. Поднять backend

В соседнем проекте:

```bash
cd ../rust-hack-template
just dev
cargo run
```

По умолчанию backend будет доступен на `http://127.0.0.1:8050`.

### 2. Запустить frontend

```bash
bun install
bun dev
```

Frontend стартует на `http://localhost:3000`.

## Скрипты

```bash
bun dev
bun run build
bun run preview
bun run typecheck
bun run lint
bun run format
bun run format:write
```

## Проверка auth flow

Базовый сценарий уже реализован:

1. открыть `/register`
2. создать пользователя
3. открыть `/login`
4. войти
5. перейти на `/app`
6. перезагрузить страницу и убедиться, что сессия восстановилась
7. нажать `Выйти`

## Проверка темы

В шапке есть переключатель темы:

- `Система`
- `Светлая`
- `Тёмная`

Выбор сохраняется в `localStorage` по ключу:

```text
react-hack-template-color-scheme
```

Начальная тема применяется до гидрации через Mantine `ColorSchemeScript`, поэтому страница не должна сначала рисоваться в одной теме, а потом переключаться в другую.

## Структура

```text
src/
  auth/          auth API, schemas, queries, forms
  header/        header feature and theme control
  routing/       routing-specific UI helpers
  lib/           shared low-level utilities
  routes/        file-based routes for TanStack Start
```
