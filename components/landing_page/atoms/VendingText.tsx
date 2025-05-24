/**
 * VendingText Atom
 * A styled paragraph component for the vending machine landing page.
 *
 * @component
 * @param {VendingTextProps} props - Text props
 */
import React from "react";

type VendingTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function VendingText({ children, className = "" }: VendingTextProps) {
  return <p className={className}>{children}</p>;
}
