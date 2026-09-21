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

// Define validation rules for LAP property loan details
const lapPropertyValidationRules: Record<string, z.ZodTypeAny> = {
  loanPurpose: z.string().min(1, "Please select loan purpose"),
  loanPurposeOther: z
    .string()
    .min(1, "Please specify loan purpose")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  approximateLoanAmout: z
    .string()
    .min(1, "Please select approximate loan amount"),
  preferredLoanTenure: z
    .string()
    .min(1, "Please enter preferred loan tenure")
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      { message: "Tenure must be between 1 and 10 years" },
    ),
  propertyType: z.string().min(1, "Please select property type"),
  propertyStatus: z.string().optional().or(z.literal("")),
  propertyOwnershipType: z
    .string()
    .min(1, "Please select poperty ownership type"),
  businessName: z.string().min(1, "Business name is required").max(80, "Business name must not exceed 80 characters"),
  businessType: z.string().min(1, "Please select business type"),
  businessTypeOther: z
    .string()
    .min(1, "Please specify business type")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  applicantRole: z.string().min(1, "Please select authorised signatory role"),
  panOfEntity: z
    .string()
    .regex(
      /^[A-Z]{3}[BP][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN of entity",
    ),
  propertyAddress: z.string().min(1, "Property address is required"),
  propertyAddressPincode: z
    .string()
    .min(1, "Property address pincode is required")
    .regex(/^[0-9]{6}$/, "Please enter a valid 6-digit Pincode"),
  existingLoans: z
    .string()
    .min(1, "Please indicate if you have existing loans"),
  totalOutstandingAmount: z
    .string()
    .min(1, "Please enter total outstanding amount"),
};

interface LAPPropertyDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const LAPPropertyDetails: React.FC<LAPPropertyDetailsProps> = ({
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

      let rule = lapPropertyValidationRules[fieldId] || z.string();

      if (field.required) {
        if (rule instanceof z.ZodString) {
          // Special handling for conditional fields
          if (
            [
              "businessName",
              "businessType",
              "applicantRole",
              "panOfEntity",
            ].includes(fieldId)
          ) {
            // Assuming the parent component filters formConfig correctly based on visibility rules
            rule = rule.min(1, field.inputError || "This field is required");
          } else {
            rule = rule.min(1, field.inputError || "This field is required");
          }
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
    Object.keys(lapPropertyValidationRules).forEach((key) => {
      if (!schemaShape[key]) {
        schemaShape[key] = z.string().optional().or(z.literal(""));
      }
    });

    return z.object(schemaShape);
  }, [formConfig]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dynamicSchema),
    mode: "all",
    defaultValues: loanData,
  });

  const allValues = watch();
  const { details: propertyPincodeDetails, error: propertyPincodeError } = usePincode((allValues.propertyAddressPincode as string) || "", "propertyAddressPincode");
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
            min={field.min}
            max={field.max}
            tooltip={field.tooltip}
            helperText={
              fieldName === "propertyAddressPincode" ? (
                propertyPincodeError ? (
                  <span className="text-[#ff2929] block">{propertyPincodeError}</span>
                ) : propertyPincodeDetails ? (
                  <span className="text-titleColor block">
                    {propertyPincodeDetails}
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

export default LAPPropertyDetails;
