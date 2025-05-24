import React from "react";
import VendingChatBubble from "../molecules/VendingChatBubble";
import VendingChatInputRow from "../molecules/VendingChatInputRow";

export default function VendingChatPanel() {
  return (
    <div className="relative w-full max-w-md aspect-[3/4] my-8">
      <div className="absolute inset-0 bg-red-100 rounded-xl backdrop-blur-sm"></div>
      <div className="absolute inset-2 bg-white rounded-lg border-2 border-red-200 flex flex-col">
        <div className="bg-red-600 p-4 rounded-t-lg flex justify-between items-center text-white">
          <span className="font-bold">24Hour AI</span>
          <span className="bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold">$1</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
          <VendingChatBubble sender="User" text="What can you help me with today?" senderColor="text-gray-600" bubbleColor="bg-gray-100" />
          <VendingChatBubble sender="GPT-4" text="I can help with creative writing, coding problems, research questions, and more. What's on your mind?" senderColor="text-red-600" bubbleColor="bg-red-50" />
          <VendingChatBubble sender="Claude" text="I excel at thoughtful analysis and can assist with complex reasoning tasks. How can I help you today?" senderColor="text-red-600" bubbleColor="bg-red-50" />
        </div>
        <VendingChatInputRow />
      </div>
    </div>
  );
}
