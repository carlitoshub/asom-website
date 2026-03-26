import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

interface ArtistCardProps {
  project: Project;
  variant?: "grid" | "list";
}

export default function ArtistCard({ project, variant = "grid" }: ArtistCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/theforge/${project.slug}`} className="group flex items-center gap-6 py-6 border-b border-white/10 hover:border-white/30 transition-colors">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          {project.profilePic && (
            <Image
              src={urlFor(project.profilePic).width(128).height(128).url()}
              alt={project.artistName}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-satoshi text-sm uppercase tracking-tight truncate">{project.artistName}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{project.creativeRole}</p>
        </div>
        <span className="text-white/20 text-xs uppercase tracking-wider group-hover:text-white/60 transition-colors">VIEW →</span>
      </Link>
    );
  }

  return (
    <Link href={`/theforge/${project.slug}`} className="group flex flex-col gap-3">
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
  );
}
