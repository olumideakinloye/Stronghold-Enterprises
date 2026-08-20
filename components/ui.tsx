import { ReactNode } from "react";
import clsx from "clsx";
import Tilt3D from "./Tilt3D";

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
  tilt = true,
  bg
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
  bg?: string
}) {
  return (
    <div
      className={clsx("glass-panel scroll-fade rounded-xl2 p-6", className)}
      data-delay={delay}
    >
      {tilt ? <Tilt3D>{children}</Tilt3D> : children}
    </div >
  );
}
export function Card({
  children,
  className,
  delay = 0,
  tilt = true,
  bg,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
  bg?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl2 border border-white shadow-lg scroll-fade",
        className
      )}
      data-delay={delay}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-20 h-full w-full p-6">
        {tilt ? <Tilt3D>{children}</Tilt3D> : children}
      </div>
    </div>
  );
}



export function ScrollFade({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const Comp = Tag as any;
  return (
    <Comp className={clsx("scroll-fade", className)} data-delay={delay}>
      {children}
    </Comp>
  );
}
