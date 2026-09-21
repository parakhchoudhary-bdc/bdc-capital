"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import enHome from "@/locales/en/home.json";
import mrHome from "@/locales/mr/home.json";

const featuresData = [
  {
    icon: "/icons/checklist.svg",
  },
  {
    icon: "/icons/account_tree.svg",
  },
  {
    icon: "/icons/volunteer_activism.svg",
  },
  {
    icon: "/icons/tooltip.svg",
  },
];

const Why: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const coloredPathsRef = useRef<(SVGPathElement | null)[]>([]);

  const { language } = useLanguage();
  const t = language === "mr" ? mrHome.whySection : enHome.whySection;

  // Merge static icons with translated text
  const translatedFeatures = featuresData.map((feature, index) => ({
    ...feature,
    title: t.whyChooseCards[index]?.title,
    description: t.whyChooseCards[index]?.description,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = coloredPathsRef.current.filter(
        (p): p is SVGPathElement => p !== null,
      );
      if (!paths.length) return;

      // 1. Initial setup for iOS: Hide and set dasharray
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      // 2. Sequential Animation (One at a time)
      const tl = gsap.timeline({ repeat: -1 });

      paths.forEach((path) => {
        const length = path.getTotalLength();

        tl.set(path, { opacity: 1 })
          .to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          })
          .to(path, {
            strokeDashoffset: -length,
            duration: 1.2,
            ease: "power2.inOut",
          })
          .set(path, { opacity: 0 }); // Hide when done
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pathData = [
    "M12.2147 19.3965C5.91117 168.503 152.903 129.152 152.904 249.446",
    "M66.0215 18.7515C62.7864 169.51 154.085 116.034 153.087 249.22",
    "M123.153 18.1624C119.918 168.921 154.085 106.953 153.087 240.14",
    "M181.179 18.1624C184.414 168.921 152.089 105.944 153.087 239.131",
    "M239.998 18.1624C243.233 168.921 151.935 115.445 152.933 248.631",
    "M293.785 18.7513C300.089 167.858 153.097 128.507 153.096 248.801",
  ];

  return (
    <section
      ref={sectionRef}
      className="@container grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 lg:gap-y-15 py-15 lg:py-20 px-4 md:px-6 lg:px-10 bg-white"
    >
      <SectionHeader heading={t.sectionHeading} text={t.sectionText} />
      <div className="col-span-4 grid grid-cols-4 gap-x-4 md:gap-x-5 items-stretch">
        {translatedFeatures.map((feature, index) => (
          <FeatureCard
            key={`${feature.title}-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="aspect-328/246 md:aspect-250/160 xl:aspect-285/252 w-full col-span-4 sm:col-span-2 xl:col-span-1 mb-5 xl:mb-0"
          />
        ))}
        <div className="grid grid-cols-4 col-span-4">
          <div className="col-start-1 @6xl:col-start-2 col-span-4 @6xl:col-span-2 aspect-306/200 w-[90%] sm:w-[40%] @6xl:w-[64%] 2xl:w-[10%] mx-auto relative overflow-hidden -mt-5 xl:mt-0 z-20">
            <svg
              width="306"
              height="280"
              viewBox="0 0 306 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[110%] w-full"
            >
              <defs>
                <linearGradient
                  id="orange_pulse"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#005a45" stopOpacity="0" />
                  <stop offset="50%" stopColor="#005a45" stopOpacity="1" />
                  <stop offset="100%" stopColor="#005a45" stopOpacity="0" />
                </linearGradient>
              </defs>

              {pathData.map((d, i) => (
                <path key={`bg-${i}`} d={d} stroke="#E5E5E5" strokeWidth="1" />
              ))}

              {pathData.map((d, i) => (
                <path
                  key={`fg-${i}`}
                  ref={(el) => {
                    coloredPathsRef.current[i] = el; // FIXED: Added curly braces to avoid implicit return
                  }}
                  d={d}
                  stroke="url(#orange_pulse)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  style={{ opacity: 0 }}
                />
              ))}
            </svg>
          </div>

          <div className="col-start-1 @6xl:col-start-2 col-span-4 @6xl:col-span-2 aspect-square w-[50%] sm:w-[30%] @6xl:w-[36%] mx-auto lg:-mt-1 flex justify-center">
            <img
              src="/images/home/bdc-capital.svg"
              alt="BDC Capital Logo"
              className="object-contain object-center w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
