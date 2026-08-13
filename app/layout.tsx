import "./globals.css"; import type { Metadata } from "next";
export const metadata: Metadata = { title: "Stronghold Enterprises | Built for what matters", description: "Security, real estate, consultancy, logistics and automobile services in Ibadan, Nigeria.", metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><main className="shell">{children}</main></body></html> }
