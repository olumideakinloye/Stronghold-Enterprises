import type { Metadata } from "next";
// Self-hosted Manrope (via @fontsource) instead of next/font/google — builds
// fully offline/behind firewalls and avoids a Google Fonts runtime request.
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export const metadata: Metadata = {
  title: "Stronghold Enterprises Ltd | Security, Real Estate, Consultancy, Logistics, Automobiles",
  description:
    "Stronghold Enterprises Ltd (RC: 7639871) — Ibadan-based multi-service group covering Security, Real Estate, Consultancy, Logistics and Automobiles.",
  metadataBase: new URL("https://stronghold-enterprises.example.com"),
  openGraph: {
    title: "Stronghold Enterprises Ltd",
    description:
      "One platform for Security, Real Estate, Consultancy, Logistics and Automobiles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-brand-bg text-brand-ink antialiased pt-0 overflow-x-hidden w-screen">
        <ScrollRevealProvider>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
