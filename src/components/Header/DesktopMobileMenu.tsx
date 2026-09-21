"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

interface DesktopMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  navLinks: NavLink[];
}

const DesktopMobileMenu: React.FC<DesktopMobileMenuProps> = ({
  isOpen,
  onClose,
  children,
  navLinks,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={`left-full flex flex-col lg:flex-row items-start lg:items-center gap-x-8 absolute lg:left-1/2 -translate-x-full lg:-translate-x-1/2 max-w-131 w-full h-screen lg:h-full lg:w-fit z-50 bg-white lg:bg-transparent pt-5 lg:pt-0 px-4 md:px-6 lg:px-0 top-0 lg:overflow-visible transition-all duration-500 ease-in-out ${isOpen
        ? "-translate-x-full opacity-100 pointer-events-auto"
        : "translate-x-0 opacity-0 pointer-events-none -z-10 lg:opacity-100 lg:pointer-events-auto lg:z-50"
        }`}
    >
      <button
        className="menu-close-button h-8 w-8 absolute right-4 top-6 lg:hidden"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#005a45"
          strokeWidth="1"
          className="h-full w-full"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Insert LoansDropdown or other children based on order if needed, 
          but usually Home is first. Let's map navLinks. */}
      {navLinks.map((link, index) => (
        <React.Fragment key={link.href}>
          <Link
            href={link.href}
            onClick={onClose}
            className={`text-bodyBase tracking-base font-medium leading-[100%] transition-colors duration-300 py-4 ${pathname === link.href
              ? "text-[#005a45]"
              : "text-mainTitleColor hover:text-[#005a45]"
              }`}
          >
            {link.label}
          </Link>
          {/* Insert children (LoansDropdown) after the first link (Home) */}
          {index === 0 && children}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default DesktopMobileMenu;
