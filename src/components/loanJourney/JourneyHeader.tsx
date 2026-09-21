"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useLoanApplication } from "@/hooks/useLoanApplication";

const JourneyHeader: React.FC = () => {
  const router = useRouter();
  const { clearLoanData } = useLoanApplication();

  const handleLogoClick = () => {
    if (confirm("Are you sure you want to leave? Your progress will be lost.")) {
      clearLoanData();
      router.push("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-fit py-2 px-4 md:px-6 lg:px-10 z-50 bg-white">
      <div onClick={handleLogoClick} className="cursor-pointer">
        <img
          src="/common/bdc-capital-logo-text.svg"
          alt="bdc-capital-logo"
          className="h-12 md:h-15 w-auto -mt-0.5"
        />
      </div>
    </div>
  );
};

export default JourneyHeader;
