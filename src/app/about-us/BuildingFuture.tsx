"use client";
import SectionHeader from "@/components/SectionHeader";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import enAbout from "@/locales/en/about-us.json";
import mrAbout from "@/locales/mr/about-us.json";

const futureImages = [
  "/images/about-us/responsible-lending.webp",
  "/images/about-us/social-inclusion.webp",
  "/images/about-us/gov-ethics.webp",
];

const BuildingFuture: React.FC = () => {
  const { language } = useLanguage();
  const t =
    language === "mr"
      ? mrAbout.buildingTheFutureSection
      : enAbout.buildingTheFutureSection;

  return (
    <section className="@container grid grid-cols-4 gap-y-10 lg:gap-y-15 px-4 md:px-6 lg:px-10 py-15 lg:py-20 bg-white">
      <SectionHeader heading={t.sectionHeading} />
      <div className="col-span-4">
        {t.futureList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-x-4 md:gap-x-5 py-6 md:py-7 lg:py-10 border-t border-borderColor gap-y-5"
          >
            <p className="col-span-4 md:col-span-1 text-subHeading tracking-subHeading leading-[110%] text-titleColor font-medium">
              {item.title}
            </p>
            <div className="col-span-4 sm:col-span-2 sm:w-[90%] md:w-[30vw] md:mx-auto aspect-386/216 rounded-[14px] overflow-hidden">
              <img
                src={futureImages[index]}
                alt={item.title}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className="col-span-4 sm:col-span-2 md:col-span-1 text-bodyBase tracking-base leading-[124%] text-titleCopyColor sm:max-w-77">
              {item.heading}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuildingFuture;
