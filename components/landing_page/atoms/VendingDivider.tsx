/**
 * VendingDivider Atom
 * A styled horizontal divider for the vending machine landing page.
 *
 * @component
 * @param className - Additional class names for styling
 */
import React from "react";

export default function VendingDivider({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-red-100 ${className}`} />;
}
