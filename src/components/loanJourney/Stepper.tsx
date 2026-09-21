"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLoanApplication } from "@/hooks/useLoanApplication";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const router = useRouter();
  const { clearLoanData } = useLoanApplication();

  const handleLogoClick = () => {
    if (confirm("Are you sure you want to leave? Your progress will be lost.")) {
      clearLoanData();
      router.push("/");
    }
  };

  // const progress = steps.length > 0 ? (currentStep / steps.length) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 w-full flex flex-col z-50">
      <div className="w-full bg-white flex flex-row lg:flex-col justify-between items-center lg:justify-center px-4 md:px-6 lg:px-10">
        <div className="flex justify-start lg:justify-center items-center w-fit lg:w-full h-fit py-2">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <img
              src="/common/bdc-capital-logo-text.svg"
              alt="bdc-capital-logo"
              className="h-12 md:h-15 w-auto lg:-mt-0.5"
            />
          </div>
        </div>
        <div className="w-fit lg:max-w-275 flex justify-center items-center lg:mx-auto h-fit py-2 md:py-3 overflow-x-hidden gap-x-10">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <React.Fragment key={index}>
                <div className={`items-center shrink-0 h-fit gap-2 ${isActive ? "flex" : "hidden lg:flex"}`}>
                  <span
                    className={`h-7.5 w-7.5 flex justify-center items-center rounded-full transition-all duration-300 text-body2 tracking-base text-white ${isActive || isCompleted ? "bg-[#005a45]" : "bg-titleCopyColor"
                      }`}
                  >
                    {stepNumber}
                  </span>
                  <p
                    className={`text-body2 tracking-base transition-all duration-300 ${isActive || isCompleted ? "text-mainTitleColor" : "text-titleCopyColor"
                      }`}
                  >
                    {step}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
