"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useQueryClient } from "@tanstack/react-query";
import SelectLoanType from "@/components/loanJourney/SelectLoanType";
import OTPVerification from "@/components/loanJourney/OtpVerification";
import Stepper from "@/components/loanJourney/Stepper";
import { useRouter } from "next/navigation";
import PersonalDetails from "@/components/loanJourney/PersonalDetails";
import EmployementDetails from "@/components/loanJourney/EmployementDetails";
import LoanSecurityDetails from "@/components/loanJourney/personalLoan/LoanSecurityDetails";
import PropertyLoanDetails from "@/components/loanJourney/housingLoan/PropertyLoanDetails";
import LAPPropertyDetails from "@/components/loanJourney/loanAgainstProperty/LAPPropertyDetails";
import VehicleLoanDetails from "@/components/loanJourney/vehicleLoan/VehicleLoanDetails";
import BusinessDetails from "@/components/loanJourney/businessLoan/BusinessDetails";
import ReviewSubmit from "@/components/loanJourney/ReviewSubmit";
import ApplicationSuccess from "@/components/loanJourney/ApplicationSuccess";
// import JourneyHeader from "@/components/loanJourney/JourneyHeader";
import { LoanJourney } from "@/types/loanJourney";
import { allLoanJourneys, common } from "@/data/loanJourney";

import { useLoanApplication } from "@/hooks/useLoanApplication";

import SuccessBackground from "@/components/loanJourney/SuccessBackground";

interface LoansJourneyClientProps {
  filteredData: LoanJourney[];
}



