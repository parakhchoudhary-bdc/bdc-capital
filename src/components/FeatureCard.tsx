"use client";
import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={`${className} @container flex flex-col gap-y-10 justify-between p-4 md:p-6 rounded-xl border border-borderColor`}
    >
      <img src={icon} alt={title} className="h-8 w-8" />
      <div className="flex flex-col gap-y-4">
        <p className="text-subHeading tracking-subHeading font-medium leading-[100%] text-titleColor">
          {title}
        </p>
        {description && (
          <p className="text-bodyBase tracking-base font-normal leading-[124%] text-titleCopyColor">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
