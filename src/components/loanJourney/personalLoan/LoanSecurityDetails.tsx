"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";

// Define validation rules for loan & security details
const loanSecurityValidationRules: Record<string, z.ZodTypeAny> = {
  loanPurpose: z.string().min(1, "Please select Loan Purpose"),
  loanPurposeOther: z
    .string()
    .min(1, "Please specify loan purpose")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  approximateLoanAmout: z
    .string()
    .min(1, "Please select approximate loan amount"),
  loanSecurityType: z.string().min(1, "Please select loan security type"),
  typeOfSecurity: z.string().min(1, "Please select type of security"),
  existingLoans: z
    .string()
    .min(1, "Please indicate if you have existing loans"),
  totalOutstandingAmount: z
    .string()
    .min(1, "Please enter total outstanding amount")
    .regex(/^[0-9,]+$/, "Amount must contain only numbers")
    .refine((val) => {
      const numericValue = parseInt(val.replace(/,/g, ''));
      return !isNaN(numericValue) && numericValue <= 999999999;
    }, "Amount must not exceed ₹99,99,99,999"),
  annualTurnover: z
    .string()
    .min(1, "Please enter annual turnover")
    .regex(/^[0-9,]+$/, "Turnover must contain only numbers")
    .refine((val) => {
      const numericValue = parseInt(val.replace(/,/g, ''));
      return !isNaN(numericValue) && numericValue <= 990000000;
    }, "Turnover must not exceed ₹99 Crore"),
};

interface LoanSecurityDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const LoanSecurityDetails: React.FC<LoanSecurityDetailsProps> = ({
  formConfig = [],
  onBack,
  onNext,
}) => {
  const { loanData, updateLoanData } = useLoanApplication();

  // Create a dynamic schema based on current formConfig
  const dynamicSchema = React.useMemo(() => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    formConfig.forEach((field) => {
      const fieldId = field.id;
      if (!fieldId) return;

      let rule = loanSecurityValidationRules[fieldId] || z.string();

      if (field.required) {
        if (rule instanceof z.ZodString) {
          rule = rule.min(1, field.inputError || "This field is required");
        }
      } else {
        if (rule instanceof z.ZodString) {
          rule = rule.optional().or(z.literal(""));
        } else {
          rule = rule.optional();
        }
      }

      schemaShape[fieldId] = rule;
    });

    // Fallback for fields not in config but in cache
    Object.keys(loanSecurityValidationRules).forEach((key) => {
      if (!schemaShape[key]) {
        schemaShape[key] = z.string().optional().or(z.literal(""));
      }
    });

    return z.object(schemaShape);
  }, [formConfig]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dynamicSchema),
    mode: "all",
    defaultValues: loanData,
  });

  const allValues = watch();
  const lastSyncedRef = useRef<string>("");
  const hasInitializedRef = useRef<boolean>(false);

  // Sync data from cache to form on mount (one-time only)
  useEffect(() => {
    if (loanData && !hasInitializedRef.current) {
      const isAnythingInData = Object.values(loanData).some(
        (val) => val !== "" && val !== undefined,
      );
      if (isAnythingInData) {
        reset(loanData);
      }
      hasInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanData]);

  // Push form changes back to TanStack Query (and localStorage) as user types
  useEffect(() => {
    const currentValuesStr = JSON.stringify(allValues);
    if (currentValuesStr !== lastSyncedRef.current) {
      const isAnythingEntered = Object.values(allValues).some(
        (val) => val !== "" && val !== undefined,
      );
      if (isAnythingEntered) {
        lastSyncedRef.current = currentValuesStr;
        updateLoanData(allValues);
      }
    }
  }, [allValues, updateLoanData]);

  const onSubmit = () => {
    onNext?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative w-full mx-auto flex flex-col col-span-4 lg:col-start-2 lg:col-span-2 gap-y-6 md:gap-y-8 font-figtree"
    >
      {formConfig.map((field, index) => {
        const fieldName = String(field.id || "");
        const error = (errors as any)[fieldName]?.message;

        return (
          <FormInput
            key={`${fieldName}-${index}`}
            type={field.inputType}
            label={field.inputLabel}
            placeholder={field.inputPlaceholder}
            id={field.id || ""}
            required={field.required}
            error={error}
            options={field.options}
            helperText={field.helperText}
            value={allValues[fieldName] || ""}
            {...register(fieldName)}
            className="max-w-174.5 mx-auto"
          />
        );
      })}

      <JourneyFooter onBack={onBack} />
    </form>
  );
};

export default LoanSecurityDetails;
