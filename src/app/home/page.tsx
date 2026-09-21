"use client";
import React, { useEffect, useRef } from "react";
import Products from "./Products";
import Why from "./Why";
import EmiCalculator from "./EmiCalculator";
import Banner from "@/components/Banner";
import ProcessSection from "@/components/Process";
import ConclusionSection from "@/components/ConclusionSection";
import { useFooter } from "@/context/FooterContext";
import { useMainRef } from "@/context/MainRefContext";
import { useLanguage } from "@/context/LanguageContext";
import { usePopup } from "@/context/PopupContext";
import enHome from "@/locales/en/home.json";
import mrHome from "@/locales/mr/home.json";

const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { setFooterContent } = useFooter();
  const { setMainRef } = useMainRef();
  const { language } = useLanguage();
  const { openPopup } = usePopup();

  const t = language === "mr" ? mrHome : enHome;

  useEffect(() => {
    if (mainRef.current) {
      setMainRef(mainRef);
    }

    setFooterContent({
      heading: t.footerContent.heading,
      description: t.footerContent.description,
      ctaContent: t.footerContent.ctaContent,
      href: "/apply",
    });

    return () => {
      setFooterContent(null);
    };
  }, [setFooterContent, setMainRef, mainRef, language]);

  return (
    <main
      ref={mainRef}
      className="@container relative w-full min-h-screen overflow-hidden z-10"
    >
      <Banner
        bannerImg="/images/home/home-banner.webp"
        title={t.hero.heading}
        text={t.hero.ctaCardText}
        cta1={t.hero.ctaCardContent1}
        href1="/apply"
        cta2={t.hero.ctaCardContent2}
        onClick2={openPopup}
      />
      <Products />
      <Why />
      <ProcessSection
        title={t.processSection.sectionHeading}
        bgColor="bg-white"
        steps={t.processSection.process}
      />
      <EmiCalculator />
      <ConclusionSection
        img_url="/images/home/conclusion.webp"
        img_object_position="object-[50%_100%]"
        title={t.conclusionSection.sectionHeading}
        text={t.conclusionSection.sectionText}
        href={t.conclusionSection.ctaHref}
        ctaContent={t.conclusionSection.ctaContent}
      />
    </main>
  );
};

export default Home;

