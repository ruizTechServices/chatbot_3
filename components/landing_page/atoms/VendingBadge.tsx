/**
 * VendingBadge Atom
 * A styled badge/pill for highlighting price or status in the vending machine landing page.
 *
 * @component
 * @param {VendingBadgeProps} props - Badge props
 */
import React from "react";

type VendingBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function VendingBadge({ children, className = "" }: VendingBadgeProps) {
  return (
    <span className={`bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold ${className}`}>
      {children}
    </span>
  );
}
