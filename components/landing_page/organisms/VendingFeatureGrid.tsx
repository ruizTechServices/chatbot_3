import React from "react";
import VendingCard from "../atoms/VendingCard";
import VendingFeatureCard from "../molecules/VendingFeatureCard";

const features = [
  {
    imageSrc: "/multipleLLMs.png",
    imageAlt: "Multiple LLMs",
    heading: "Multiple LLMs",
    text: "Access GPT-4, Claude, and more models with a single subscription",
  },
  {
    imageSrc: "/24Hour-ai-logo-1.png",
    imageAlt: "24 Hours Access",
    heading: "24 Hours Access",
    text: "Full day of unlimited conversations after your one-time payment",
    imageClassName: "bg-red-600 rounded-full p-1",
  },
  {
    imageSrc: "/banknote.png",
    imageAlt: "Just $1",
    heading: "Just $1",
    text: "No hidden fees or subscriptions. Pay once and enjoy for 24 hours",
  },
];

export default function VendingFeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-5xl mx-auto px-4">
      {features.map((feature, idx) => (
        <VendingCard key={feature.heading}>
          <VendingFeatureCard {...feature} />
        </VendingCard>
      ))}
    </div>
  );
}
