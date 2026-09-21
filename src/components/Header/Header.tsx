"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import CTA from "@/components/CTA";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useLanguage } from "@/context/LanguageContext";

import DesktopMobileMenu from "./DesktopMobileMenu";
import LoansDropdown from "./LoansDropdown";
import LanguageDropdown from "./LanguageDropdown";
import enCommon from "@/locales/en/common.json";
import mrCommon from "@/locales/mr/common.json";

const Header: React.FC = () => {
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { language, updateLanguage } = useLanguage();
  const t = language === "mr" ? mrCommon.header : enCommon.header;

  useBodyScrollLock({ isLocked: isMenuOpen });

  const handleLanguageSelect = useCallback(
    (lang: "en" | "mr") => {
      updateLanguage(lang);
      setIsLanguageOpen(false);
    },
    [updateLanguage],
  );

  // Close loans dropdown when mobile menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setIsLoansOpen(false);
    }
  }, [isMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Preparation of content for dependent components
  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.about, href: "/about-us" },
    { label: t.contact, href: "/contact-us" },
  ];

  const loanLinks = [
    { icon: "/icons/diversity.svg", href: "/personal-loan" },
    { icon: "/icons/business_center.svg", href: "/business-loan" },
    { icon: "/icons/house.svg", href: "/housing-loan" },
    { icon: "/icons/directions_car.svg", href: "/vehicle-loan" },
    { icon: "/icons/real_estate_agent.svg", href: "/loan-against-property" },
    { icon: "/icons/money_bag.svg", href: "/cash-credit-facility" },
  ].map((link, index) => ({
    ...link,
    name: t.loans_dropdown[index]?.loanTitle || "",
    tagline: t.loans_dropdown[index]?.loanDescription || "",
  }));

  return (
    <header className="w-full h-fit fixed top-0 py-3.5 px-4 md:px-6 lg:px-10 flex justify-between items-center z-50 bg-white shadow-md">
      <Link
        href={"/"}
        className="flex justify-center items-center h-13 md:h-16 asepct-136/64"
      >
        <img
          src="/common/bdc-capital-logo-text.svg"
          alt="BDC Capital"
          className="h-full w-auto"
        />
      </Link>

      <DesktopMobileMenu
        isOpen={isMenuOpen}
        onClose={closeMobileMenu}
        navLinks={navLinks}
      >
        <LoansDropdown
          isOpen={isLoansOpen}
          setIsOpen={setIsLoansOpen}
          closeMobileMenu={closeMobileMenu}
          triggerLabel={t.loans}
          loans={loanLinks}
        />
      </DesktopMobileMenu>

      <div className="flex justify-center items-center gap-x-2.5 md:gap-x-4">
        <CTA target="_blank" href="/apply" ctaContent={t.applyNow} className="hidden lg:flex" />

        <LanguageDropdown
          isOpen={isLanguageOpen}
          setIsOpen={setIsLanguageOpen}
          englishLabel={t.english}
          marathiLabel={t.marathi}
          onLanguageChange={handleLanguageSelect}
          language={language}
        />

        <button
          className="menu-button h-8 w-8 flex lg:hidden"
          onClick={toggleMobileMenu}
        >
          <img
            src="/icons/menu_open.svg"
            alt="Menu"
            className="h-full w-full"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
