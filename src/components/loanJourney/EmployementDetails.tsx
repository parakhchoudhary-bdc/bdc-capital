"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";
import { usePincode } from "@/hooks/usePincode";

// Define validation rules for employment-related fields
const employementValidationRules: Record<string, z.ZodTypeAny> = {
  employmentType: z.string().min(1, "Please select employment type"),
  employerType: z.string().min(1, "Please select employer type"),
  employerTypeOther: z
    .string()
    .min(1, "Please specify employer type")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  employmentStatus: z.string().min(1, "Please select employment status"),
  natureofProfession: z.string().min(1, "Please select nature of profession"),
  natureofProfessionOther: z
    .string()
    .min(1, "Please specify nature of profession")
    .max(60, "Nature of profession must not exceed 60 characters")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  natureofBusiness: z.string().min(1, "Please select nature of business").max(60, "Nature of business must not exceed 60 characters"),
  natureofBusinessOther: z
    .string()
    .min(1, "Please specify nature of business")
    .max(60, "Nature of business must not exceed 60 characters")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  yearOfExperience: z.string().min(1, "Please select years of experience"),
  income: z
    .string()
    .min(1, "Income amount is required")
    .regex(/^[0-9,]+$/, "Income must contain only numbers")
    .refine((val) => {
      const numericValue = parseInt(val.replace(/,/g, ''));
      return !isNaN(numericValue) && numericValue <= 9999999;
    }, "Income must not exceed ₹99,99,999"),
  workAddress: z.string().min(1, "Work address is required"),
  workAddressPincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"),
  panOfEntity: z
    .string()
    .regex(
      /^[A-Z]{3}[BP][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN of entity",
    ),
};

interface EmployementDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const EmployementDetails: React.FC<EmployementDetailsProps> = ({
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

      let rule = employementValidationRules[fieldId] || z.string();

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
    Object.keys(employementValidationRules).forEach((key) => {
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
  const { details: workPincodeDetails, error: workPincodeError } = usePincode((allValues.workAddressPincode as string) || "", "workAddressPincode");
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
            helperText={
              fieldName === "workAddressPincode" ? (
                workPincodeError ? (
                  <span className="text-[#ff2929] block">{workPincodeError}</span>
                ) : workPincodeDetails ? (
                  <span className="text-titleColor block">
                    {workPincodeDetails}
                  </span>
                ) : (
                  field.helperText
                )
              ) : (
                field.helperText
              )
            }
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

export default EmployementDetails;
