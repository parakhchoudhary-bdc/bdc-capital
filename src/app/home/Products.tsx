import SectionHeader from "@/components/SectionHeader";
import React, { useState, useRef } from "react";
import CTACard from "@/components/CTACard";
import useScreenSizeMedium from "@/hooks/useScreenSizeMedium";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CTA from "@/components/CTA";
import { useLanguage } from "@/context/LanguageContext";
import enHome from "@/locales/en/home.json";
import mrHome from "@/locales/mr/home.json";

gsap.registerPlugin(ScrollToPlugin);

const productsData = [
  {
    src: "/images/home/personal-loan.webp",
    href: "/personal-loan",
  },
  {
    src: "/images/home/business-loan.webp",
    href: "/business-loan",
  },
  {
    src: "/images/home/home-loan.webp",
    href: "/housing-loan",
  },
  {
    src: "/images/home/vehicle-loan.webp",
    href: "/vehicle-loan",
  },
  {
    src: "/images/home/loan-against-property.webp",
    href: "/loan-against-property",
  },
  {
    src: "/images/home/cash-credit-facility.webp",
    href: "/cash-credit-facility",
  },
];

const Products: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMediumOrLarger = useScreenSizeMedium();

  const { language } = useLanguage();
  const t = language === "mr" ? mrHome.productsSection : enHome.productsSection;
  const translatedProducts = productsData.map((product, index) => ({
    ...product,
    title: t.products[index]?.title,
    text: t.products[index]?.ctaCardText,
    ctaContent: t.products[index]?.ctaCardContent,
  }));

  const gap = isMediumOrLarger ? 20 : 16;
  const updateIndexOnScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth, children } =
      carouselRef.current;

    // Calculate which item is currently in view
    const itemWidth = (children[0] as HTMLElement).offsetWidth + gap;
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }

    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const itemWidth =
      (carouselRef.current.children[0] as HTMLElement).offsetWidth + gap;

    gsap.to(carouselRef.current, {
      scrollTo: { x: index * itemWidth },
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isAtEnd) scrollToIndex(currentIndex + 1);
  };

  return (
    <section className="@container relative grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 lg:gap-y-15 py-15 lg:py-20 overflow-hidden bg-white">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(0, 90, 69, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
          opacity: 0.6,
        }}
        className="-z-1 h-[50vh] w-auto md:h-auto md:w-[70vw] aspect-square absolute -right-[30%] top-0 md:-right-[30%] md:-top-[10%] @6xl:-right-[30vw] @6xl:-top-[50%]  rounded-full overflow-visible blur-3xl"
      />
      <SectionHeader
        heading={t.sectionHeading}
        text={t.sectionText}
        className={`px-4 md:px-6 lg:px-10`}
      />
      <div className="flex flex-col gap-y-10 col-span-4 w-full relative group">
        <div
          ref={carouselRef}
          onScroll={updateIndexOnScroll}
          className="col-span-4 flex whitespace-nowrap gap-x-4 md:gap-x-5 items-stretch overflow-x-auto snap-x snap-mandatory w-full h-fit px-4 md:px-6 lg:px-10 no-scrollbar"
          style={{
            clipPath: "inset(0 0 0 0)",
            scrollPaddingLeft: isMediumOrLarger ? "40px" : "16px",
          }}
        >
          {translatedProducts.map((product, index) => (
            <div
              key={index}
              className="w-[85vw] sm:w-[60vw] @6xl:w-[70vw] 2xl:w-[80vw] h-fit shrink-0 flex flex-col items-start gap-y-5 sm:gap-y-6 md:gap-y-8 snap-start"
            >
              {/* Product Image Card */}
              <div className="w-full relative aspect-895/504 rounded-xl overflow-hidden">
                <img
                  src={product.src}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover object-center -z-10"
                />
                <div className="absolute inset-0 grid grid-cols-3 gap-x-4 md:gap-x-5 justify-between items-start w-full h-full p-6 md:p-7 lg:p-10">
                  <p className="text-xl sm:text-heading2 tracking-heading2 text-white font-medium leading-[100%] col-span-3">
                    {product.title}
                  </p>

                  {/* CTA shown only above @6xl inside the card */}
                  <CTACard
                    text={product.text}
                    cta1={product.ctaContent}
                    href1={product.href}
                    className="col-span-2 w-[80%] mt-auto hidden @6xl:flex"
                  />
                </div>
              </div>

              {/* Mobile/Tablet Content: Shown only BELOW @6xl */}
              <div className="flex flex-col @6xl:hidden gap-y-5 sm:gap-y-6 md:gap-y-8 items-start">
                <p className="text-bodyBase tracking-base text-titleCopyColor leading-[100%] text-wrap w-[84%]">
                  {product.text}
                </p>
                <CTA href={product.href} ctaContent={product.ctaContent} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`p-2.5 rounded-full bg-[#dedede] transition-all duration-300 pointer-events-auto hidden @6xl:block absolute top-1/2 left-6 md:left-12 lg:left-20 ${currentIndex === 0
              ? "opacity-0 group-hover:opacity-30 cursor-not-allowed"
              : "opacity-0 group-hover:opacity-100 cursor-pointer"
            }`}
          aria-label="Previous slide"
        >
          <img src="/icons/arrow.svg" alt="Previous" className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAtEnd}
          className={`p-2.5 rounded-full bg-[#dedede] transition-all duration-300 pointer-events-auto hidden @6xl:block absolute top-1/2 right-6 md:right-12 lg:right-20 ${isAtEnd
              ? "opacity-0 group-hover:opacity-30 cursor-not-allowed"
              : "opacity-0 group-hover:opacity-100 cursor-pointer"
            }`}
          aria-label="Next slide"
        >
          <img
            src="/icons/arrow.svg"
            alt="Next"
            className="h-4.5 w-4.5 -scale-x-100"
          />
        </button>
      </div>
    </section>
  );
};

export default Products;