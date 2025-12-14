<!-- Copilot / AI agent instructions for SolvaticaTech repo -->
# Copilot instructions — SolvaticaTech

Purpose: give a focused, immediately-actionable summary for AI coding agents working in this repo.

- **Stack & router:** Next.js 15 (App Router) + TypeScript. App code lives under `app/` (not `pages/`).
- **Styling/UI:** Tailwind CSS with `shadcn/ui`-style components under `app/components/ui`.
- **Data layer:** Prisma (schema at `prisma/schema.prisma`). Prisma client generated into `lib/generated/prisma` (seed and scripts import from there).
- **Scripts:** TypeScript node scripts are run with `tsx` (see `scripts/*` and `package.json` entries). Use `npm run db:seed` to seed, `npm run db:check` to validate DB connectivity.

Quick commands (repo-root):

- Dev server: `npm run dev`
- Build: `npm run build`
- Start (production): `npm run start`
- Tests: `npm run test`  — use `npm run test:watch` for TDD
- Jest one-file: `npx jest __tests__/components/Chatbot.test.tsx` or `npm run test -- __tests__/components/Chatbot.test.tsx`
- Prisma: `npm run db:generate`, `npm run db:push`, `npm run db:migrate`, `npm run db:seed`

What to check before changing code

- Check `prisma/schema.prisma` datasource. README suggests PostgreSQL, but the checked-in Prisma schema uses `sqlite` (`file:./dev.db`). Do not run production migrations without confirming `DATABASE_URL` and schema datasource.
- `scripts/seed.ts` imports Prisma client from `lib/generated/prisma`. If you change the generator output, update imports or regenerate.
- Runtime scripts expect `tsx` available (devDependency). Use `npm run db:seed` instead of `node` directly.

Key files and why they matter (examples you can open quickly)

- `app/layout.tsx` — global layout, wraps pages with `AuthProvider`, mounts `Chatbot` and `Navbar`.
- `app/components/Chatbot.tsx` — client-side component (`'use client'`) that demonstrates UI patterns, quick-questions, and the chat flow used in tests.
- `__tests__/components/Chatbot.test.tsx` — model example for testing components with React Testing Library + Jest. Use this as a template for new component tests.
- `prisma/schema.prisma` — data model and generator settings. Generator outputs to `lib/generated/prisma` which seed and scripts rely on.
- `scripts/seed.ts`, `scripts/check-db.ts` — examples of repository scripts that must run in Node with `tsx`.
- `jest.config.js` and `jest.setup.js` — how tests are configured and how `@/` imports are mapped to `app/`.

Conventions and patterns to follow (observable in repo)

- Absolute import alias: `@/` maps to `app/` (used across code). Keep this when resolving modules.
- Client vs server components: components that need browser APIs include `'use client'` at the top (see `Chatbot.tsx`). Prefer server components by default in `app/` unless you need state, effects, or DOM APIs.
- UI primitives: `app/components/ui/*` contains shared UI primitives — reuse these rather than creating new styles for common controls.
- Hooks: custom hooks live in `app/hooks/` — use them for cross-cutting behavior (e.g., `useModal`, `useLocalStorage`).
- Tests: jest + React Testing Library. Tests live in `__tests__` or alongside files with `.test.tsx` naming.

Integration points & external dependencies

- Analytics: `app/components/Analytics.tsx` integrates GA4/GTM — be careful with keys and PII.
- Auth: `app/components/AuthProvider.tsx` controls session; check `AUTH_SECRET` and routing protection.
- Chatbot: local (rule-based) implementation lives in `Chatbot.tsx`. If extending to external LLMs, wire up environment variables (README mentions `CHATBOT_API_KEY` but Chatbot currently simulates responses).
- Database: Prisma client is used throughout. Confirm environment `DATABASE_URL` or `prisma/schema.prisma` datasource before running migrations or seeds.

Testing & debugging tips

- Run unit tests via `npm run test`. Use `--watch` for development.
- Jest maps `@/` to `app/` via `jest.config.js`. If adding new path aliases, update both `tsconfig.json` and `jest.config.js` mappings.
- To debug Node scripts (e.g., seed), run `node --inspect-brk ./node_modules/.bin/tsx scripts/seed.ts` or use your editor's node debug with `tsx` as the runtime.

Safety & gotchas (observed in repo)

- README and `prisma/schema.prisma` disagree about DB: README suggests PostgreSQL and a `DATABASE_URL`, but the schema uses `sqlite` file. Verify with the repo maintainers which datasource to use for CI/production.
- Scripts assume generated Prisma client path (`lib/generated/prisma`). If you change the generator `output`, update imports in `scripts/*`.

If something is unclear

- Ask the human maintainer to confirm desired DB provider and the canonical `.env` for CI.
- If adding external LLMs or secrets, never commit API keys — use environment variables and document names in `README.md`/`.env.example`.

Please review: do you want more examples (small code snippets) for writing tests, adding Prisma models, or extending the Chatbot with an external API? 
