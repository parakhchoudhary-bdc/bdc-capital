"use client";
import React, { useEffect, useRef } from "react";
import Banner from "@/components/Banner";
import About from "@/components/About";
import OurValues from "./OurValues";
import OurApproach from "./OurApproach";
import ListingSection from "@/components/ListingSection";
import BoardOfDirectors from "./BoardOfDirectors";
import BuildingFuture from "./BuildingFuture";
import { useFooter } from "@/context/FooterContext";
import { useMainRef } from "@/context/MainRefContext";
import { useLanguage } from "@/context/LanguageContext";
import enAbout from "@/locales/en/about-us.json";
import mrAbout from "@/locales/mr/about-us.json";

const AboutUsClient: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { setFooterContent } = useFooter();
    const { setMainRef } = useMainRef();
    const { language } = useLanguage();
    const t = language === "mr" ? mrAbout : enAbout;

    useEffect(() => {
        if (mainRef.current) {
            setMainRef(mainRef);
        }

        setFooterContent({
            heading: language === "mr" ? "आमच्याशी संपर्क साधा" : "Connect With Us",
            description:
                language === "mr"
                    ? "कर्जाबाबत तसेच इतर माहितीसाठी वेबसाइटवरील क्रमांकावर संपर्क साधा. आमची टीम तुम्हाला मदत करेल."
                    : "For loan-related enquiries or general information, you may reach out to us using the contact details provided on the website. Our team will assist you with the next steps.",
            ctaContent: language === "mr" ? "संपर्क साधा" : "Contact Us",
            href: "/contact-us",
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
                bannerImg="/images/about-us/about-us-banner.webp"
                title={t.heroSection.heading}
                text={t.heroSection.ctaCardText}
            />
            <About
                title={t.aboutUsSection.sectionHeading}
                description={t.aboutUsSection.sectionText}
                imageSrc="/images/about-us/about-showcase.jpg"
                vision={t.aboutUsSection.vision}
                mission={t.aboutUsSection.mission}
                gradientAdjustment="-right-[30%] top-0 md:-right-[30%] md:-top-[40%] @6xl:-right-[30vw] @6xl:-top-[90%]"
            />
            <OurValues />
            <OurApproach />
            <ListingSection
                heading={t.commitmentSection.sectionHeading}
                text={t.commitmentSection.sectionText}
                items={t.commitmentSection.commitmentPoints.map((point) => ({
                    icon: "/icons/done_all.svg",
                    description: point.title,
                }))}
                descriptionFontStyle="text-xl text-titleColor leading-[110%] tracking-base"
            />
            <BoardOfDirectors />
            <BuildingFuture />
        </main>
    );
};

export default AboutUsClient;
