"use client";
import React from "react";
import CTA from "./CTA";

interface CTACardProps {
  text: string;
  cta1?: string;
  href1?: string;
  onClick1?: () => void;
  cta2?: string;
  href2?: string;
  onClick2?: () => void;
  className?: string;
  target?: string;
}

const CTACard: React.FC<CTACardProps> = ({
  text,
  href1,
  cta1,
  onClick1,
  cta2,
  href2,
  onClick2,
  className,
  target,
}) => {
  return (
    <div
      className={`${className} max-w-103.5 h-fit rounded-xl bg-black/8 flex flex-col gap-y-7.5 backdrop-blur-xl p-6`}
    >
      <p className="text-bodyBase tracking-base text-[#fff]/60 leading-[124%] text-wrap">
        {text}
      </p>
      {(cta1 && (href1 || onClick1)) || (cta2 && (href2 || onClick2)) ? (
        <div className="flex gap-6 items-center">
          {cta1 && (href1 || onClick1) && (
            <CTA
              target={target}
              href={href1}
              onClick={onClick1}
              ctaContent={cta1}
            />
          )}
          {cta2 && (href2 || onClick2) && (
            <CTA
              target={target}
              href={href2}
              onClick={onClick2}
              ctaContent={cta2}
              variant={`secondary`}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CTACard;
