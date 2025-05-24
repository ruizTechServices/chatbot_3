'use client';
import React from "react";
import VendingInput from "../atoms/VendingInput";
import VendingButton from "../atoms/VendingButton";

type VendingChatInputRowProps = {
  placeholder?: string;
  buttonLabel?: string;
  onSend?: (value: string) => void;
  className?: string;
};

export default function VendingChatInputRow({
  placeholder = "Ask anything...",
  buttonLabel = "→",
  onSend,
  className = "",
}: VendingChatInputRowProps) {
  const [value, setValue] = React.useState("");

  const handleSend = () => {
    if (onSend) onSend(value);
    setValue("");
  };

  return (
    <div className={`bg-gray-100 p-3 rounded-b-lg flex gap-2 ${className}`}>
      <VendingInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <VendingButton type="button" onClick={handleSend}>
        {buttonLabel}
      </VendingButton>
    </div>
  );
}
