import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllCaseHistories, getCaseHistoryBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import ImageTicker from "@/components/ImageTicker";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseHistoryBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.eventName} — ASOM Case Histories`,
    description: item.description,
  };
}

export default async function CaseHistoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseHistoryBySlug(slug);
  if (!item) notFound();

  const date = item.date ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
  const eventImages = (item.eventGallery?.images ?? []).map((img) => urlFor(img).width(800).url());
  const artworkImages = (item.artworkGallery?.images ?? []).map((img) => urlFor(img).width(800).url());

  return (
    <div className="min-h-screen">
      {/* Video/Image hero */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        {item.videoBackground ? (
          <video
            src={item.videoBackground}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : item.profilePic ? (
          <Image
            src={urlFor(item.profilePic).width(1600).height(900).url()}
            alt={item.eventName}
            fill
            className="object-cover"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Info */}
      <section className="px-6 md:px-10 py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl">
            {item.eventType && (
              <span className="text-xs uppercase tracking-widest text-highlight">{item.eventType}</span>
            )}
            <h1
              className="font-satoshi font-bold text-white leading-none tracking-tight mt-2"
              style={{ fontSize: "clamp(40px, 6vw, 90px)", letterSpacing: "-0.03em" }}
            >
              {item.eventName}
            </h1>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/40">{date}</p>
            <p className="mt-6 text-xs uppercase tracking-wide leading-relaxed text-white/60 max-w-xl">
              {item.description}
            </p>
            {item.websiteText && item.websiteLink && (
              <Link
                href={item.websiteLink}
                target="_blank"
                className="inline-block mt-6 text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 hover:border-white/60 transition-colors"
              >
                {item.websiteText} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Event photo ticker */}
      {eventImages.length > 0 && (
        <section className="py-12 border-t border-white/10">
          {item.eventGallery?.title && (
            <div className="px-6 md:px-10 mb-6">
              <h2 className="text-xs uppercase tracking-widest text-white/40">{item.eventGallery.title}</h2>
              {item.eventGallery.description && (
                <p className="mt-1 text-xs uppercase tracking-wide text-white/20">{item.eventGallery.description}</p>
              )}
            </div>
          )}
          <ImageTicker images={eventImages} speed={40} height={320} />
        </section>
      )}

      {/* Artwork gallery */}
      {artworkImages.length > 0 && (
        <section className="px-6 md:px-10 py-12 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto">
            {item.artworkGallery?.title && (
              <h2 className="text-xs uppercase tracking-widest text-white/40 mb-6">{item.artworkGallery.title}</h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {artworkImages.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image src={src} alt={`Artwork ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next case history */}
      {item.next && (
        <section className="px-6 md:px-10 py-16 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Next</p>
            <Link
              href={`/case-histories/${item.next.slug}`}
              className="font-satoshi font-bold text-white hover:text-highlight transition-colors leading-none tracking-tight"
              style={{ fontSize: "clamp(32px, 6vw, 90px)", letterSpacing: "-0.03em" }}
            >
              {item.next.eventName} →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
