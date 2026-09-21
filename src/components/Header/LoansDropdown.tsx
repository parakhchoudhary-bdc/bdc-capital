"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";

interface LoanItem {
  icon: string;
  name: string;
  href: string;
  tagline: string;
}

interface LoansDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeMobileMenu: () => void;
  triggerLabel: string;
  loans: LoanItem[];
}

const LoansDropdown: React.FC<LoansDropdownProps> = ({
  isOpen,
  setIsOpen,
  closeMobileMenu,
  triggerLabel,
  loans,
}) => {
  const pathname = usePathname();
  const isLoanPathActive = loans.some((link) => pathname === link.href);

  const handleLinkClick = () => {
    setIsOpen(false);
    closeMobileMenu();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <button
          className={`flex justify-center items-center gap-x-2 text-bodyBase tracking-base font-medium leading-[100%] transition-colors duration-300 py-4 outline-none cursor-pointer ${isOpen || isLoanPathActive ? "text-orange" : "text-mainTitleColor"
            }`}
        >
          {triggerLabel}
          <svg
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
          >
            <path
              d="M6.36391 4.94972L11.3137 0L12.7279 1.41421L6.36391 7.77822L0 1.41421L1.41421 0L6.36391 4.94972Z"
              fill="currentColor"
            />
          </svg>
        </button>
      }
    >
      <div
        className={`lg:absolute lg:top-20 lg:left-1/2 lg:-translate-x-1/2 lg:p-7.5 rounded-xl lg:w-max transition-opacity duration-300 bg-white shadow-md grid grid-cols-3 gap-4 sm:gap-5 lg:gap-7.5 max-w-full lg:max-w-175 lg:aspect-620/268 ${isOpen
            ? "opacity-100 visible h-fit max-h-250 lg:h-auto p-4 lg:p-7.5"
            : "opacity-0 invisible h-0 lg:h-auto p-0"
          }`}
      >
        {loans.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="col-span-3 lg:col-span-1 flex gap-2 lg:gap-0 lg:flex-col w-full"
          >
            <img src={link.icon} alt={link.name} className="h-8 w-8 mb-4" />
            <span className="flex flex-col gap-1 lg:gap-2">
              <span className="text-bodyBase tracking-base leading-[110%] font-medium text-titleColor">
                {link.name}
              </span>
              <span className="text-sm tracking-base leading-[124%] text-titleCopyColor text-wrap max-w-full lg:-w-[90%]">
                {link.tagline}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Dropdown>
  );
};

export default LoansDropdown;