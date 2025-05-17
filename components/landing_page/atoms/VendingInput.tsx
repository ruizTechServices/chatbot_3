/**
 * VendingInput Atom
 * A styled input field for the vending machine landing page.
 * Inherits all standard input props.
 *
 * @component
 * @param {VendingInputProps} props - Input props
 */
import React from "react";

type VendingInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function VendingInput(props: VendingInputProps) {
  return (
    <input
      className="flex-1 bg-white border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
      {...props}
    />
  );
}
