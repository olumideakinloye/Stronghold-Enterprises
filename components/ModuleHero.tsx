"use client";
import { ReactNode, useEffect, useState } from "react";
import { ScrollFade } from "@/components/ui";
import ScrollCue from "@/components/ScrollCue";

export default function ModuleHero({
  eyebrow,
  title,
  description,
  scene,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  scene: ReactNode;
  note?: string;
}) {
  const [heroSceneHeight, setHeroSceneHeight] = useState<number | null>(null);
  useEffect(() => {
    const handleHeroSceneHeight = () => {
      setHeroSceneHeight(window.innerHeight);

    };

    handleHeroSceneHeight();

    window.addEventListener("resize", handleHeroSceneHeight);

    return () => {
      window.removeEventListener("resize", handleHeroSceneHeight);
    };
  }, []);
  return (
    <section className="relative h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-[-10%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
      </div>
      <div className="mx-auto mt-0 h-full">
        <ScrollFade delay={150} className="relative h-full">
          <ScrollFade className="glass-panel backdrop-blur-xl rounded-xl2 absolute z-50 p-3 mx-5 sm:mx-0 sm:p-5 top-20 sm:my-auto sm:top-0 sm:bottom-0 sm:left-5 sm:max-w-lg h-fit sm:w-1/2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green-dark bg-brand-green-mist w-fit">{eyebrow}</span>
            <h1 className="mt-5 sm:mt-12 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm sm:text-base sm:mt-8 max-w-md text-brand-muted">{description}</p>
          </ScrollFade>
          <div className="w-full overflow-hidden pt-[70%] sm:pt-0 h-auto"
            style={{
              height: heroSceneHeight
                ? `${heroSceneHeight}px`
                : undefined,
            }}>
            {scene}
          </div>
          {note && (
            <p className="mt-3 text-center text-xs text-brand-muted">{note}</p>
          )}
        </ScrollFade>
      </div>
      <ScrollCue href="#contents" theme="grey" />
    </section>
  );
}