const LoansJourneyClient: React.FC<LoansJourneyClientProps> = ({
  filteredData,
}) => {
  const { loanData, updateLoanData, clearLoanData } = useLoanApplication();
  const router = useRouter();
  const [step, setStep] = useState<"select" | "otp" | "journey" | "success">("select");
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpCreatedAt, setOtpCreatedAt] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loanJourney = filteredData[0];
  const queryClient = useQueryClient();

  const journeySteps = useMemo(() => {
    if (!loanJourney?.loanJourney) return [];
    return Object.values(loanJourney.loanJourney).map((step) => step.title);
  }, [loanJourney]);

  const fullSteps = useMemo(() => {
    if (!loanJourney?.loanJourney) return [];
    return Object.values(loanJourney.loanJourney);
  }, [loanJourney]);

  const currentStepData = useMemo(() => {
    if (!loanJourney?.loanJourney) return null;
    const values = Object.values(loanJourney.loanJourney);
    return values[currentStep - 1];
  }, [loanJourney, currentStep]);

  const loanTitle = useMemo(() => {
    return allLoanJourneys.find((l) => l.pathname === loanJourney?.pathname || l.pathname === loanData.loanType)?.title || loanData.loanType || "";
  }, [loanJourney, loanData.loanType]);

  // Restore session if step is OTP/journey but state is empty
  useEffect(() => {
    if ((step === "otp" || step === "journey") && !loanData.mobileNumber) {
      setStep("select");
    }
  }, [step, loanData.mobileNumber]);

  // Prevent accidental navigation/refresh during journey & clear data on refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (step === "journey") {
        // Clear the data when the user confirms the leave/refresh
        clearLoanData();

        e.preventDefault();
        e.returnValue = "Are you sure you want to leave? Your progress will be cleared, and you will need to start over.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [step, clearLoanData]);

  // Scroll to top on step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, currentStep]);

  // Clear hidden fields within the current step when dependencies change
  useEffect(() => {
    if (step !== "journey" || !currentStepData || !('form' in currentStepData) || !Array.isArray(currentStepData.form)) return;

    const fieldsToClear: Record<string, undefined> = {};
    let hasChanges = false;

    currentStepData.form.forEach((field: any) => {
      // Check visibility
      let isVisible = true;
      if (field.visibilityRule) {
        const { dependsOn, showWhenValueIs } = field.visibilityRule;
        const dependencyIds = Array.isArray(dependsOn) ? dependsOn : [dependsOn];
        const allowedValues = Array.isArray(showWhenValueIs) ? showWhenValueIs : [showWhenValueIs];

        isVisible = dependencyIds.every((depId: string) => {
          const currentValue = (loanData as any)[depId];
          return allowedValues.includes(currentValue);
        });
      }

      // If hidden and has value, clear it
      if (!isVisible) {
        // Check if it has a value (undefined check is important to avoid loops if we already cleared it)
        const currentVal = (loanData as any)[field.id];
        if (currentVal !== undefined && currentVal !== "") {
          fieldsToClear[field.id] = undefined;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      updateLoanData(fieldsToClear);
    }
  }, [step, currentStepData, loanData, updateLoanData]);

  const generateNewOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpCreatedAt(Date.now());
    // Show OTP in alert as requested
    alert(`Your OTP for verification is: ${otp}`);
    return otp;
  };

  const options = allLoanJourneys.map((item) => ({
    value: item.pathname,
    label: item.title,
  }));

  const handleSendOtp = (data: any) => {
    // updateLoanData already handles merging and persistence to localStorage
    updateLoanData(data);
    // setStep("otp");

    // // Generate OTP briefly after step change to ensure UI is switched
    // setTimeout(() => {
    //   generateNewOtp();
    // }, 100);

    // Skip OTP verification and proceed to journey
    handleOtpVerified(data);
  };

  const handleResendOtp = () => {
    generateNewOtp();
  };

  const handleOtpVerified = (formData?: any) => {
    const currentData = { ...loanData, ...formData };
    // Send lead email (fire and forget)
    const loanTitle = allLoanJourneys.find((l) => l.pathname === currentData.loanType)?.title || currentData.loanType;

    // Create a payload with the readable loan type
    const payload = {
      ...currentData,
      loanType: loanTitle,
    };

    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error("Failed to send lead email:", error);
    });

    setStep("journey");
  };

  return (
    <>
      {step === "success" && <SuccessBackground />}
      {step === "select" && (
        <SelectLoanType
          formHeading={common.selectLoanType.formHeading}
          formDescription={common.selectLoanType.formDescription}
          ctaContent={common.selectLoanType.ctaContent}
          initialLoanType={loanJourney?.pathname}
          options={options}
          form={common.selectLoanType.form}
          onSuccess={handleSendOtp}
        />
      )}

      {/* {step === "otp" && (
        <OTPVerification
          phoneNumber={loanData.mobileNumber || ""}
          correctOtp={generatedOtp}
          otpCreatedAt={otpCreatedAt}
          onResend={handleResendOtp}
          onBack={() => setStep("select")}
          onVerify={handleOtpVerified}
        />
      )} */}

      {step === "journey" && (
        <main className="@container min-h-screen w-full relative grid grid-cols-4 gap-x-4 md:gap-x-5 px-4 md:px-6 lg:px-10 pt-25 md:pt-30 lg:pt-45 pb-30 bg-[#f1f1f1] force-font-figtree">
          <Stepper steps={journeySteps} currentStep={currentStep} />
          {(() => {
            if (!currentStepData) return null;

            const formConfig = (() => {
              if (!('form' in currentStepData)) return [];
              const rawForm = currentStepData.form;
              if (!rawForm || !Array.isArray(rawForm)) return [];

              return rawForm
                .filter(field => {
                  if (!field.visibilityRule) return true;
                  const { dependsOn, showWhenValueIs } = field.visibilityRule;
                  const dependencyIds = Array.isArray(dependsOn) ? dependsOn : [dependsOn];
                  const allowedValues = Array.isArray(showWhenValueIs) ? showWhenValueIs : [showWhenValueIs];

                  return dependencyIds.every(depId => {
                    const currentValue = (loanData as any)[depId];
                    return allowedValues.includes(currentValue);
                  });
                })
                .map(field => {
                  let updatedField = { ...field };

                  if (field.dynamicLabel) {
                    const depValue = (loanData as any)[field.dynamicLabel.dependsOn];
                    if (depValue && field.dynamicLabel.map[depValue]) {
                      updatedField.inputLabel = field.dynamicLabel.map[depValue];
                    }
                  }

                  if (field.dynamicPlaceholder) {
                    const depValue = (loanData as any)[field.dynamicPlaceholder.dependsOn];
                    if (depValue && field.dynamicPlaceholder.map[depValue]) {
                      updatedField.inputPlaceholder = field.dynamicPlaceholder.map[depValue];
                    }
                  }

                  return updatedField;
                });
            })();


            const handleEditFromReview = (stepIndex: number) => {
              setIsEditingFromReview(true);
              setCurrentStep(stepIndex);
            };

            const commonProps = {
              formConfig,
              onBack: (currentStep > 1 || isEditingFromReview) ? () => {
                if (isEditingFromReview) {
                  setIsEditingFromReview(false);
                  setCurrentStep(journeySteps.length);
                } else {
                  setCurrentStep((prev) => prev - 1);
                }
              } : undefined,
              onNext: () => {
                if (isEditingFromReview) {
                  setIsEditingFromReview(false);
                  setCurrentStep(journeySteps.length);
                } else if (currentStep < journeySteps.length) {
                  setCurrentStep((prev) => prev + 1);
                }
              }
            };

            // Check if current step is the last step (Review & Submit)
            if (currentStep === journeySteps.length) {
              return (
                <ReviewSubmit
                  key={currentStep}
                  steps={fullSteps}
                  onEdit={handleEditFromReview}
                  isSubmitting={isSubmitting}
                  onSubmit={async () => {
                    setIsSubmitting(true);
                    try {
                      const response = await fetch("/api/submit-application", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          loanType: loanJourney?.pathname,
                          formData: loanData,
                        }),
                      });

                      const result = await response.json();

                      if (result.success) {
                        clearLoanData();
                        setStep("success");
                      } else {
                        alert("Failed to submit application. Please try again.");
                      }
                    } catch (error) {
                      console.error("Submission error:", error);
                      alert("Something went wrong. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  onBack={commonProps.onBack}
                  loanTypeLabel={loanTitle}
                />
              );
            }

            if (currentStepData.component === "employment") {
              return <EmployementDetails key={currentStep} {...commonProps} />;
            } else if (currentStepData.component === "loan-security") {
              return <LoanSecurityDetails key={currentStep} {...commonProps} />;
            } else if (currentStepData.component === "business-details") {
              return <BusinessDetails key={currentStep} {...commonProps} />;
            } else if (currentStepData.component === "property-loan") {
              return <PropertyLoanDetails key={currentStep} {...commonProps} />;
            } else if (currentStepData.component === "lap-property-details") {
              return <LAPPropertyDetails key={currentStep} {...commonProps} />;
            } else if (currentStepData.component === "vehicle-loan") {
              return <VehicleLoanDetails key={currentStep} {...commonProps} />;
            } else {
              return <PersonalDetails key={currentStep} {...commonProps} />;
            }
          })()}
        </main>
      )}
      {step === "success" && <ApplicationSuccess loanType={loanTitle} />}
    </>
  );
};

export default LoansJourneyClient;
