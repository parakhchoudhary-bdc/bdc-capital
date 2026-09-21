import React from "react";
import { Step } from "@/types/loanJourney";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { useForm } from "react-hook-form";

interface ReviewSubmitProps {
    steps: Step[];
    onEdit: (stepIndex: number) => void;
    onSubmit: () => void;
    onBack?: () => void;
    isSubmitting?: boolean;
    loanTypeLabel?: string;
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ steps, onEdit, onSubmit, onBack, isSubmitting = false, loanTypeLabel }) => {
    const { loanData } = useLoanApplication();
    const { register, handleSubmit, formState: { errors } } = useForm<{ consent: boolean }>();

    const onFinalSubmit = (data: { consent: boolean }) => {
        if (data.consent) {
            onSubmit();
        }
    };

    // Filter steps to exclude the review step itself (which is the last step)
    const summarySteps = steps.filter(step => step.title !== "Review & submit" && step.title !== "Review and submit");

    return (
        <>
            <div className="col-span-4 max-w-174.5 w-full mx-auto flex flex-col gap-6 order-1 font-figtree">
                {loanTypeLabel && (
                    <div className="p-2">
                        <h3 className="text-heading2 tracking-heading2 text-titleColor font-medium border-b border-[#005a45] pb-4 text-center">
                            {loanTypeLabel}
                        </h3>
                    </div>
                )}
                {summarySteps.map((step, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 border border-borderColor">
                        <div className="grid grid-cols-4 items-center mb-4 border-b border-borderColor pb-4">
                            <h3 className="col-span-3 text-subHeading tracking-subHeading font-medium text-titleColor">
                                {step.title}
                            </h3>
                            <button
                                type="button"
                                onClick={() => onEdit(index + 1)}
                                className="col-span-1 ml-auto text-body2 tracking-base font-medium text-[#005a45] hover:text-[#023632] transition-colors cursor-pointer"
                                aria-label={`Edit ${step.title}`}
                            >
                                Edit
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                            {step.form?.map((field) => {
                                if (!field.id) return null;
                                const value = (loanData as any)[field.id];
                                const isAlwaysVisible = field.id.toLowerCase().includes("aadhaar") || field.id.toLowerCase().includes("pan");

                                if (!isAlwaysVisible && (value === undefined || value === "")) return null;

                                return (
                                    <div key={field.id} className="flex flex-col gap-1">
                                        <p className="text-body2 tracking-base text-mainTitleCopyColor">
                                            {field.inputLabel}
                                        </p>
                                        <p className="text-bodyBase tracking-base text-mainTitleColor font-medium">
                                            {typeof value === "boolean"
                                                ? value ? "Yes" : "No"
                                                : value?.toString() || "-"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-174.5 col-span-4 mx-auto w-full order-2 flex flex-col gap-6 h-fit mt-6">
                <form onSubmit={handleSubmit(onFinalSubmit)} className="bg-white p-4 md:p-5 lg:p-6 border border-borderColor rounded-2xl flex flex-col gap-6">
                    <h3 className="col-span-3 text-subHeading tracking-subHeading text-titleColor font-medium">
                        Disclosure & Consent
                    </h3>

                    <p className="text-body2 tracking-base text-mainTitleCopyColor">
                        BDC Capital Private Limited operates as a registered Non-Banking Financial Company (NBFC) and follows applicable guidelines and regulatory directions issued by the Reserve Bank of India (RBI). All loan applications are evaluated as per defined internal policies to ensure responsible lending, transparency, and regulatory compliance.
                        <br />
                        Information shared by applicants is used solely for loan evaluation, verification, and compliance purposes, in accordance with the Privacy Policy. Loan approval, terms, and disbursement are subject to assessment and verification.
                    </p>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="consent"
                            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#005a45] focus:ring-[#005a45] accent-[#005a45]"
                            {...register("consent", { required: "Please accept the terms and conditions" })}
                        />
                        <label htmlFor="consent" className="text-body2 tracking-base text-mainTitleCopyColor">
                            I hereby declare that the information provided herein this application is true and correct to the best of my knowledge. I acknowledge having read and understood the terms and conditions and explicitly consent to the collection, storage, processing, and sharing of my personal data, including KYC information, in accordance with applicable laws and regulatory guidelines.
                        </label>
                    </div>
                    {errors.consent && (
                        <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
                    )}

                    <div className="w-full fixed left-0 bottom-0 bg-sectionBreak px-4 md:px-6 lg:px-10 py-3 shadow-top grid grid-cols-4 gap-x-4 md:gap-x-5">
                        <div className="max-w-174.5 mx-auto w-full flex justify-between items-center col-span-4 @6xl:col-start-2 @6xl:col-span-2">
                            {onBack ? (
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="cursor-pointer flex items-center justify-center bg-transparent text-[#004D47] text-[15px] tracking-base gap-2.5"
                                >
                                    <img src="/icons/go_back.svg" alt="Go Back" className="h-3.5 w-3.5" />
                                    Back
                                </button>
                            ) : <div />}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-fit text-sm text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#004D47] hover:bg-[#023632] cursor-pointer"
                                    }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReviewSubmit;
