"use client";
import React from "react";
import Calculator from "./Calculator";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import enHome from "@/locales/en/home.json";
import mrHome from "@/locales/mr/home.json";

const EmiCalculator: React.FC = () => {
  const { language } = useLanguage();
  const t = language === "mr" ? mrHome.emiCalculatorSection : enHome.emiCalculatorSection;

  return (
    <section className="@container relative grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 lg:gap-y-15 py-15 lg:py-20 px-4 md:px-6 lg:px-10 items-stretch h-fit w-full bg-white">
      <SectionHeader
        heading={t.sectionHeading}
        text={t.sectionText}
      />
      <Calculator />
    </section>
  );
};

export default EmiCalculator;

