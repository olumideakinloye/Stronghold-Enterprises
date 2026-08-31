"use client";

/**
 * Shown in place of the 3D canvas while its JS chunk + GLB model are still
 * downloading. Keeps the layout stable (matches SceneShell's h-full w-full)
 * and gives visitors something better than a blank rectangle.
 */
export default function ScenePlaceholder() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,rgba(63,197,127,0.18),transparent_65%)]" />
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-black/20 border-t-brand-green-light" />
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-black/50">
        Loading 3D model…
      </p>
    </div>
  );
}
