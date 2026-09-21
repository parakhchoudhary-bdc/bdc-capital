"use client";
import React from "react";

interface SectionHeaderProps {
  heading: string;
  text?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  text,
  className,
}) => {
  return (
    <div
      className={`col-span-4 md:col-start-2 md:col-span-2 w-full h-fit flex flex-col gap-y-4 md:gap-y-6 justify-center items-center ${className}`}
    >
      <h3 className="text-[28px] sm:text-heading1 tracking-heading1 leading-[100%] max-w-147.5 text-center text-mainTitleColor font-medium">
        {heading.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h3>
      {text && (
        <p className="text-bodyBase tracking-base leading-[136%] max-w-118 text-center text-mainTitleCopyColor">
          {text.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
