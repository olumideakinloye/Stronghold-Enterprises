import { Section, Eyebrow, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import { ShieldCheck, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <Section className="grid gap-10 md:grid-cols-2">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 bottom-[0%] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-brand-green-light/20 blur-3xl" />
        {/* <div className="absolute left-[-10%] bottom-[0%] h-[380px] w-[380px] rounded-full bg-brand-green-light/20 blur-3xl" /> */}
      </div>
      <ScrollFade>
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tell us what you need — we&apos;ll take it from there
        </h2>
        <p className="mt-4 max-w-md text-brand-muted">
          General enquiries land with our front desk team, who route your
          request to the right business line within one working day.
        </p>
        <div className="mt-5">
          <p className="text-sm font-semibold">Visit Us</p>
          <ul className="mt-3 space-y-5 text-sm text-brand-muted">
            <li className="flex items-center gap-2">
              <span className="rounded-xl bg-brand-green-mist  p-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-green"
                />
              </span>
              <p>H12 Heritage Mall, Cocoa House, Dugbe, Ibadan</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-xl bg-brand-green-mist  p-3">
                <MessageCircle size={18} className="text-brand-green" />
              </span>
              <p>+234 800 000 0000</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-xl bg-brand-green-mist  p-3">
                <Phone size={18} className="text-brand-green" />
              </span>
              <p>+234 800 000 0000</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-xl bg-brand-green-mist  p-3">
                <Mail size={18} className="text-brand-green" />
              </span>
              <p>hello@strongholdenterprises.ng</p>
            </li>
          </ul>
        </div>
      </ScrollFade>
      <ScrollFade delay={150} className="glass-panel backdrop-blur-xl rounded-xl2 p-6 sm:p-8">
        <LeadForm module="consultancy" title="General enquiry" />
      </ScrollFade>
    </Section>
  );
}
