# Stronghold Enterprises Ltd — Web App

Full-stack web application for Stronghold Enterprises Ltd (RC: 7639871), covering all five
business lines — **Security, Real Estate, Consultancy, Logistics, Automobiles** — plus an
admin dashboard, built on the implementation plan.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres, Auth, Storage)

---

## 1. What's included

- Public site: home page with a Spaceship.com-style scroll-reveal hero, and a dedicated landing
  page per business module, each with its own **interactive 3D object** (drag to orbit, scroll to
  zoom) built with `@react-three/fiber` / `three.js`.
- White + green glassmorphism theme with `backdrop-filter` panels, matching the reference UI image,
  set in **Manrope** throughout (self-hosted via `@fontsource/manrope` — no external font request
  needed at build or runtime).
- Lead-capture forms per module (with a honeypot spam trap) writing straight into Supabase.
- Admin dashboard (`/admin`) behind Supabase Auth: overview stats, leads inbox with status triage,
  CRUD for the security catalogue / property listings / vehicle listings, image upload to Supabase
  Storage, and an activity log.
- Row Level Security policies so public visitors can browse listings and submit leads, while only
  provisioned admins can write content or read leads.
- SEO basics: sitemap.xml, robots.txt, semantic headings, meta tags.

## 2. About the 3D objects and imagery

This build environment has no network access to third-party asset sites (image libraries, Sketchfab,
or the Porsche render app you linked), so:

- Every 3D object (camera rig, building, orbiting rings, van, sports coupe) is a **real, working,
  procedurally-built Three.js scene** — not a placeholder image — fully interactive out of the box.
- Photography is replaced with icon/gradient treatments in the same theme, so there's nothing to
  license or attribute.

To swap in real assets later:
- **3D models:** drop a `.glb`/`.gltf` file in `public/models/`, then replace the geometry inside
  the relevant file in `components/three/` with `useGLTF("/models/your-file.glb")` from
  `@react-three/drei`. Free, commercial-use-safe models are available on
  [Poly Haven](https://polyhaven.com) and [Sketchfab's CC0 listings](https://sketchfab.com/features/free-3d-models).
- **Photos:** replace the icon blocks in each listing card with `next/image`, pointing at images
  uploaded to your Supabase Storage bucket (already wired up) or a source like
  [Unsplash](https://unsplash.com) (free license).

## 3. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project values
npm run dev                  # http://localhost:3000
```

### Supabase project setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public key** into `.env.local`.
3. Open the **SQL Editor** and run the entire contents of `supabase/schema.sql`. This creates all
   tables, enums, indexes, RLS policies, the `stronghold-media` storage bucket, and a few seed
   catalogue rows.
4. Create your first admin user:
   - **Authentication → Users → Add user** (set an email + password).
   - In the SQL editor, run:
     ```sql
     insert into admin_users (user_id, role, full_name)
     values ('PASTE-THE-USER-UUID-HERE', 'super_admin', 'Your Name');
     ```
   - Sign in at `/admin/login` with that email/password.

## 4. Production build

```bash
npm run build
npm run start
```

This has already been verified to build cleanly (`npm run build`) in this delivery.

## 5. Deploying

The simplest path is [Vercel](https://vercel.com) (matches the plan's proposed hosting):

1. Push this project to a GitHub repository.
2. Import it in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables.
4. Deploy. Point your domain's DNS at Vercel and enable the automatic SSL certificate.

## 6. Project structure

```
app/
  page.tsx                 Home page
  security/ real-estate/ consultancy/ logistics/ automobiles/
                            One landing page per business module
  admin/                    Admin dashboard (auth-protected)
components/
  three/                    3D scene components (one per module + shared shell)
  admin/                    Admin-only UI
  ui.tsx, Navbar.tsx, Footer.tsx, LeadForm.tsx, ModuleHero.tsx, ScrollRevealProvider.tsx
lib/supabase/                Browser + server Supabase clients, middleware, hand-maintained types
supabase/schema.sql          Full DB schema, RLS policies, storage bucket, seed data
```

## 7. Known follow-ups before go-live

- Replace procedural 3D shapes / icon placeholders with real photography and (optionally) GLTF
  models per the notes above.
- Swap `lib/supabase/types.ts` for the output of
  `npx supabase gen types typescript --project-id <ref> > lib/supabase/types.ts` once your schema
  is live, for full end-to-end type safety.
- Add real company copy/images from Stronghold (logo, product photos, property/vehicle images) —
  the admin dashboard's image upload is already wired to Supabase Storage for this.
- Configure a CAPTCHA provider (e.g. Cloudflare Turnstile) alongside the existing honeypot for
  stronger spam protection on public forms, per the plan's non-functional requirements.
- Add automated tests and connect a CI pipeline (GitHub Actions) before scaling the admin team.
