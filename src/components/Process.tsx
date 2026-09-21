"use client";
import React from "react";
import VideoSection from "./VideoSection";

interface ProcessStep {
  step: string | number;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title: string;
  bgColor?: string;
  videoSrc?:  string;
  steps?: ProcessStep[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  title,
  bgColor = "bg-sectionBreak",
  steps,
  videoSrc
}) => {
  return (
    <section
      className={`@container flex flex-col justify-center items-center gap-y-8 md:gap-y-10 lg:gap-y-15 py-15 lg:py-20 h-fit overflow-hidden ${bgColor} ${videoSrc ? "px-4 md:px-6 lg:px-10" : ""}`}
    >
      <h3 className="col-span-4 text-center text-[28px] sm:text-heading1 tracking-heading1 leading-[100%] text-black font-medium px-4 md:px-6 lg:px-10">
        {title}
      </h3>

      {steps && <div className={`w-full col-span-4 flex justify-center @6xl:justify-evenly items-start flex-wrap relative px-4 md:px-6 lg:px-10 gap-8`}>
         <div
          // style={{
          //   background:
          //     "linear-gradient(90deg, #FF6600 0%, rgba(255, 103, 52, 0.00) 96.2%)",
          // }}
          className="bg-orange absolute h-px w-full hidden @6xl:block z-10 top-7.5 left-0"
        /> 

         {steps.map((step, index) => (
          <div
            key={index}
            className="w-[90%] sm:w-[45%] @6xl:w-[30%] min-w-72 h-fit flex flex-col gap-6 items-center @6xl:items-start z-20"
          >
            <p
              style={{ width: "clamp(2.5rem, 2.011rem + 2.17vw, 3.75rem)" }}
              className={`text-heading2 bg-orange leading-[100%] flex justify-center items-center text-white font-medium rounded-full aspect-square`}
            >
              {step.step}
            </p>
            <div className="flex flex-col gap-y-5 md:gap-y-6 justify-center items-center @6xl:items-start">
              <p className="text-subHeading leading-[100%] tracking-subHeading font-medium text-titleColor text-center @6xl:text-left @6xl:max-w-66.75">
                {step.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <p className="text-bodyBase leading-[124%] text-titleCopyColor tracking-base sm:max-w-[80%] mx-auto @6xl:mx-0 text-center @6xl:text-left max-w-66.75">
                {step.description}
              </p>
            </div>
          </div>
        ))} 
      </div>}
      {videoSrc && <div className="w-full mx-auto col-span-4">
        <VideoSection src={videoSrc}/>
      </div>}
    </section>
  );
};

export default ProcessSection;
