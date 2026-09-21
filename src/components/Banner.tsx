"use client";
import React from "react";
import CTACard from "./CTACard";

interface BannerProps {
  bannerImg: string;
  title: string;
  text: string;
  cta1?: string;
  href1?: string;
  onClick1?: () => void;
  cta2?: string;
  href2?: string;
  onClick2?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  bannerImg,
  title,
  text,
  cta1,
  href1,
  onClick1,
  cta2,
  href2,
  onClick2,
}) => {
  return (
    <section className="z-2 relative h-svh w-full px-4 md:px-6 lg:px-10 pb-15 pt-34 lg:pt-38 2xl:pb-20 2xl:pt-43 overflow-hidden">
      <img
        src={bannerImg}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover object-top -z-1"
      />
      <div className="grid grid-cols-4 gap-x-4 md:gap-x-5 justify-between items-start w-full h-full">
        <h1 className="col-span-4 sm:col-span-3 text-white text-display tracking-display max-w-200 leading-[124%] font-medium">
          {title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <CTACard
          text={text}
          cta1={cta1}
          href1={href1}
          onClick1={onClick1}
          cta2={cta2}
          href2={href2}
          onClick2={onClick2}
          target="_blank"
          className="col-span-4 sm:col-span-3 xl:col-span-2 mt-auto"
        />
      </div>
    </section>
  );
};

export default Banner;
