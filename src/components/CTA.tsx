"use client";
import React from "react";
import Link from "next/link";

interface CTAProps {
  href?: string;
  ctaContent: string;
  variant?: "primary" | "secondary";
  className?: string;
  target?: string;
  onClick?: () => void;
}

const CTA: React.FC<CTAProps> = ({
  href,
  ctaContent,
  variant = "primary",
  className,
  target,
  onClick,
}) => {
  const variantStyles = {
    primary: "bg-[#005a45] hover:bg-[#023632] active:bg-[#022724] text-white font-medium shadow-md transition-all duration-300",
    secondary: "bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white hover:text-[#005a45] transition-all duration-300 font-medium shadow-sm",
  };

  const commonClasses = `${className} w-fit px-4 md:px-5 py-3 md:py-4 flex justify-center items-center transition-colors transition-normal rounded-full text-body2 tracking-base leading-[100%] cursor-pointer ${variantStyles[variant]}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={commonClasses}>
        {ctaContent}
      </button>
    );
  }

  return (
    <Link href={href || "#"} target={target} className={commonClasses}>
      {ctaContent}
    </Link>
  );
};

export default CTA;