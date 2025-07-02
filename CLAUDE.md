# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (binds to 0.0.0.0 for network access)
- `npm run build` - Build for production (includes Prisma generation)
- `npm run lint` - Run ESLint
- `npm run start` - Start production server

### Database Commands
- `npm run prisma:seed` - Seed database with initial admin user
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio database browser

### Testing Individual Components
- Use `npm run dev` and navigate to specific routes to test features
- Admin features: `/inventar` (requires authentication)
- Store features: `/magazin`
- Public pages: `/`, `/servicii`, `/preturi`, `/acoperire`

## Project Architecture

### Multi-Application Structure
This is a Next.js 15 application serving three distinct purposes:
1. **Public ISP Website** - Marketing pages with service information
2. **E-commerce Store** (`/magazin`) - Product catalog and shopping cart
3. **Inventory Management** (`/inventar`) - Admin dashboard for product/category management

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT with Jose library, role-based access control
- **UI**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Maps**: Multiple integrations (Leaflet, Mapbox, Google Maps)

### Database Schema
- **User**: Admin authentication (ADMIN/USER roles)
- **Category**: Product categories with images
- **Product**: Full e-commerce product model with specs, images, stock
- **PriceHistory**: Price tracking over time

Connection: PostgreSQL on Neon (connection string in schema.prisma)

### Authentication System
- JWT tokens stored in HTTP-only cookies (`auth-token`)
- Middleware protects `/inventar` routes (admin-only)
- Login endpoint: `/login` (redirects authenticated admins to `/inventar`)
- Admin seeding: `npm run prisma:seed` creates initial admin user

### Route Protection
- `/inventar/*` - Admin only (JWT + ADMIN role required)
- `/magazin/*` - Public access
- `/login` - Redirects authenticated users to `/inventar`
- All other routes - Public access

### Component Organization
- `/src/components/layout/` - Header, Footer, Navigation
- `/src/components/sections/` - Page-specific sections (Hero, Services, etc.)
- `/src/components/ui/` - shadcn/ui components
- `/src/components/seo/` - SEO utilities and structured data

### API Routes
- `/api/auth/login` - Authentication endpoint
- `/api/categories` - Category CRUD operations
- `/api/products` - Product CRUD operations
- `/api/contact` - Contact form submission

### Development Notes
- Romanian language optimization throughout
- SEO-first approach with comprehensive metadata
- Responsive design with mobile-first approach
- Type-safe with strict TypeScript configuration
- Path aliases configured (`@/*` maps to `/src/*`)

### Environment Variables Required
- `JWT_SECRET` - JWT signing secret
- `NEXTAUTH_SECRET` - NextAuth secret (if using NextAuth)
- Database URL is hardcoded in schema.prisma (should be moved to env)

### Common Development Patterns
- Use Prisma Client for all database operations
- Form validation with Zod schemas
- Error handling with try-catch in API routes
- Image optimization with Next.js Image component
- State management with React hooks and context
- Shopping cart persisted to localStorage

### Key Files to Understand
- `src/middleware.ts` - Route protection and authentication
- `prisma/schema.prisma` - Database schema and connection
- `src/lib/auth.ts` - Authentication utilities
- `src/app/layout.tsx` - Root layout with SEO configuration
- `tailwind.config.js` - Tailwind configuration with shadcn/ui setup