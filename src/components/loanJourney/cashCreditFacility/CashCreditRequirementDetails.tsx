"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";

// Define validation rules for cash credit requirement details
const validationRules: Record<string, z.ZodTypeAny> = {
  purposeOfCashCredit: z
    .string()
    .min(1, "Please select purpose of cash credit"),
  approximateCashCreditLimitRequired: z
    .string()
    .min(1, "Please select approximate cash credit limit required"),
  expectedUtilisationPattern: z
    .string()
    .min(1, "Please select expected utilisation pattern"),
  existingCashCredit: z
    .string()
    .min(1, "Please indicate if you have existing cash credit"),
  totalOutstandingAmount: z
    .string()
    .min(1, "Please enter total outstanding amount"),
};

interface CashCreditRequirementDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const CashCreditRequirementDetails: React.FC<
  CashCreditRequirementDetailsProps
> = ({ formConfig = [], onBack, onNext }) => {
  const { loanData, updateLoanData } = useLoanApplication();

  // Create a dynamic schema based on current formConfig
  const dynamicSchema = React.useMemo(() => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    formConfig.forEach((field) => {
      const fieldId = field.id;
      if (!fieldId) return;

      let rule = validationRules[fieldId] || z.string();

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
    Object.keys(validationRules).forEach((key) => {
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
            tooltip={field.tooltip}
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

export default CashCreditRequirementDetails;
