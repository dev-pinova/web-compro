import { motion } from "framer-motion"; // Note: Only used for initial static animations here if any, but mostly handled in client component
import * as motionServer from "framer-motion/dom"; // Server compatible DOM animations if needed
import { PortfolioContent } from "./PortfolioContent";
import { db } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const allProjects = await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <section className="bg-secondary-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            Karya Kami
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Portofolio
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
            Koleksi karya terbaik kami — dari rumah tinggal pribadi hingga kawasan properti dan ruang komersial.
          </p>
        </div>
      </section>

      <PortfolioContent allProjects={allProjects} />
    </div>
  );
}
