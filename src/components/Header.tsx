"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/theforge", label: "THE FORGE" },
    { href: "/case-histories", label: "CASE HISTORIES" },
    { href: "/alltheartists", label: "ALL ARTISTS" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 bg-background/80 backdrop-blur-sm border-b border-white/5">
      <Link href="/" className="text-white font-satoshi font-bold tracking-wide text-sm uppercase">
        ASOM
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-xs uppercase tracking-wider font-satoshi transition-colors ${
              pathname.startsWith(l.href) ? "text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="https://forms.asom.space/entertheforge"
          target="_blank"
          className="text-xs uppercase tracking-wider font-satoshi border border-white/20 px-4 py-2 hover:border-white/60 transition-colors"
        >
          JOIN THE FORGE
        </Link>
      </nav>

      {/* Mobile menu button */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className="text-xs uppercase tracking-wider">{menuOpen ? "CLOSE" : "MENU"}</span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/10 flex flex-col p-6 gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-wider font-satoshi"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://forms.asom.space/entertheforge"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="text-sm uppercase tracking-wider font-satoshi text-highlight"
          >
            JOIN THE FORGE
          </Link>
        </div>
      )}
    </header>
  );
}
