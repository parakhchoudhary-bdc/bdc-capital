"use client";
import React from "react";

interface JourneyFooterProps {
  onBack?: () => void;
  backLabel?: string;
  continueLabel?: string;
  isSubmit?: boolean;
  disabled?: boolean;
}

const JourneyFooter: React.FC<JourneyFooterProps> = ({
  onBack,
  backLabel = "Back",
  continueLabel = "Continue",
  isSubmit = true,
  disabled = false,
}) => {
  return (
    <div className="w-full fixed left-0 bottom-0 bg-sectionBreak px-4 md:px-6 lg:px-10 py-3 shadow-top">
      <div className="max-w-174.5 mx-auto flex justify-between items-center">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer flex items-center justify-center bg-transparent text-[#005a45] text-[15px] tracking-base gap-2.5"
          >
            <img
              src="/icons/go_back.svg"
              alt="Go Back"
              className="h-3.5 w-3.5"
            />
            {backLabel}
          </button>
        ) : (
          <div /> // Empty div to maintain space-between if no back button
        )}
        <button
          type={isSubmit ? "submit" : "button"}
          disabled={disabled}
          className={`w-fit text-sm text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 ${
            disabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#005a45] hover:bg-[#023632] cursor-pointer"
          }`}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
};

export default JourneyFooter;
