"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFooter } from "@/context/FooterContext";
import CTA from "./CTA";
import { useLanguage } from "@/context/LanguageContext";
import enCommon from "@/locales/en/common.json";
import mrCommon from "@/locales/mr/common.json";
import { usePopup } from "@/context/PopupContext";

interface FooterProps {
  id: string;
  className?: string;
  target?: string;
}

const LINK_CLASS =
  "text-bodyBase tracking-base text-mainTitleCopyColor transition-colors duration-300 hover:text-[#004D47] leading-[124%]";

interface NavSection {
  titleKey: "quickLocation" | "loanSolutions" | "supportLegal";
  links: { label: string; href: string; onClick?: (e: React.MouseEvent) => void }[];
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ id, className, target }, ref) => {
    const { footerContent } = useFooter();
    const { language } = useLanguage();
    const { openPopup } = usePopup();
    const pathname = usePathname();
    const t = language === "mr" ? mrCommon.footer : enCommon.footer;

    const navSections: NavSection[] = [
      {
        titleKey: "quickLocation",
        links: [
          { label: t.quickLocation.links.home, href: "/" },
          { label: t.quickLocation.links.aboutUs, href: "/about-us" },
          { label: t.quickLocation.links.contactUs, href: "/contact-us" },
        ],
      },
      {
        titleKey: "loanSolutions",
        links: [
          { label: t.loanSolutions.links.personalLoan, href: "/personal-loan" },
          { label: t.loanSolutions.links.businessLoan, href: "/business-loan" },
          { label: t.loanSolutions.links.housingLoan, href: "/housing-loan" },
          { label: t.loanSolutions.links.vehicleLoan, href: "/vehicle-loan" },
          {
            label: t.loanSolutions.links.loanAgainstProperty,
            href: "/loan-against-property",
          },
          {
            label: t.loanSolutions.links.cashCreditFacility,
            href: "/cash-credit-facility",
          },
        ],
      },
      {
        titleKey: "supportLegal",
        links: [
          {
            label: t.supportLegal.links.requestCallBack,
            href: "#",
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              openPopup();
            },
          },
          {
            label: t.supportLegal.links.privacyPolicy,
            href: "/privacy-policy",
          },
          {
            label: t.supportLegal.links.termsConditions,
            href: "/terms-conditions",
          },
          {
            label: (t.supportLegal.links as any).sitemap,
            href: "/sitemap",
          },
        ],
      },
    ];

    return (
      <footer
        id={id}
        ref={ref}
        className={`flex flex-col w-full h-fit ${className}`}
      >
        {footerContent && (
          <div className="relative w-full h-fit py-20 lg:py-30 px-4 md:px-6 lg:px-10 bg-sectionBreak flex flex-col justify-center items-center gap-y-6">
            <h3 className="text-heading1 tracking-heading1 leading-[100%] font-medium text-center">
              {footerContent.heading}
            </h3>
            <p className="max-w-118 text-bodyBase tracking-base text-mainTitleCopyColor leading-[124%] text-center">
              {footerContent.description}
            </p>
            <CTA
              ctaContent={footerContent.ctaContent}
              href={footerContent.href}
              target={pathname === "/about-us" ? "_self" : "_blank"}
            />
          </div>
        )}

        <div className="@container px-4 md:px-6 lg:px-10 pt-8 lg:pt-10 bg-white w-full h-fit absolute top-full">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-5 border-y border-borderColor py-15 lg:py-20 items-stretch">
            {/* Brand column */}
            <div className="col-span-12 @6xl:col-span-6 flex flex-col gap-y-14 justify-between items-start mb-20 @6xl:mb-0">
              <div className="flex flex-col gap-y-5 w-full">
                <img
                  src="/common/bdc-capital-logo.svg"
                  alt="BDC Capital Footer Logo"
                  className="h-24 w-24 mb-6"
                />
                <p className="text-body1 tracking-base leading-[124%] text-mainTitleColor font-medium">
                  {t.bombaydc.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <p className="max-w-fit text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                  {t.address.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-body2 tracking-base leading-[124%] text-titleColor">
                  {t.cinNumber}
                </p>
                <p className="text-body2 tracking-base leading-[124%] text-titleColor">
                  {t.nbfcRegsistration}
                </p>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-12 gap-x-4 md:gap-x-5 gap-y-10 @6xl:flex @6xl:justify-between @6xl:items-start col-span-full @6xl:col-span-6 mb-6">
              {navSections.map(({ titleKey, links }) => (
                <div
                  key={titleKey}
                  className="col-span-6 sm:col-span-4 @6xl:w-56"
                >
                  <p className="text-body1 tracking-base leading-[110%] font-medium mb-6">
                    {t[titleKey].title}
                  </p>
                  <div className="flex flex-col gap-y-3.5">
                    {links.map(({ label, href, onClick }) => (
                      <Link
                        key={label}
                        href={href}
                        className={LINK_CLASS}
                        onClick={onClick}
                        target="_self"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="py-6 text-body2 text-titleCopyColor leading-[124%]">
            ©{" "}
            {language === "mr"
              ? new Date()
                .getFullYear()
                .toString()
                .split("")
                .map((d) => "०१२३४५६७८९"[parseInt(d)])
                .join("")
              : new Date().getFullYear()}{" "}
            {t.copyRight}
          </p>
        </div>
      </footer>
    );
  },
);

export default Footer;