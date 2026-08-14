import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold text-brand-green-dark">404</p>
      <h1 className="mt-2 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 max-w-sm text-brand-muted">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the homepage to keep browsing.
      </p>
      <Link href="/" className="mt-6 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark">
        Back to home
      </Link>
    </div>
  );
}
