import React from "react";
import VendingFooterLinks from "../molecules/VendingFooterLinks";

export default function VendingFooter() {
  return (
    <footer className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-red-100">
      <p className="text-sm text-gray-600">© 2025 ruizTechServices,LLC. All rights reserved.</p>
      <VendingFooterLinks
        links={[
          { href: "/terms", label: "Terms" },
          { href: "/privacy", label: "Privacy" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </footer>
  );
}
