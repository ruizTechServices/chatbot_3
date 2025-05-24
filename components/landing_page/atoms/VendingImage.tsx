/**
 * VendingImage Atom
 * Wrapper for Next.js Image component, for consistent usage in the landing page.
 * Inherits all Next.js ImageProps.
 *
 * @component
 * @param {ImageProps} props - Image props
 */
import Image, { ImageProps } from "next/image";

export default function VendingImage(props: ImageProps) {
  return <Image {...props} />;
}
