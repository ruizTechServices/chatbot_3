/**
 * VendingHeading Atom
 * A semantic heading component (h1-h6) for the vending machine landing page.
 *
 * @component
 * @param {VendingHeadingProps} props - Heading props
 */
import React from "react";
import { JSX } from "react/jsx-runtime";

type VendingHeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export default function VendingHeading({ children, level = 2, className = "" }: VendingHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}
