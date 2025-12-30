# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **Bun** as the package manager.

```bash
bun install       # Install dependencies
bun dev           # Start development server (binds to 0.0.0.0)
bun run build     # Production build
bun start         # Start production server
bun lint          # Run ESLint
```

## Architecture

This is a **Next.js 15** frontend for Altnet, a Moldovan ISP. It uses the App Router with TypeScript, Tailwind CSS, and Radix UI primitives.

### Route Structure

The application uses a single App Router layout for the public marketing pages:

- **`/` (root)** - Public marketing site (services, pricing, coverage, contact)

### Backend Integration

All data comes from a Go backend API. Configuration is in `src/lib/backend-api.ts`:

- `API_BASE_URL` - Set via `NEXT_PUBLIC_API_BASE_URL` or `API_BASE_URL` env var
- `PUBLIC_API_BASE_URL` - `{base}/api/v1/public` (storefront endpoints, supports slugs)
- `CORE_API_BASE_URL` - `{base}/api/v1` (admin endpoints, UUID-only)

API documentation is in `api-documentation.md`.

### Key Directories

- `src/components/` - Shared components (layout, UI, pricing, speedtest)
- `src/lib/` - Utilities and API helpers

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables

Required:
- `NEXT_PUBLIC_API_BASE_URL` or `API_BASE_URL` - Backend API base URL

Optional:
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata (defaults to https://altnet.md)
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` - Google Search Console verification
