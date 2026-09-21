"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import enCommon from "@/locales/en/common.json";
import mrCommon from "@/locales/mr/common.json";

const SitemapClient = () => {
    const { language } = useLanguage();
    const t = language === "mr" ? mrCommon : enCommon;

    const sitemapData = [
        {
            category: t.footer.quickLocation.title,
            links: [
                { name: t.footer.quickLocation.links.home, href: "/" },
                { name: t.footer.quickLocation.links.aboutUs, href: "/about-us" },
                { name: t.footer.quickLocation.links.contactUs, href: "/contact-us" },
                { name: t.header.applyNow, href: "/apply" },
            ],
        },
        {
            category: t.footer.loanSolutions.title,
            links: [
                { name: t.footer.loanSolutions.links.personalLoan, href: "/personal-loan" },
                { name: t.footer.loanSolutions.links.businessLoan, href: "/business-loan" },
                { name: t.footer.loanSolutions.links.housingLoan, href: "/housing-loan" },
                { name: t.footer.loanSolutions.links.vehicleLoan, href: "/vehicle-loan" },
                { name: t.footer.loanSolutions.links.loanAgainstProperty, href: "/loan-against-property" },
                { name: t.footer.loanSolutions.links.cashCreditFacility, href: "/cash-credit-facility" },
            ],
        },
        {
            category: t.footer.supportLegal.title,
            links: [
                { name: t.footer.supportLegal.links.privacyPolicy, href: "/privacy-policy" },
                { name: t.footer.supportLegal.links.termsConditions, href: "/terms-conditions" },
                { name: (t.footer.supportLegal.links as any).sitemap, href: "/sitemap" },
            ],
        },
    ];

    return (
        <main className="min-h-screen px-4 md:px-6 lg:px-10 pt-30 pb-20 bg-sectionBreak">
            <section className="py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-12 md:gap-y-20 max-w-7xl mx-auto">
                <div className="col-span-4 flex flex-col gap-6 items-start border-b border-borderColor pb-6">
                    <h1 className="text-heading1 tracking-heading1 leading-[110%] font-medium text-titleColor">
                        {language === "mr" ? "साईट मॅप" : "Sitemap"}
                    </h1>
                </div>
                {sitemapData.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <div className="col-span-4 md:col-span-2 flex flex-col gap-4">
                            <h3 className="text-heading2 tracking-heading2 font-medium leading-[100%] text-titleColor">
                                {section.category}
                            </h3>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex flex-col gap-y-4 md:gap-y-6">
                            <ul className="flex flex-col gap-y-4">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor hover:text-orange transition-colors duration-300 flex items-center gap-3 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange scale-0 group-hover:scale-100 transition-transform duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {idx < sitemapData.length - 1 && (
                            <div className="col-span-4 h-px bg-titleCopyColor/10 w-full" />
                        )}
                    </React.Fragment>
                ))}
            </section>
        </main>
    );
};

export default SitemapClient;
