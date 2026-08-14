import { ReactNode } from "react";
import clsx from "clsx";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-green-mist px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green-dark">
      {children}
    </span>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("mx-auto w-full max-w-6xl px-6 py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function GlassCard({
  children,
  className,
  delay = 0,
  depth3d = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Adds the spaceship.com-style 3D tilt-in-on-scroll entrance. */
  depth3d?: boolean;
}) {
  return (
    <div
      className={clsx(
        "glass-panel rounded-xl2 p-6",
        depth3d ? "scroll-fade scroll-fade-3d" : "scroll-fade",
        className
      )}
      data-delay={delay}
    >
      {children}
    </div>
  );
}

export function ScrollFade({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  depth3d = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  /** Adds the spaceship.com-style 3D tilt-in-on-scroll entrance. */
  depth3d?: boolean;
}) {
  const Comp = Tag as any;
  return (
    <Comp className={clsx(depth3d ? "scroll-fade scroll-fade-3d" : "scroll-fade", className)} data-delay={delay}>
      {children}
    </Comp>
  );
}
