# Repository Guidelines

## Project Structure & Module Organization
`src/app` uses the Next.js App Router; each folder maps to a route segment (e.g., `src/app/pachete/page.tsx`). API routes live in `src/app/api`. Shared UI lives in `src/components` (notably `src/components/sections` for page blocks). Reusable logic and helpers are in `src/lib` and `src/utils`, domain types in `src/types`, and fixtures/data in `src/data`. Static assets (images, icons, manifest) are in `public`, while global styles are in `src/app/globals.css`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server on `http://localhost:3000` (bound to `0.0.0.0`).
- `npm run build`: create a production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint via `next lint` for code quality checks.

## Coding Style & Naming Conventions
Use TypeScript + React with the App Router. Follow the existing style: 2-space indentation, single quotes, and semicolons. Components and component files are PascalCase (e.g., `HeroSection.tsx`), while route folders mirror URL segments (e.g., `src/app/preturi`). Prefer the `@/` alias for imports from `src` (configured in `tsconfig.json`). Tailwind CSS is the primary styling system; keep global CSS changes in `src/app/globals.css`.

## Testing Guidelines
There is no dedicated test runner configured yet. For now, rely on `npm run lint` and manual validation in `npm run dev`. If you add tests, co-locate them with the feature and use `*.test.ts(x)` naming so they can be picked up by future tooling.

## Commit & Pull Request Guidelines
Commit history mixes short summaries with Conventional Commits (e.g., `feat(app): switch to backend API`). Prefer the Conventional Commit style when possible and keep messages imperative and concise. PRs should include a brief summary, testing notes (commands run), and screenshots for UI changes; link related issues if they exist.

## Security & Configuration Tips
Local configuration belongs in `.env`. Do not commit secrets; if new config is needed, document the required keys in the PR description.
