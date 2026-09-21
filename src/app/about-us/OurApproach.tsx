"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import useContinuousScroll from "@/hooks/useContinuousScroll";
import OurApproachCard from "@/components/OurApproachCard";
import { useLanguage } from "@/context/LanguageContext";
import enAbout from "@/locales/en/about-us.json";
import mrAbout from "@/locales/mr/about-us.json";

const approachData = [
  {
    img_url: "/images/about-us/approach-1.webp",
  },
  {
    img_url: "/images/about-us/approach-2.webp",
  },
  {
    img_url: "/images/about-us/approach-3.webp",
  },
  {
    img_url: "/images/about-us/approach-4.webp",
  },
  {
    img_url: "/images/about-us/approach-5.webp",
  },
];

const OurApproach: React.FC = () => {
  const scrollRef = useContinuousScroll();
  const { language } = useLanguage();
  const t = language === "mr" ? mrAbout.ourApproachSection : enAbout.ourApproachSection;

  // Merge static images with translated text
  const translatedApproach = approachData.map((item, index) => ({
    ...item,
    title: t.ourApproachCards[index]?.title,
    alt: t.ourApproachCards[index]?.title,
  }));

  const infiniteApproach = [
    ...translatedApproach,
    ...translatedApproach,
    ...translatedApproach,
    ...translatedApproach,
    ...translatedApproach,
  ];

  return (
    <section className="@container grid grid-cols-4 gap-y-10 lg:gap-y-15 py-15 lg:py-20 bg-sectionBreak">
      <SectionHeader
        heading={t.sectionHeading}
        text={t.sectionText}
        className="px-4 md:px-6 lg:px-10 text-center"
      />
      <div
        ref={scrollRef}
        className="col-span-4 select-none flex items-stretch whitespace-nowrap min-w-full gap-4 md:gap-6 overflow-x-hidden px-4 md:px-6 lg:px-10"
      >
        {infiniteApproach.map((item, index) => (
          <OurApproachCard
            key={index}
            img_url={item.img_url}
            alt={item.alt}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
};

export default OurApproach;
