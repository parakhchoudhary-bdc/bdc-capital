"use client";
import React from "react";
import Dropdown from "./Dropdown";

interface LanguageDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  englishLabel: string;
  marathiLabel: string;
  onLanguageChange: (lang: "en" | "mr") => void;
  language: "en" | "mr";
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen,
  setIsOpen,
  englishLabel,
  marathiLabel,
  onLanguageChange,
  language,
}) => {
  const handleLanguageSelect = (lang: "en" | "mr") => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const selectedLanguageLabel = language === "en" ? englishLabel : marathiLabel;

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <button
          className={`px-4 md:px-5 py-3 md:py-4 gap-x-2 text-body2 tracking-base text-orange font-medium leading-[80%] flex justify-center items-center outline-none border-[1.5px] border-orange rounded-full cursor-pointer w-28.75`}
        >
          {selectedLanguageLabel}
          <svg
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
          >
            <path
              d="M6.36391 4.94972L11.3137 0L12.7279 1.41421L6.36391 7.77822L0 1.41421L1.41421 0L6.36391 4.94972Z"
              fill="#005a45"
            />
          </svg>
        </button>
      }
    >
      <div className="flex justify-center items-center w-fit gap-x-3">
        <div
          className={`absolute top-15 left-1/2 -translate-x-1/2 w-max transition-all duration-300 bg-white shadow-md flex flex-col justify-center items-start rounded-sm max-w-30 px-5 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <p
            onClick={() => handleLanguageSelect("en")}
            className="py-4 border-b border-mainTitleCopyColor text-bodyBase tracking-base leading-[120%] text-mainTitleCopyColor cursor-pointer hover:text-orange transition-colors w-full"
          >
            {englishLabel}
          </p>
          <p
            onClick={() => handleLanguageSelect("mr")}
            className="py-4 text-bodyBase tracking-base leading-[120%] text-mainTitleCopyColor cursor-pointer hover:text-orange transition-colors w-full"
          >
            {marathiLabel}
          </p>
        </div>
      </div>
    </Dropdown>
  );
};

export default LanguageDropdown;
