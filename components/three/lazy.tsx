"use client";

import dynamic from "next/dynamic";
import ScenePlaceholder from "./ScenePlaceholder";

/**
 * Lazy, client-only wrappers around each module's 3D scene.
 *
 * Why this file exists: `next/dynamic(..., { ssr: false })` can only be
 * called from inside a Client Component — Next.js errors if you call it
 * directly in a Server Component (our module pages are Server Components,
 * since they fetch catalogue data with `createClient()` from
 * lib/supabase/server). Wrapping the dynamic() calls in this "use client"
 * file lets the pages stay Server Components while still getting the
 * code-splitting benefit: Three.js + drei + the GLB model now load in a
 * separate chunk, fetched only once this component mounts on the client,
 * instead of being bundled into the page's initial JS payload.
 *
 * Note: the `{ ssr: false, loading: ... }` object below must be written
 * inline at each `dynamic()` call — Next.js/Turbopack statically parses
 * that object at build time to wire up the code-split chunk, so a shared
 * variable reference (e.g. `dynamic(fn, opts)`) fails with "next/dynamic
 * options must be an object literal".
 */
export const SecurityScene = dynamic(() => import("./SecurityScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export const RealEstateScene = dynamic(() => import("./RealEstateScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export const ConsultancyScene = dynamic(() => import("./ConsultancyScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export const LogisticsScene = dynamic(() => import("./LogisticsScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export const AutomobilesScene = dynamic(() => import("./AutomobilesScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});
