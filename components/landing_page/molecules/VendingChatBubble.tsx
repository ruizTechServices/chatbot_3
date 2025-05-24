import React from "react";
import VendingText from "../atoms/VendingText";

export type VendingChatBubbleProps = {
  sender: string;
  text: string;
  senderColor?: string;
  bubbleColor?: string;
  className?: string;
};

export default function VendingChatBubble({
  sender,
  text,
  senderColor = "text-gray-600",
  bubbleColor = "bg-gray-100",
  className = "",
}: VendingChatBubbleProps) {
  return (
    <div className={`${bubbleColor} p-3 rounded-lg text-left text-sm ${className}`}>
      <p className={senderColor}>{sender}:</p>
      <VendingText className="text-gray-900">{text}</VendingText>
    </div>
  );
}
