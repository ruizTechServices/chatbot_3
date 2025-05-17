import React from "react";
import Header from "@/components/Header";
import VendingHero from "./organisms/VendingHero";
import VendingChatPanel from "./organisms/VendingChatPanel";
import VendingActionButtons from "./organisms/VendingActionButtons";
import VendingFeatureGrid from "./organisms/VendingFeatureGrid";
import VendingFooter from "./organisms/VendingFooter";

export default function LandingPageTemplate() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-900 p-8 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col items-center justify-center text-center gap-8 py-12">
        <VendingHero />
        <VendingChatPanel />
        <VendingActionButtons />
        <VendingFeatureGrid />
      </main>
      <VendingFooter />
    </div>
  );
}
