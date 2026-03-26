import Link from "next/link";
import Image from "next/image";
import type { CaseHistory } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export default function CaseHistoryCard({ item }: { item: CaseHistory }) {
  const date = item.date ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "";

  return (
    <Link href={`/case-histories/${item.slug}`} className="group flex flex-col md:flex-row gap-6 py-8 border-b border-white/10 hover:border-white/30 transition-colors">
      <div className="relative w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
        {item.profilePic && (
          <Image
            src={urlFor(item.profilePic).width(400).height(300).url()}
            alt={item.eventName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div>
          {item.eventType && (
            <span className="text-xs uppercase tracking-wider text-highlight">{item.eventType}</span>
          )}
          <h3 className="text-white font-satoshi text-xl uppercase tracking-tight mt-1">{item.eventName}</h3>
          <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{date}</p>
        </div>
        <p className="text-white/60 text-xs uppercase tracking-wide leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </Link>
  );
}
