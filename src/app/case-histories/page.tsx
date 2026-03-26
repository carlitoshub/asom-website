import { getAllCaseHistories } from "@/lib/queries";
import CaseHistoryCard from "@/components/CaseHistoryCard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Case Histories — ASOM",
  description: "Events and case histories from ASOM.",
};

export default async function CaseHistoriesPage() {
  const histories = await getAllCaseHistories();

  return (
    <div className="min-h-screen px-6 md:px-10 py-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 pt-8">
          <h1
            className="font-satoshi font-bold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 8vw, 150px)", letterSpacing: "-0.03em" }}
          >
            Case Histories
          </h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
            Events curated and powered by ASOM
          </p>
        </div>

        <div className="flex flex-col">
          {histories.map((item) => (
            <CaseHistoryCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
