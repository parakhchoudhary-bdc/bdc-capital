"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import enAbout from "@/locales/en/about-us.json";
import mrAbout from "@/locales/mr/about-us.json";

const valuesIcons = [
  "/icons/filter_none.svg",
  "/icons/money_bag.svg",
  "/icons/grading.svg",
  "/icons/readiness_score.svg",
  "/icons/arming_countdown.svg",
  "/icons/co_present.svg",
];

const OurValues: React.FC = () => {
  const { language } = useLanguage();
  const t = language === "mr" ? mrAbout.ourValuesSection : enAbout.ourValuesSection;

  return (
    <section className="@container grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-10 lg:gap-y-15 py-15 lg:py-20 px-4 md:px-6 lg:px-10 bg-white">
      <SectionHeader heading={t.sectionHeading} text={t.sectionText} />
      <div className="grid grid-cols-12 col-span-4 gap-x-4 md:gap-x-5 gap-y-10 lg:gap-y-15">
        {t.valuesData.map((value, index) => (
          <div
            key={index}
            className="col-span-12 md:col-span-6 lg:col-span-4 mx-auto max-w-100 flex flex-col justify-center items-center text-center"
          >
            <img
              src={valuesIcons[index]}
              alt={value.title}
              className="h-fit w-fit mb-6"
            />
            <p className="text-subHeading tracking-subHeading leading-[110%] text-titleColor font-medium mb-2.5">
              {value.title}
            </p>
            <p className="text-body2 tracking-base leading-[124%] text-titleCopyColor max-w-77.5">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;