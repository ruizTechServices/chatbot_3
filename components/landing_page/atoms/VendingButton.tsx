/**
 * VendingButton Atom
 * A reusable button component for the vending machine landing page.
 * Supports primary and secondary variants and all standard button props.
 *
 * @component
 * @param {VendingButtonProps} props - Button props
 */
import React from "react";
import clsx from "clsx";

type VendingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export default function VendingButton({
  variant = "primary",
  className,
  children,
  ...props
}: VendingButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full font-bold py-3 px-8 text-lg transition-colors",
        variant === "primary"
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border-2 border-red-600 text-red-600 hover:bg-red-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
