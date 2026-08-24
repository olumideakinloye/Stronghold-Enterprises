import { ReactNode } from "react";
import { ScrollFade } from "@/components/ui";
import { LucideIcon } from "lucide-react";

export default function ModuleHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  scene,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  scene: ReactNode;
  note?: string;
}) {
  return (
    <section className="relative h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-[-10%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
      </div>
      <div className="mx-auto pb-6 pt-14 sm:pt-20 mt-0 h-full">
        <ScrollFade delay={150} className="relative">
          <ScrollFade className="glass-panel backdrop-blur-xl rounded-xl2 absolute z-50 p-5 my-auto sm:top-0 sm:bottom-0 sm:left-5 sm:max-w-xl h-fit sm:w-1/2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green-dark bg-brand-green-mist w-fit">{eyebrow}</span>
            <h1 className="mt-12 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-8 max-w-md text-brand-muted">{description}</p>
          </ScrollFade>
          <div className="h-[340px] w-full overflow-hidden sm:h-[580px]">
            {scene}
          </div>
          {note && (
            <p className="mt-3 text-center text-xs text-brand-muted">{note}</p>
          )}
        </ScrollFade>
      </div>
    </section>
  );
}
