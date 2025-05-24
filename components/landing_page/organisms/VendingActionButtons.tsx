import React from "react";
import Link from "next/link";
import VendingButton from "../atoms/VendingButton";

export default function VendingActionButtons() {
  return (
    <div className="flex gap-4 flex-col sm:flex-row mt-6">
      <Link href="/signup" passHref legacyBehavior>
        <VendingButton variant="primary">Try for $1</VendingButton>
      </Link>
      <Link href="#learn-more" passHref legacyBehavior>
        <VendingButton variant="secondary">Learn more</VendingButton>
      </Link>
    </div>
  );
}
