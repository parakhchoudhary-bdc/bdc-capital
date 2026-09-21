"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";

interface applicantsDataType {
  img: string;
  title: string;
}

interface ApplicantProps {
  whoCanApplyHeading: string;
  applicantsData: applicantsDataType[];
}

const WhoCanApply: React.FC<ApplicantProps> = ({whoCanApplyHeading, applicantsData }) => {
  return (
    <section className="@container grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 lg:gap-y-15 px-4 md:px-6 lg:px-10 py-15 lg:py-20 bg-white">
      <SectionHeader heading={whoCanApplyHeading} />

      <ul className="grid grid-cols-4 gap-x-4 md:gap-x-5 col-span-4 gap-y-6 md:gap-y-6 lg:gap-y-10">
        {applicantsData.map((applicant, index) => (
          <li
            key={index}
            className="border border-borderColor rounded-2xl col-span-4 md:col-span-2 grid grid-cols-3 items-center gap-x-4 md:gap-x-5 overflow-hidden"
          >
            <div className="w-full aspect-square overflow-hidden col-span-1">
              <img
                src={applicant.img}
                alt={applicant.title}
                className="object-cover object-center h-full w-full"
              />
            </div>
            <p
              className={`text-[16px] tracking-base lg:text-subHeading lg:tracking-subHeading text-titleColor leading-[124%] font-medium col-span-2 pr-5 md:pr-0 md:max-w-[80%]`}
            >
              {applicant.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhoCanApply;