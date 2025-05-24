import React from "react";

type VendingFooterLinksProps = {
  links: { href: string; label: string }[];
  className?: string;
};

export default function VendingFooterLinks({ links, className = "" }: VendingFooterLinksProps) {
  return (
    <div className={`flex gap-6 ${className}`}>
      {links.map(link => (
        <a key={link.href} href={link.href} className="text-sm text-red-600 hover:underline">
          {link.label}
        </a>
      ))}
    </div>
  );
}
