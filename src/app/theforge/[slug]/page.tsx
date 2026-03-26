import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.artistName} — ASOM`,
    description: project.bio || `${project.artistName} is a ${project.creativeRole} in the ASOM forge.`,
  };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const spotifyLinks = [project.spotifyLink1, project.spotifyLink2, project.spotifyLink3].filter(Boolean);
  const gallery1Images = project.gallery1?.images ?? [];
  const gallery2Images = project.gallery2?.images ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-12 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Artist image */}
            <div className="relative aspect-square max-w-sm rounded-2xl overflow-hidden bg-white/5">
              {project.profilePic && (
                <Image
                  src={urlFor(project.profilePic).width(600).height(600).url()}
                  alt={project.artistName}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8 pt-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-highlight mb-2">{project.labelDropdown || project.creativeRole}</p>
                <h1
                  className="font-satoshi font-bold text-white leading-none tracking-tight"
                  style={{ fontSize: "clamp(40px, 6vw, 90px)", letterSpacing: "-0.03em" }}
                >
                  {project.artistName}
                </h1>
              </div>

              {project.bio && (
                <p className="text-white/60 text-xs uppercase tracking-wide leading-relaxed max-w-lg">
                  {project.bio}
                </p>
              )}

              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                {project.creativeRole && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Role</p>
                    <p className="text-xs uppercase tracking-wide text-white/80">{project.creativeRole}</p>
                  </div>
                )}
                {project.partOfAsomSince && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Part of the Forge since</p>
                    <p className="text-xs uppercase tracking-wide text-white/80">{project.partOfAsomSince}</p>
                  </div>
                )}
                {project.creativeSkills && (
                  <div className="col-span-2">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Skills</p>
                    <p className="text-xs uppercase tracking-wide text-white/80">{project.creativeSkills}</p>
                  </div>
                )}
              </div>

              {project.websiteText && project.websiteLink && (
                <Link
                  href={project.websiteLink}
                  target="_blank"
                  className="inline-block text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 hover:border-white/60 transition-colors w-fit"
                >
                  {project.websiteText} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery 1 */}
      {gallery1Images.length > 0 && (
        <section className="px-6 md:px-10 py-12 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto">
            {project.gallery1?.title && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest text-white/60">{project.gallery1.title}</h2>
                {project.gallery1.description && (
                  <p className="mt-2 text-xs uppercase tracking-wide text-white/30">{project.gallery1.description}</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery1Images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={urlFor(img).width(500).height(500).url()}
                    alt={`${project.artistName} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery 2 */}
      {gallery2Images.length > 0 && (
        <section className="px-6 md:px-10 py-12 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto">
            {project.gallery2?.title && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest text-white/60">{project.gallery2.title}</h2>
                {project.gallery2.description && (
                  <p className="mt-2 text-xs uppercase tracking-wide text-white/30">{project.gallery2.description}</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery2Images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={urlFor(img).width(500).height(500).url()}
                    alt={`${project.artistName} gallery 2 item ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotify */}
      {spotifyLinks.length > 0 && (
        <section className="px-6 md:px-10 py-12 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-6">Music</h2>
            <div className="flex flex-col gap-4">
              {spotifyLinks.map((link, i) => (
                <iframe
                  key={i}
                  src={`https://open.spotify.com/embed/track/${link?.split("/").pop()?.split("?")[0]}`}
                  width="100%"
                  height="80"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next artist */}
      {project.next && (
        <section className="px-6 md:px-10 py-16 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Next Artist</p>
            <Link
              href={`/theforge/${project.next.slug}`}
              className="font-satoshi font-bold text-white hover:text-highlight transition-colors leading-none tracking-tight"
              style={{ fontSize: "clamp(40px, 8vw, 120px)", letterSpacing: "-0.03em" }}
            >
              {project.next.artistName} →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
