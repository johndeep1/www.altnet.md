# Repository Guidelines

## Project Structure & Module Organization
- `src/app` holds Next.js App Router routes such as `magazin`, `pachete`, and API routes; page entrypoints live in route directories.
- `src/components` hosts UI modules grouped by feature (`layout`, `speedtest`, `ui`), and `src/lib`, `src/utils`, `src/types` provide shared logic, helpers, and TypeScript contracts callable via the `@/*` path alias (see `tsconfig.json`).
- Database schema and migrations reside in `prisma/` with seed data in `prisma/seed.js`; static assets live under `public/`.

## Build, Test, and Development Commands
- `npm run dev` launches the Next.js dev server at `http://localhost:3000`.
- `npm run build` runs `prisma generate` then compiles the production bundle.
- `npm run start` serves the built app; `npm run lint` executes Next + ESLint.
- `npm run prisma:seed` (or `npx prisma db seed`) populates the database after `prisma migrate`.

## Coding Style & Naming Conventions
- TypeScript is strictly typed (`strict: true`); prefer functional React components and server actions consistent with existing files.
- Use 2-space indentation, Tailwind utility classes in JSX, and descriptive component names (PascalCase for components, camelCase for helpers).
- Keep shared logic in `src/lib`/`src/utils` and export via the `@/` alias; colocate CSS in Tailwind classes or module-level styles where necessary.

## Testing Guidelines
- Automated tests are not yet configured; when adding them, keep spec files near their subjects (`component.test.tsx`) and run them before commits.
- Until a framework is adopted, rely on `npm run lint` and manual QA across key routes (e.g., `/magazin`), documenting scenarios in PRs.

## Commit & Pull Request Guidelines
- Git history is currently informal (`Update changes`, `alot`); move toward clear, imperative summaries such as `feat(magazin): add product filters`.
- Each PR should describe motivation, list notable changes, link issues, and attach screenshots or recordings for UI updates.
- Confirm lint/build results and note any schema changes (`prisma migrate`, env vars) in the PR body.

## Security & Configuration Tips
- Store secrets in `.env.local` (`EMAIL_USER`, `EMAIL_PASS`, `EMAIL_RECIPIENT`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`), and never commit them.
- Run `npx prisma migrate dev` after schema updates and verify regenerated types before pushing.
- When adding client-side code, audit for privacy-sensitive data and depend on `process.env.NEXT_PUBLIC_*` only for safe public values.
