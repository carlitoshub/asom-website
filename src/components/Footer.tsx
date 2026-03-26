import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 px-6 md:px-10 py-12 mt-20">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-white font-bold text-sm uppercase tracking-wide font-satoshi">ASOM</span>
          <span className="text-white/40 text-xs uppercase tracking-wider">A Forge of Multidisciplinary Artists</span>
        </div>

        <nav className="flex flex-col gap-3">
          <Link href="/theforge" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors">
            The Forge
          </Link>
          <Link href="/alltheartists" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors">
            All Artists
          </Link>
          <Link href="/case-histories" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors">
            Case Histories
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <Link
            href="https://forms.asom.space/entertheforge"
            target="_blank"
            className="text-xs uppercase tracking-wider text-highlight hover:opacity-70 transition-opacity"
          >
            Join The Forge →
          </Link>
          <Link href="https://asom.space" target="_blank" className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors">
            asom.space
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-10 pt-6 border-t border-white/5">
        <span className="text-xs text-white/20 uppercase tracking-wider">© {new Date().getFullYear()} ASOM. All rights reserved.</span>
      </div>
    </footer>
  );
}
