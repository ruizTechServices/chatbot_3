import React from "react";
import VendingHeading from "../atoms/VendingHeading";
import VendingText from "../atoms/VendingText";

export default function VendingHero() {
  return (
    <div className="max-w-3xl">
      <VendingHeading level={2} className="text-4xl sm:text-6xl font-bold mb-6 text-red-600">
        Premium AI Chat
        <span className="block text-red-700">Just $1</span>
      </VendingHeading>
      <VendingText className="text-xl mb-8 max-w-2xl mx-auto text-gray-800">
        Access multiple cutting-edge LLMs for 24 hours straight.
        Like a vending machine for AI - insert a dollar, get unlimited conversations.
      </VendingText>
    </div>
  );
}
