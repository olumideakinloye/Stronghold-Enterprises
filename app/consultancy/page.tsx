import { Briefcase, Target, Layers, TrendingUp } from "lucide-react";
import ModuleHero from "@/components/ModuleHero";
import ConsultancyScene from "@/components/three/ConsultancyScene";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

const SERVICES = [
  { icon: Target, name: "Security Consultancy", desc: "Risk assessments and security-policy design for organisations of any size." },
  { icon: Layers, name: "Business Structuring", desc: "Operational and process guidance for businesses ready to formalise and scale." },
  { icon: TrendingUp, name: "Growth Advisory", desc: "Practical, sit-down advisory sessions focused on measurable next steps." },
];

export default function ConsultancyPage() {
  return (
    <>
      <ModuleHero
        eyebrow="Consultancy"
        title="Clear thinking, applied to your business."
        description="Our consultancy desk pairs general business advisory with our security expertise — giving you one point of contact for structure, risk and growth."
        icon={Briefcase}
        scene={<ConsultancyScene />}
        note="Interactive 3D model — drag to explore the orbit"
      />

      <Section>
        <ScrollFade>
          <Eyebrow>How we help</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Advisory services</h2>
        </ScrollFade>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {SERVICES.map((s, i) => (
            <GlassCard key={s.name} delay={i * 90}>
              <s.icon className="text-brand-green" size={22} />
              <p className="mt-3 font-bold">{s.name}</p>
              <p className="mt-1 text-sm text-brand-muted">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section id="book" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Book a session</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Start with a short consultation
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            Describe what you&apos;re working through, and we&apos;ll match you with the right consultant
            and propose a time to talk.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm
            module="consultancy"
            title="Consultation request"
            extraFields={[{ label: "Area of focus", name: "focus_area" }]}
          />
        </ScrollFade>
      </Section>
    </>
  );
}
