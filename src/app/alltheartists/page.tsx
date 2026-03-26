import { getAllProjects } from "@/lib/queries";
import ArtistCard from "@/components/ArtistCard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "All Artists — ASOM",
  description: "All artists in the ASOM forge.",
};

export default async function AllArtistsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen px-6 md:px-10 py-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 pt-8">
          <h1
            className="font-satoshi font-bold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 8vw, 150px)", letterSpacing: "-0.03em" }}
          >
            All the Artists
          </h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
            {projects.length} creatives in the forge
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {projects.map((project) => (
            <ArtistCard key={project._id} project={project} variant="grid" />
          ))}
        </div>
      </div>
    </div>
  );
}
