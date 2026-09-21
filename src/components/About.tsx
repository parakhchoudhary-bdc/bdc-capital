"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import VideoSection from './VideoSection';

interface AboutProps {
  title: string;
  description: string;
  gradientAdjustment?: string;
  videoSrc?: string;
  imageSrc?: string;
  vision?: {
    title: string;
    description: string;
  };
  mission?: {
    title: string;
    description: string;
  };
}

const About: React.FC<AboutProps> = ({
  title,
  description,
  videoSrc,
  imageSrc,
  gradientAdjustment,
  vision,
  mission,
}) => {
  const pathname = usePathname();
  return (
    <section className="@container relative grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-4 md:gap-y-6 py-15 lg:py-20 px-4 md:px-6 lg:px-10 w-full h-fit bg-white">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(0, 90, 69, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
          opacity: 0.6,
        }}
        className={`z-1 h-[50vh] w-auto md:h-auto md:w-[70vw] aspect-square absolute rounded-full blur-3xl ${gradientAdjustment}`}
      />
      <h3 className="col-span-4 text-[28px] sm:text-heading1 tracking-heading1 leading-[100%] max-w-147.5 text-center text-mainTitleColor font-medium mx-auto">
        {title}
      </h3>
      <p className="col-span-4 lg:col-start-2 lg:col-span-2 mx-auto text-center text-body1 tracking-base leading-[136%] text-mainTitleCopyColor max-w-147.5 2xl:max-w-full">
        {description}
      </p>
      {imageSrc && (
        <div className="col-span-4 max-w-5xl @6xl:max-w-7xl mx-auto w-full mt-4 lg:mt-6 overflow-hidden rounded-2xl md:rounded-3xl border border-borderColor/60 shadow-lg relative aspect-16/9 md:aspect-21/9 group">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      )}
      {!imageSrc && videoSrc && <VideoSection src={videoSrc} className='col-span-4' />}
      {pathname === "/about-us" && vision && mission && (
        <div className="col-span-4 grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-6 mt-11 md:mt-1 lg:mt-14">
          <div className="col-span-4 md:col-span-2 border border-borderColor rounded-xl flex flex-col justify-center items-center gap-6 w-full aspect-590/230 p-6">
            <p className="text-heading2 tracking-heading2 leading-[90%] font-medium">
              {vision.title}
            </p>
            <p className="text-center text-bodyBase text-titleCopyColor tracking-base leading-[124%] max-w-127.5">
              {vision.description}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 border border-borderColor rounded-xl flex flex-col justify-center items-center gap-6 w-full aspect-590/230 p-6">
            <p className="text-heading2 tracking-heading2 leading-[90%] font-medium">
              {mission.title}
            </p>
            <p className="text-center text-bodyBase text-titleCopyColor tracking-base leading-[124%] max-w-127.5">
              {mission.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default About