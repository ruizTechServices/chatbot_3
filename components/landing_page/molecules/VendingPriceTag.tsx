import React from "react";
import VendingBadge from "../atoms/VendingBadge";

type VendingPriceTagProps = {
  price: string;
  className?: string;
};

export default function VendingPriceTag({ price, className = "" }: VendingPriceTagProps) {
  return (
    <VendingBadge className={`bg-white text-red-600 ${className}`}>{price}</VendingBadge>
  );
}
