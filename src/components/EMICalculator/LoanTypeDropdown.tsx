"use client";
import React, { useEffect, useRef, useState } from "react";
import { LoanCalculatorType } from "@/types/loanCalculator-type";

interface LoanTypeDropdownProps {
  value: LoanCalculatorType;
  options: LoanCalculatorType[];
  onChange: (v: LoanCalculatorType) => void;
}

const LoanTypeDropdown: React.FC<LoanTypeDropdownProps> = ({
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative mb-6 md:mb-7 lg:mb-10">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full border border-borderColor rounded-sm text-bodyBase tracking-base @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] font-medium outline-none focus:border-[#005a45] focus:ring-1 focus:ring-[#005a45] transition-colors cursor-pointer p-4.5 text-left flex items-center justify-between text-titleColor"
      >
        <span>{value.label}</span>

        {/* Arrow */}
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.65375 6.7075L0 1.05375L1.05375 0L5.65375 4.6L10.2537 0L11.3075 1.05375L5.65375 6.7075Z"
              fill="#1C1B1F"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-borderColor text-titleColor rounded-sm shadow font-medium">
          {options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left p-3 text-body1 tracking-base leading-[100%] transition-colors cursor-pointer
                ${
                  opt.label === value.label
                    ? "bg-[#E2F3EE] text-[#005a45] font-semibold"
                    : "hover:bg-[#E2F3EE] hover:text-[#005a45]"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanTypeDropdown;
