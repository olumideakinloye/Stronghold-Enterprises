import { ReactNode } from "react";
import { Eyebrow, ScrollFade } from "@/components/ui";
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
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-[-10%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-6 pt-14 sm:pt-20 md:grid-cols-2 md:items-center mt-10">
        <ScrollFade>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-mist text-brand-green-dark">
            <Icon size={22} />
          </span>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-md text-brand-muted">{description}</p>
        </ScrollFade>

        <ScrollFade delay={150} className="relative">
          <div className="glass-panel h-[340px] w-full overflow-hidden rounded-xl2 sm:h-[420px]">
            {scene}
          </div>
          {note && <p className="mt-3 text-center text-xs text-brand-muted">{note}</p>}
        </ScrollFade>
      </div>
    </section>
  );
}
