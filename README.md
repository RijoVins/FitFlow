# FitFlow

FitFlow is a React/Vite fitness studio application with an Express API, PostgreSQL database, and cookie-based authentication.

## Local setup

Requirements: Node.js 20+, Docker, and Docker Compose.

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run server:dev
```

In a second terminal, start the frontend:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:4000`. The API creates the `users` table automatically when it starts.

## Authentication

Passwords are hashed with bcrypt. Successful registration and login issue a signed JWT in an HTTP-only cookie. The browser uses that cookie for `/api/auth/me` and logout; the token is never stored in local storage.

Create an account through the API before signing in:

```bash
curl -X POST http://localhost:4000/api/auth/register \
	-H 'Content-Type: application/json' \
	-d '{"email":"member@example.com","password":"change-me-123","role":"member"}'
```

Supported roles are `member`, `trainer`, `branch`, `company`, and `super`.

Copy `.env.example` to `.env` and replace `JWT_SECRET` with a long random value before deploying. Never commit `.env` or production credentials.

## Commands

- `npm run dev` starts the Vite frontend.
- `npm run server:dev` starts the API with file watching.
- `npm run build` creates the production frontend build.
- `npm run lint` runs Oxlint.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
