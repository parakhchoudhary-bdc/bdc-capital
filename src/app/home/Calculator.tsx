"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { loans } from "@/data/loansCalculator";
import { LoanCalculatorType } from "@/types/loanCalculator-type";
import RangeInput from "@/components/EMICalculator/RangeInput";
import LoanTypeDropdown from "@/components/EMICalculator/LoanTypeDropdown";
import CTA from "@/components/CTA";
import { useLanguage } from "@/context/LanguageContext";
import enHome from "@/locales/en/home.json";
import mrHome from "@/locales/mr/home.json";
import enCommon from "@/locales/en/common.json";
import mrCommon from "@/locales/mr/common.json";

const formatCurrency = (v: number) =>
  `${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(v)}`;

const Calculator: React.FC = () => {
  const { language } = useLanguage();
  const t = language === "mr" ? mrHome.emiCalculatorSection : enHome.emiCalculatorSection;
  const common = language === "mr" ? mrCommon : enCommon;

  // Map hardcoded data labels to localized titles from common.json
  const localizedLoans = useMemo(() => {
    return loans.map(loan => {
      // Find the index of this loan in the English common data
      const index = enCommon.header.loans_dropdown.findIndex(
        d => d.loanTitle.toLowerCase() === loan.label.toLowerCase()
      );

      // Use that index to get the title in the current language
      const localizedTitle = index !== -1
        ? common.header.loans_dropdown[index].loanTitle
        : loan.label;

      return {
        ...loan,
        label: localizedTitle
      };
    });
  }, [common, language]);

  const [loanType, setLoanType] = useState<LoanCalculatorType>(localizedLoans[0]);
  const [amount, setAmount] = useState(loanType.amount);
  const [interest, setInterest] = useState(loanType.rate);
  const [tenure, setTenure] = useState(loanType.tenture);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Sync state if language changes the selected loanType object reference
  useEffect(() => {
    const currentLocalized = localizedLoans.find(l => l.maxAmount === loanType.maxAmount && l.minRate === loanType.minRate) || localizedLoans[0];
    setLoanType(currentLocalized);
  }, [localizedLoans]);

  useEffect(() => {
    const r = interest / 12 / 100;
    const n = tenure * 12;
    if (!r) return;

    const emiVal = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setEmi(Math.round(emiVal));
    setTotalInterest(Math.round(emiVal * n - amount));
  }, [amount, interest, tenure]);

  const handleLoanTypeChange = useCallback((selected: LoanCalculatorType) => {
    setLoanType(selected);
    setAmount(selected.amount);
    setInterest(selected.rate);
    setTenure(selected.tenture);
  }, []);

  return (
    <div className="grid grid-cols-4 col-span-4 gap-x-4 md:gap-x-10 @6xl:gap-x-15 items-stretch rounded-xl w-full h-fit p-4 md:p-6 lg:p-10 bg-sectionBreak">
      <div className="col-span-4 @4xl:col-span-2">
        <LoanTypeDropdown
          value={loanType}
          options={localizedLoans}
          onChange={handleLoanTypeChange}
        />

        <RangeInput
          label={t.loanAmountLabel}
          prefix="₹"
          value={amount}
          min={loanType.minAmount}
          max={loanType.maxAmount}
          step={50000}
          formatter={(v) =>
            new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 0,
            }).format(v)
          }
          onChange={setAmount}
        />

        <RangeInput
          label={t.interestRateLabel}
          value={interest}
          min={loanType.minRate}
          max={loanType.maxRate}
          step={0.01}
          unit="%"
          onChange={setInterest}
        />

        <RangeInput
          label={t.tenureLabel}
          value={tenure}
          min={loanType.minTenture}
          max={loanType.maxTenture}
          step={0.5}
          unit={language === "mr" ? "वर्षे" : "Y"}
          onChange={setTenure}
          disabled={true}
        />
      </div>

      <div className="col-span-4 @4xl:col-span-2 border border-borderColor rounded-lg p-4 md:p-6 lg:p-10 text-center w-full h-fit @4xl:h-full flex flex-col justify-center gap-y-6 md:gap-y-7.5 items-center">
        <div className="p-4 md:p-6 bg-white w-full h-fit flex flex-col justify-center rounded-xl flex-1">
          <img
            src={"/icons/event_upcoming.svg"}
            alt="EMI Calculator"
            className="h-8 w-8 mx-auto mb-2 @4xl:mb-4"
          />
          <p className="text-body1 tracking-body1 lg:text-subHeading lg:tracking-subHeading text-titleCopyColor leading-[100%] mb-1.5 @4xl:mb-3">
            {t.monthlyEmiLabel}
          </p>
          <p className="text-orange text-heading1 tracking-heading1 lg:text-display lg:tracking-display xl:text-6xl font-medium leading-[100%] flex gap-2 justify-center">
            <span>₹</span>
            {formatCurrency(emi)}
          </p>

          <div className="flex justify-center items-center relative mt-6 md:mt-8 lg:mt-10 gap-7.5">
            <div>
              <p className="text-body2 tracking-base leading-[100%] text-titleCopyColor mb-4">
                {t.principalAmountLabel}
              </p>
              <p className="text-body2 tracking-base font-medium @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] text-titleColor">
                ₹ {formatCurrency(amount)}
              </p>
            </div>

            <div className="w-px h-11 bg-borderColor" />

            <div>
              <p className="text-body2 tracking-base leading-[100%] text-titleCopyColor mb-4">
                {t.interestAmountLabel}
              </p>
              <p className="text-body2 tracking-base font-medium @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] text-titleColor">
                ₹ {formatCurrency(totalInterest)}
              </p>
            </div>
          </div>
        </div>
        <CTA target="_blank" ctaContent={t.applyNow} href="/apply" />
      </div>
    </div>
  );
};

export default Calculator;
