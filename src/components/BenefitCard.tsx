"use client";
import React from "react";

interface BenefitCardProps {
  iconURL: string;
  text: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ iconURL, text }) => {
  return (
    <div className="w-[60vw] sm:w-[40vw] md:w-[33vw] 2xl:w-[25vw] aspect-square rounded-xl border-borderColor border shrink-0 flex flex-col justify-between p-4 md:p-6 bg-white">
      <img src={iconURL} alt={text} className="h-8 w-8" />
      <p className="text-body1 tracking-body1 xl:text-subHeading xl:tracking-subHeading leading-[124%] text-wrap font-medium text-titleColor">
        {text}
      </p>
    </div>
  );
};

export default BenefitCard;
