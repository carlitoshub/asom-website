import { getAllProjects } from "@/lib/queries";
import ArtistCard from "@/components/ArtistCard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "The Forge — ASOM",
  description: "Explore all artists in the ASOM forge.",
};

export default async function TheForgePage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen px-6 md:px-10 py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Hero */}
        <div className="mb-16 pt-8">
          <h1
            className="font-satoshi font-bold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 8vw, 150px)", letterSpacing: "-0.03em" }}
          >
            The Artist Forge
          </h1>
          <p className="mt-4 text-xs uppercase tracking-widest text-white/40 max-w-md">
            Take a peek at some of the artists that are part of the forge.
          </p>
        </div>

        {/* Artists grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {projects.map((project) => (
            <ArtistCard key={project._id} project={project} variant="grid" />
          ))}
        </div>
      </div>
    </div>
  );
}
