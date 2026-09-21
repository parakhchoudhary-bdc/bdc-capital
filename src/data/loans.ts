export interface LoanConfig {
  id: string;
  pathname: string;
  bannerImg: string;
  bannerHref1: string;
  bannerHref2: string;
  benefits: { icon: string }[];
  eligibility: { icon: string }[];
  whoCanApply: { img: string }[];
  conclusionImg: string;
  conclusionCtaHref: string;
  footerCtaHref: string;
}

export const loansConfig: LoanConfig[] = [
  {
    id: "personal-loan",
    pathname: "personal-loan",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/personal-loan",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/calendar_month.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-2.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/personal-loan",
    footerCtaHref: "/apply/personal-loan",
  },
  {
    id: "business-loan",
    pathname: "business-loan",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/business-loan",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/real_estate_agent.svg" },
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/business-loan",
    footerCtaHref: "/apply/business-loan",
  },
  {
    id: "housing-loan",
    pathname: "housing-loan",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/housing-loan",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/real_estate_agent.svg" },
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-2.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/housing-loan",
    footerCtaHref: "/apply/housing-loan",
  },
  {
    id: "vehicle-loan",
    pathname: "vehicle-loan",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/vehicle-loan",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/real_estate_agent.svg" },
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-2.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/vehicle-loan",
    footerCtaHref: "/apply/vehicle-loan",
  },
  {
    id: "loan-against-property",
    pathname: "loan-against-property",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/loan-against-property",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/real_estate_agent.svg" },
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-2.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/loan-against-property",
    footerCtaHref: "/apply/loan-against-property",
  },
  {
    id: "cash-credit-facility",
    pathname: "cash-credit-facility",
    bannerImg: "/images/loans/personal-loan.webp",
    bannerHref1: "/apply/cash-credit-facility",
    bannerHref2: "/contact-us",
    benefits: [
        { icon: "/icons/real_estate_agent.svg" },
        { icon: "/icons/rule.svg" },
        { icon: "/icons/arrow_split.svg" },
        { icon: "/icons/devices_fold.svg" },
        { icon: "/icons/map.svg" },
        { icon: "/icons/tornado.svg" },
    ],
    eligibility: [
        { icon: "/icons/account_circle.svg" },
        { icon: "/icons/currency_rupee.svg" },
    ],
    whoCanApply: [
        { img: "/images/loans/personal-loan-wca-1.webp" },
        { img: "/images/loans/personal-loan-wca-2.webp" },
        { img: "/images/loans/personal-loan-wca-3.webp" },
        { img: "/images/loans/personal-loan-wca-4.webp" },
    ],
    conclusionImg: "/images/loans/personal-loan-conclusion.webp",
    conclusionCtaHref: "/apply/cash-credit-facility",
    footerCtaHref: "/apply/cash-credit-facility",
  },
];
