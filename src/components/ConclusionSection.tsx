"use client";
import React from 'react';
import CTA from './CTA';

interface ConclusionSectionProps {
  img_url: string;
  img_object_position?: string
  title: string;
  text: string;
  href: string;
  ctaContent: string;
  target?: string;
}

const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  img_url,
  img_object_position,
  title,
  text,
  href,
  ctaContent,
  target
}) => {
  return (
    <section className="@container relative grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-6 lg:gap-y-15 items-stretch px-4 md:px-6 lg:px-10 py-15 lg:py-20 overflow-hidden bg-white">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(0, 90, 69, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.6,
        }}
        className="h-[50vh] md:h-[90vh] md:w-[90vw] aspect-square absolute -left-[20%] top-0 md:-left-[30%] md:-top-[50%] -translate-y-[10%] blur-lg z-1 rounded-full"
      />
      <div className="col-span-4 md:col-span-2 order-2 md:order-1 w-full aspect-590/514 sm:aspect-auto sm:h-fit md:h-auto md:aspect-590/514 rounded-[20px] overflow-hidden relative z-2">
        <img
          src={img_url}
          alt={title}
          className={`h-full w-full object-cover ${img_object_position}`}
        />
      </div>
      <div className="col-span-4 md:col-span-2 order-1 md:order-2 w-full aspect-590/514 sm:aspect-auto sm:h-fit md:h-auto md:aspect-590/514 rounded-[20px] border border-borderColor p-5 md:p-6 lg:p-10 flex flex-col justify-center relative z-2">
        <p className="text-heading1 tracking-heading1 leading-[110%] font-medium mb-5">
          {title}
        </p>
        <p className="text-bodyBase md:text-body1 tracking-base text-mainTitleCopyColor leading-[124%] mb-10">
          {text}
        </p>
        <CTA target={target} href={href} ctaContent={ctaContent} />
      </div>
    </section>
  );
};

export default ConclusionSection;