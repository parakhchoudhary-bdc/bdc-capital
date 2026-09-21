"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SectionHeader from "@/components/SectionHeader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useLanguage } from "@/context/LanguageContext";
import enAbout from "@/locales/en/about-us.json";
import mrAbout from "@/locales/mr/about-us.json";

const directorsData = [
  { photo: "/images/about-us/ankur-rander.webp" },
  { photo: "/images/about-us/siddhesh-pednekar.webp" },
];

const BoardOfDirectors: React.FC = () => {
  const { language } = useLanguage();
  const t = language === "mr" ? mrAbout.boardOfDirectorsSection : enAbout.boardOfDirectorsSection;
  const [selectedDirector, setSelectedDirector] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyScrollLock({ isLocked: !!selectedDirector, scrollableSelector: '.director-popup-scrollable' });

  const translatedDirectors = directorsData.map((director, index) => ({
    ...director,
    name: t.directorsCards[index]?.name,
    position: t.directorsCards[index]?.position,
    description: t.directorsCards[index]?.description,
  }));

  const handleCardClick = (director: any) => {
    setSelectedDirector(director);
  };

  const handleClosePopup = () => {
    setSelectedDirector(null);
  };

  return (
    <>
      <section className="@container grid grid-cols-4 gap-y-10 lg:gap-y-15 py-15 lg:py-20 px-4 md:px-6 lg:px-10 bg-white">
        <SectionHeader heading={t.sectionHeading} />
        <div className="col-span-4 grid grid-cols-12 gap-y-6 md:gap-y-10 lg:gap-y-15 gap-x-4 md:gap-x-5 w-full lg:w-auto max-w-5xl @6xl:max-w-7xl mx-auto">
          {translatedDirectors.map((director, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(director)}
              className={`mx-auto w-[96%] sm:mx-0 sm:max-w-full sm:w-auto col-span-12 lg:col-span-6 bg-sectionBreak h-fit lg:w-full rounded-[14px] flex flex-col sm:flex-row sm:items-center gap-5 cursor-pointer sm:pr-6 sm:aspect-386/100 pl-5 pr-5 py-5 sm:pl-0 sm:py-0`}
            >
              <div className="w-full sm:w-auto sm:h-full aspect-square rounded-tr-[14px] rounded-br-[14px] sm:rounded-tr-none sm:rounded-br-none  rounded-tl-[14px] rounded-bl-[14px] bg-[#f8f3ef] overflow-hidden shrink-0">
                <img src={director.photo} alt={director.name} className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex flex-col justify-between h-full py-4 md:py-5 w-full">
                <div>
                  <p className="text-body1 tracking-base leading-[110%] text-titleColor font-medium">
                    {director.name}
                  </p>
                  <p className="text-body2 mt-1 tracking-base leading-[124%] text-titleCopyColor">
                    {director.position}
                  </p>
                </div>
                <span className="text-[#005a45] text-sm font-medium mt-4 sm:mt-1">
                  {(t as any).readMore || (language === "mr" ? "अधिक वाचा" : "Read More")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {mounted && selectedDirector && createPortal(
        <div className="fixed inset-0 z-90 bg-white flex flex-col w-full h-full overscroll-contain">
          <button
            onClick={handleClosePopup}
            className="absolute top-6 right-5 md:right-6 md:top-10 lg:right-10 z-100 w-8 h-8 bg-[#005a45] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#023632] transition-colors shadow-md"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="director-popup-scrollable w-full h-screen overflow-y-auto overflow-x-hidden touch-pan-y overscroll-contain py-10 flex justify-center items-start xl:items-center"
            // Stop propagation of scroll events to body (though body is locked, this helps in some browsers)
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="max-w-384 mx-auto h-fit px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row gap-8 lg:gap-14 items-start lg:items-start lg:justify-start place-content-start">
              <div className="w-[80%] sm:w-[50%] md:w-[30%]  shrink-0 aspect-square rounded-2xl overflow-hidden bg-[#f8f3ef]">
                <img src={selectedDirector.photo} alt={selectedDirector.name} className="w-full h-full object-cover object-center" />
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-heading2 tracking-heading2 leading-[110%] font-medium text-titleColor">
                    {selectedDirector.name}
                  </h3>
                  <p className="text-subHeading tracking-subHeading leading-[110%] text-titleCopyColor font-mediu">
                    {selectedDirector.position}
                  </p>
                </div>
                <div className="w-full h-px bg-borderColor/50"></div>
                <p className="text-bodyBase xl:text-body1 tracking-base leading-[130%] text-titleCopyColor whitespace-pre-line">
                  {selectedDirector.description}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default BoardOfDirectors;

