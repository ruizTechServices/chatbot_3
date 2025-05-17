/**
 * VendingCard Atom
 * A styled card container for grouping content in the vending machine landing page.
 *
 * @component
 * @param {VendingCardProps} props - Card props
 */
import React from "react";

type VendingCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function VendingCard({ children, className = "" }: VendingCardProps) {
  return (
    <div className={`bg-red-50 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}
