"use client";
import React from 'react';

interface ApproachCardProps {
  img_url: string;
  title: string;
  alt: string;
}

const OurApproachCard: React.FC<ApproachCardProps> = ({img_url, title, alt}) => {
  return (
    <div className="w-[70vw] sm:w-[50vw] lg:w-[35vw] xl:w-[30vw] 2xl:w-[27.5vw] shrink-0 flex flex-col gap-y-6 h-fit">
      <div className="w-full aspect-347/261 rounded-xl md:rounded-[14px] h-auto flex-1 overflow-hidden">
        <img
          src={img_url}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <p className="text-subHeading tracking-subHeading leading-[110%] text-titleColor font-medium text-wrap">
        {title}
      </p>
    </div>
  );
}

export default OurApproachCard;