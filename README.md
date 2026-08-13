# Stronghold Enterprises

Production-ready Next.js application for Stronghold Enterprises Ltd (RC: 7639871). It includes the five public service areas, interactive original 3D scenes, listing/catalogue browsing, protected admin entry, lead capture API, Prisma data model, sitemap, mobile layout, and Docker Postgres setup.

## Run locally

1. Install Node.js 20+ and Docker Desktop.
2. Copy `.env.example` to `.env.local`, then replace `AUTH_SECRET` and `ADMIN_PASSWORD` with strong values.
3. Start PostgreSQL: `docker compose up -d db`
4. Install dependencies: `npm install`
5. Prepare database and sample content: `npm run db:generate && npm run db:push && npm run db:seed`
6. Start development: `npm run dev`

Visit `http://localhost:3000`. Admin is at `/admin/login`, using the credentials set in `.env.local`.

## Production deployment

Deploy to Vercel and use a managed PostgreSQL provider (Neon/Supabase). Set `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `NEXT_PUBLIC_SITE_URL` in the host environment. Run `npm run db:push` and `npm run db:seed` once against the production database. Set a production object-storage provider for listing uploads before allowing staff upload access; the schema persists media URLs today, so Cloudinary/S3 integration can be added without changing public data.

## Security and operations

The public form is validated server-side and contains a honeypot. Admin sessions are signed HTTP-only cookies and all `/admin` routes are protected by middleware. Rotate the admin password / secret before launch and set rate limiting or CAPTCHA at the edge (Vercel WAF / Cloudflare) for production traffic.
