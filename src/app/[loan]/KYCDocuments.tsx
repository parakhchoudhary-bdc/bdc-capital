"use client";
import SectionHeader from "@/components/SectionHeader";
import React from "react";

interface kycData {
  point: string;
}

interface kycInterface {
  title: string;
  kycItems: kycData[];
}

interface kycProps {
  heading: string;
  kyc: kycInterface[];
}

const KYCDocuments: React.FC<kycProps> = ({heading, kyc}) => {
  return (
    <section className="@container bg-white grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 lg:gap-y-15 px-4 md:px-6 lg:px-10 py-15 lg:py-20">
      <SectionHeader heading={heading} />

      <div className="col-span-4 grid grid-cols-12 gap-x-4 md:gap-x-5 gap-y-6 lg:gap-y-10 items-stretch">
        {kyc.map((category, index) => (
          <div
            key={index}
            className={`h-auto col-span-12 sm:col-span-6 ${kyc.length > 2 && "lg:col-span-4 lg:aspect-square"} w-full border border-borderColor rounded-xl flex flex-col justify-between items-start gap-7 p-5 md:p-6`}
          >
            <p className="text-heading2 tracking-heading2 text-titleColor leading-[110%] font-medium">
              {category.title}
            </p>

            <ul className="flex flex-col text-titleCopyColor w-full list-disc list-outside pl-4">
              {category.kycItems.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={`text-bodyBase tracking-base leading-[124%] ${
                    itemIndex === 0
                      ? "py-5 @6xl:py-6 border-b border-borderColor"
                      : itemIndex < category.kycItems.length - 1
                        ? "py-5 @6xl:py-6 border-b border-borderColor"
                        : "pt-5 @6xl:pt-6"
                  }`}
                >
                  {item.point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KYCDocuments;