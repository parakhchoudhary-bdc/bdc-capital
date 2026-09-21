"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import BenefitCard from "@/components/BenefitCard";
import useContinuousScroll from "@/hooks/useContinuousScroll";

interface Benefits {
  icon: string;
  benefitText: string;
}

interface BenefitsProps {
  id: string;
  title: string;
  benefits: Benefits[];
}

const Benefits: React.FC<BenefitsProps> = ({ id, benefits, title }) => {
  const scrollRef = useContinuousScroll();

  return (
    <section className="@container grid grid-cols-4 gap-y-10 lg:gap-y-15 py-15 lg:py-20 bg-white">
      <SectionHeader
        heading={`${title}`}
        className="px-4 md:px-6 lg:px-10 text-center"
      />
      <div
        ref={scrollRef}
        className="col-span-4 select-none flex items-stretch whitespace-nowrap min-w-full gap-4 md:gap-5 overflow-x-hidden h-max px-4 md:px-6 lg:px-10"
      >
        {[...benefits, ...benefits, ...benefits, ...benefits, ...benefits].map((benefit, index) => (
          <BenefitCard
            key={`${id}-${index}`}
            iconURL={benefit.icon}
            text={benefit.benefitText}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
