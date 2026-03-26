import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full h-screen flex items-end pb-16 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        {/* ASOM large text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span
            className="font-satoshi font-bold text-white/5 leading-none tracking-wide select-none"
            style={{ fontSize: "clamp(120px, 25vw, 400px)", letterSpacing: "0.02em" }}
          >
            ASOM
          </span>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1
            className="font-satoshi font-bold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 8vw, 80px)", letterSpacing: "-0.03em" }}
          >
            We are many, our talents are infectious.
          </h1>
          <p className="mt-6 text-xs uppercase tracking-widest text-white/50">
            We need someone to infect.
          </p>
          <Link
            href="https://forms.asom.space/entertheforge"
            target="_blank"
            className="inline-block mt-8 text-xs uppercase tracking-widest border border-white/30 px-6 py-3 hover:border-white transition-colors"
          >
            Be Part of The Forge
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-10 py-20 bg-white text-background">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-8">
            <h2
              className="font-satoshi font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 80px)", letterSpacing: "-0.03em" }}
            >
              A forge of 100+ artists
            </h2>
            <p className="text-xs uppercase tracking-wider leading-relaxed text-background/60">
              ASOM is a forge of over 100 polidisciplinary artists that value the progress of modern art forms over anything. The sole purpose of ASOM is to include every niche and branch of creativity possible, in order to provide an invaluable source of inspiration, fueled by the relentless desire for creation of unique minds.
            </p>
            <Link
              href="https://forms.asom.space/entertheforge"
              target="_blank"
              className="inline-block text-xs uppercase tracking-widest border border-background/30 px-6 py-3 hover:border-background transition-colors w-fit"
            >
              Be Part of The Forge
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-background/40">Creatives in the forge</p>
            <p className="text-xs uppercase tracking-wider leading-loose text-background/60">
              Graphic Designers · Visual Artists · Art Directors · Fashion Designers · Narrative Designers · Multimedia · Stylists · Typographers · Graffiti Artists · UX/UI Designers · Musicians · Illustrators · 3D Artists · AI Artists
            </p>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="font-satoshi font-bold text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 80px)", letterSpacing: "-0.03em" }}
              >
                The Artist Forge
              </h2>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
                Check the latest entries in the ASOM archive
              </p>
            </div>
            <Link
              href="/theforge"
              className="hidden md:inline-block text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 hover:border-white/60 transition-colors"
            >
              See Them All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((project) => (
              <Link key={project._id} href={`/theforge/${project.slug}`} className="group flex flex-col gap-3">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white/5">
                  {project.profilePic && (
                    <Image
                      src={urlFor(project.profilePic).width(400).height(400).url()}
                      alt={project.artistName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white font-satoshi text-sm uppercase tracking-tight">{project.artistName}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{project.creativeRole}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/theforge" className="text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 hover:border-white/60 transition-colors">
              See Them All
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
