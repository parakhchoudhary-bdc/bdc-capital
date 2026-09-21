import React from "react";
import Link from "next/link";
import CTA from "../CTA";

interface ApplicationSuccessProps {
    loanType?: string;
}

const ApplicationSuccess: React.FC<ApplicationSuccessProps> = ({ loanType }) => {
    return (
        <main className="@container min-h-screen w-full relative grid grid-cols-4 gap-x-4 md:gap-x-5 px-4 md:px-6 lg:px-10 py-10 md:py-15 lg:py-20 force-font-figtree">
            <div className="flex flex-col gap-y-6 justify-center items-center w-max mx-auto col-span-4">
                <img src="/common/bdc-capital-logo-text.svg" alt="BDC Capital" className="h-25 w-auto" />
                <h3 className="text-[#005a45] text-heading1 tracking-heading1 font-medium leading-[110%]">
                    Application Submitted
                </h3>
                <p className="text-body1 text-mainTitleColor tracking-base font-medium leading-[124%]">
                    Thank you for applying for {loanType ? `a ${loanType}` : "a loan"}
                </p>
                <p className="max-w-147.5 text-bodyBase text-mainTitleCopyColor tracking-base leading-[124%] text-center">
                    Your loan request has been successfully submitted. Our team will
                    review the information provided and a loan officer will contact you
                    within 48 working hours to guide you on the next steps.
                </p>
                <p className="max-w-147.5 text-bodyBase text-mainTitleCopyColor tracking-base leading-[124%] text-center">
                    If you have any questions or need further clarification, you may reach
                    out to us at{" "}
                    <Link
                        href={"mailto:siddhesh@bombaydc.com"}
                        className="text-mainTitleColor font-medium underline underline-offset-1"
                    >
                        siddhesh@bombaydc.com
                    </Link>
                </p>
                <CTA href="/" ctaContent="Back to Home" />
            </div>
        </main>
    );
};

export default ApplicationSuccess;
