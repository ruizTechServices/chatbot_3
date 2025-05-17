import React from "react";
import VendingImage from "../atoms/VendingImage";
import VendingHeading from "../atoms/VendingHeading";
import VendingText from "../atoms/VendingText";

export type VendingFeatureCardProps = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  text: string;
  imageClassName?: string;
  className?: string;
};

export default function VendingFeatureCard({
  imageSrc,
  imageAlt,
  heading,
  text,
  imageClassName = "",
  className = "",
}: VendingFeatureCardProps) {
  return (
    <div className={`flex flex-col items-center sm:items-start text-center sm:text-left ${className}`}>
      <div className={`w-16 h-16 sm:w-20 sm:h-20 relative mb-3 sm:mb-4 ${imageClassName}`}>
        <VendingImage src={imageSrc} alt={imageAlt} fill className="object-contain" />
      </div>
      <VendingHeading level={3} className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-red-600">{heading}</VendingHeading>
      <VendingText className="text-sm sm:text-base text-gray-800">{text}</VendingText>
    </div>
  );
}
