import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import BottomDock from "@/components/BottomBar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curiosity OS // Digital Laboratory",
  description: "Cognition OS Experience",
};

import { PlannerProvider } from "@/lib/planner-context";
import { EvidenceProvider } from "@/lib/evidence-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${outfit.variable} antialiased font-outfit`}>
        <PlannerProvider>
          <EvidenceProvider>
            {children}
          </EvidenceProvider>
          <div className="fixed bottom-1 w-full flex justify-center z-[150] pointer-events-none pb-safe">
              <span className="text-[9px] text-slate-600/60 font-mono tracking-widest uppercase md:text-[10px]">
                  © Tharun Gajula
              </span>
          </div>
          <BottomDock />
        </PlannerProvider>
      </body>
    </html>
  );
}
