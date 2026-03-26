import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="font-satoshi font-bold text-white leading-none tracking-tight"
        style={{ fontSize: "clamp(80px, 20vw, 270px)", letterSpacing: "0.02em" }}
      >
        404
      </h1>
      <p className="mt-6 text-xs uppercase tracking-widest text-white/40">Page not found</p>
      <Link
        href="/"
        className="mt-8 text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-white/60 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
