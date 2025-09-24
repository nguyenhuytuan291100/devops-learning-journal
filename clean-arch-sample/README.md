# Clean Architecture Node + React Sample (TypeScript)

## Run locally
1) Install Node 20+ and pnpm.
2) In repo root: `pnpm i`
3) Start API: `pnpm dev:server` → http://localhost:3001/api
4) Start Web: `pnpm dev:web` → http://localhost:5173
   - Optionally set `VITE_API_BASE=http://localhost:3001/api`

## Structure
- Domain / Application / Interface Adapters / Frameworks & Drivers split across `packages/server/src`.
- Web UI in `packages/web` using React + Ant Design.

## Optional: Prisma
If you enable Prisma, add `@prisma/client` + `prisma`, create schema with a `Task` model, run `npx prisma migrate dev`, and swap the repository wiring in `routes.ts`.
