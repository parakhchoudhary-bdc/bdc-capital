"use client";
import React from "react";
import ContactForm from "./Form";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import enContact from "@/locales/en/contact-us.json";
import mrContact from "@/locales/mr/contact-us.json";

const ContactUsClient = () => {
    const { language } = useLanguage();
    const t = language === "mr" ? mrContact : enContact;

    return (
        <main className="@container relative w-full h-fit pt-30 pb-20 px-4 md:px-6 lg:px-10 bg-sectionBreak">
            <section className="grid grid-rows-auto grid-cols-4 gap-x-4 md:gap-x-5 gap-y-15">
                <div className="col-span-4 md:col-span-2 flex flex-col gap-6 items-start">
                    <h3 className="text-heading1 tracking-heading1 font-medium leading-[100%]">
                        {t.heading}
                    </h3>
                    <p className="text-bodyBase tracking-base text-mainTitleCopyColor leading-[124%] max-w-118">
                        {t.text}
                    </p>
                </div>
                <div className="grid grid-cols-2 col-span-4 @6xl:col-span-2 @6xl:row-start-2 order-3 @6xl:order-2 @6xl:max-w-[90%] gap-4 md:gap-5 row-span-2">
                    <div className="col-span-2 rounded-xl bg-white p-6 gap-6 flex flex-col w-full h-fit">
                        <img
                            src="/icons/home_work.svg"
                            alt={t.addressContainer.title}
                            className="h-8 w-8"
                        />
                        <p className="text-subHeading tracking-subHeading text-titleColor leading-[110%]">
                            {t.addressContainer.title}
                        </p>
                        <p className="text-body2 tracking-base leading-[124%] text-titleCopyColor">
                            {t.addressContainer.address.split("\n").map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-xl bg-white p-6 gap-6 flex flex-col w-full h-fit">
                        <img
                            src="/icons/alternate_email.svg"
                            alt={t.emailContainer.title}
                            className="h-8 w-8"
                        />
                        <p className="text-subHeading tracking-subHeading text-titleColor leading-[110%]">
                            {t.emailContainer.title}
                        </p>
                        <Link
                            href={`mailto: ${t.emailContainer.email}`}
                            className="text-body2 tracking-base leading-[124%] text-titleCopyColor underline transition-colors duration-300 hover:text-orange"
                        >
                            {t.emailContainer.email}
                        </Link>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-xl bg-white p-6 gap-6 flex flex-col w-full h-fit">
                        <img
                            src="/icons/call.svg"
                            alt={t.contactContainer.title}
                            className="h-8 w-8"
                        />
                        <p className="text-subHeading tracking-subHeading text-titleColor leading-[110%]">
                            {t.contactContainer.title}
                        </p>
                        <Link
                            href="tel:+919819981354"
                            className="text-body2 tracking-base leading-[124%] text-titleCopyColor transition-colors duration-300 hover:text-[#005a45]"
                        >
                            {t.contactContainer.contact}
                        </Link>
                    </div>
                </div>
                <ContactForm />
            </section>
        </main>
    );
};

export default ContactUsClient;
