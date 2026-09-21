import React from "react";
import Link from "next/link";
import CTA from "../CTA";

interface ApplicationSuccessProps {
    loanType?: string;
}

const ApplicationSuccess: React.FC<ApplicationSuccessProps> = ({ loanType }) => {
    return (
        <main className="@container min-h-screen w-full relative flex items-center justify-center px-4 sm:px-6 lg:px-10 py-12 md:py-16 force-font-figtree">
            <div className="flex flex-col gap-y-4 sm:gap-y-6 justify-center items-center w-full max-w-xl mx-auto text-center z-10 my-auto">
                <img
                    src="/common/bdc-capital-logo-text.svg"
                    alt="BDC Capital"
                    className="h-14 sm:h-18 md:h-22 w-auto object-contain"
                />

                {/* Success Checkmark Icon */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#E2F3EE] flex items-center justify-center my-1 shadow-sm shrink-0">
                    <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-[#005a45]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h3 className="text-[#005a45] text-2xl sm:text-3xl md:text-heading1 tracking-heading1 font-medium leading-[115%] px-2">
                    Application Submitted
                </h3>

                <p className="text-bodyBase sm:text-body1 text-mainTitleColor tracking-base font-medium leading-[124%] px-2">
                    Thank you for applying for {loanType ? `a ${loanType}` : "a loan"}
                </p>

                <p className="w-full text-sm sm:text-bodyBase text-mainTitleCopyColor tracking-base leading-[140%] text-center px-2 sm:px-4">
                    Your loan request has been successfully submitted. Our team will
                    review the information provided and a loan officer will contact you
                    within <span className="font-semibold text-mainTitleColor">48 working hours</span> to guide you on the next steps.
                </p>

                <p className="w-full text-xs sm:text-sm text-mainTitleCopyColor tracking-base leading-[140%] text-center px-2">
                    If you have any questions or need further clarification, you may reach
                    out to us at{" "}
                    <Link
                        href="mailto:siddhesh@bombaydc.com"
                        className="text-[#005a45] font-medium underline underline-offset-2 hover:text-[#023632] transition-colors"
                    >
                        siddhesh@bombaydc.com
                    </Link>
                </p>

                <div className="mt-2 sm:mt-4 w-full sm:w-auto flex justify-center">
                    <CTA href="/" ctaContent="Back to Home" />
                </div>
            </div>
        </main>
    );
};

export default ApplicationSuccess;
