import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ASOM — A Forge of Multidisciplinary Artists",
  description: "ASOM is a forge of over 100 polidisciplinary artists that value the progress of modern art forms over anything.",
  openGraph: {
    title: "ASOM",
    description: "A forge of multidisciplinary artists.",
    url: "https://asom.space",
    siteName: "ASOM",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-white font-satoshi">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
