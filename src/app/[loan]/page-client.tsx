"use client";
import Banner from "@/components/Banner";
import React, { useRef, useEffect } from "react";
import Benefits from "./Benefits";
import ProcessSection from "@/components/Process";
import WhoCanApply from "./WhoCanApply";
import KYCDocuments from "./KYCDocuments";
import FAQ from "./FAQ";
import ConclusionSection from "@/components/ConclusionSection";
import About from "@/components/About";
import ListingSection from "@/components/ListingSection";
import { useMainRef } from "@/context/MainRefContext";
import { useFooter } from "@/context/FooterContext";
import { useLanguage } from "@/context/LanguageContext";
import { usePopup } from "@/context/PopupContext";
import enLoans from "@/locales/en/loans.json";
import mrLoans from "@/locales/mr/loans.json";
import { loansConfig } from "@/data/loans";

interface BenefitsData {
  icon: string;
  benefitText: string;
}

interface EligibilityData {
  icon: string;
  title: string;
  description: string;
}

interface WhoCanApplyData {
  img: string;
  title: string;
}

interface processData {
  step: number | string;
  title: string;
  description: string;
}

interface kycData {
  point: string
}

interface kycInterface {
  title: string;
  kycItems: kycData[];
}


interface FAQItem {
  question: string;
  answer: string;
}

interface Loan {
  id: string;
  pathname: string;
  title: string;
  bannerImg: string;
  bannerTitle: string;
  bannerCardText: string;
  bannerCta1: string;
  bannerHref1: string;
  bannerCta2?: string;
  bannerHref2?: string;

  aboutHeading: string,
  aboutDescription: string;

  benefitsHeading: string;
  benefits: BenefitsData[];

  eligibilityHeading: string;
  eligibilitySectionText: string;
  eligibility: EligibilityData[];
  eligibilityConclusion: string;

  whoCanApplyHeading: string;
  whoCanApply: WhoCanApplyData[];

  processHeading: string;
  process: processData[];

  kycHeading: string;
  kyc: kycInterface[];

  conclusionImg: string;
  conclusionHeading: string;
  conclusionText: string;
  conclusionCtaContent: string;
  conclusionCtaHref: string;

  footerHeading: string;
  footerText: string;
  footerCtaContent: string;
  footerCtaHref: string;

  faqHeading: string;
  faq: FAQItem[];
}

interface LoansClientProps {
  loanPath: string;
}

const LoansClient: React.FC<LoansClientProps> = ({ loanPath }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { setMainRef } = useMainRef();
  const { setFooterContent } = useFooter();
  const { language } = useLanguage();
  const { openPopup } = usePopup();
  const t = language === "mr" ? mrLoans : enLoans;

  const selectedLoanBase = loansConfig.find((item) => item.pathname === loanPath);
  const selectedLoanTrans = t.loansData.find(
    (item: any) => item.id === selectedLoanBase?.id || item.pathname === loanPath
  );

  useEffect(() => {
    if (mainRef.current) {
      setMainRef(mainRef);
    }

    if (selectedLoanTrans) {
      setFooterContent({
        heading: selectedLoanTrans.footerHeading,
        description: selectedLoanTrans.footerText,
        ctaContent: selectedLoanTrans.footerCtaContent,
        href: selectedLoanTrans.footerCtaHref,
      });
    }

    return () => {
      setFooterContent(null);
    };
  }, [setFooterContent, setMainRef, mainRef, selectedLoanTrans]);


  if (!selectedLoanBase || !selectedLoanTrans) {
    return null; // Or some 404/Error component
  }

  // Merge static assets with translated text
  const loan: Loan = {
    ...(selectedLoanTrans as any),
    // Prioritize static config for functional paths but allow JSON overrides if they exist
    bannerImg: selectedLoanTrans.bannerImg || selectedLoanBase.bannerImg,
    bannerHref1: selectedLoanBase.bannerHref1,
    bannerHref2: selectedLoanBase.bannerHref2,
    benefits: selectedLoanBase.benefits.map((b, i) => ({
      ...b,
      benefitText: selectedLoanTrans.benefits[i]?.benefitText || "",
      icon: selectedLoanTrans.benefits[i]?.icon || b.icon,
    })),
    eligibility: selectedLoanBase.eligibility.map((e, i) => ({
      ...e,
      title: selectedLoanTrans.eligibility[i]?.title || "",
      description: selectedLoanTrans.eligibility[i]?.description || "",
      icon: selectedLoanTrans.eligibility[i]?.icon || e.icon,
    })),
    whoCanApply: selectedLoanBase.whoCanApply.map((w, i) => ({
      ...w,
      title: selectedLoanTrans.whoCanApply[i]?.title || "",
      img: selectedLoanTrans.whoCanApply[i]?.img || w.img,
    })),
    conclusionImg: selectedLoanTrans.conclusionImg || selectedLoanBase.conclusionImg,
    conclusionCtaHref: selectedLoanBase.conclusionCtaHref,
    footerCtaHref: selectedLoanBase.footerCtaHref,
  };

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen w-full overflow-hidden z-10"
    >
      <Banner
        bannerImg={`${loan.bannerImg}`}
        title={`${loan.bannerTitle}`}
        text={`${loan.bannerCardText}`}
        cta1={`${loan.bannerCta1}`}
        href1={`${loan.bannerHref1}`}
        cta2={`${loan.bannerCta2}`}
        onClick2={openPopup}
      />
      <About
        title={`${loan.aboutHeading}`}
        description={`${loan.aboutDescription}`}
        gradientAdjustment="-right-[30%] md:-right-[30%] -top-[40%] @6xl:-right-[30vw] @6xl:-top-[90vh]"
      />
      <Benefits id={loan.id} benefits={loan.benefits} title={loan.benefitsHeading} />
      <ListingSection
        heading={loan.eligibilityHeading}
        text={loan.eligibilitySectionText}
        bgColor="bg-sectionBreak"
        flexDirection="flex-col"
        items={loan.eligibility}
        conclusion={loan.eligibilityConclusion}
      />
      <WhoCanApply whoCanApplyHeading={loan.whoCanApplyHeading} applicantsData={loan.whoCanApply} />
      <ProcessSection
        title={loan.processHeading}
        steps={loan.process}
        bgColor="bg-white"
      />
      <KYCDocuments heading={loan.kycHeading} kyc={loan.kyc} />
      <ConclusionSection
        img_url={loan.conclusionImg}
        img_object_position="object-[35%_100%]"
        title={loan.conclusionHeading}
        text={
          loan.conclusionText
        }
        href={loan.conclusionCtaHref}
        ctaContent={loan.conclusionCtaContent}
        target="_blank"
      />
      <FAQ heading={loan.faqHeading} faq={loan.faq} />
    </main>
  );
};

export default LoansClient;
