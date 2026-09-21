"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";

// Define validation rules for vehicle loan details
const vehicleLoanValidationRules: Record<string, z.ZodTypeAny> = {
  vehicleType: z.string().min(1, "Please select vehicle type"),
  vehicleTypeOther: z
    .string()
    .min(1, "Please specify vehicle type")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  vehicleCondition: z.string().min(1, "Please select vehicle condition"),
  vehicleBrandModel: z.string().min(1, "Please enter vehicle brand & model"),
  vehicleUsage: z.string().min(1, "Please select vehicle usage"),
  businessName: z.string().min(1, "Please enter business name").max(80, "Business name must not exceed 80 characters"),
  businessType: z.string().min(1, "Please select business type"),
  applicantRole: z.string().min(1, "Please select authorised signatory role"),
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
  existingLoans: z
    .string()
    .min(1, "Please indicate if you have existing loans"),
  totalOutstandingAmount: z
    .string()
    .min(1, "Please enter total outstanding amount"),
  panOfEntity: z
    .string()
    .regex(
      /^[A-Z]{3}[BP][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN of entity",
    ),
};

interface VehicleLoanDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const VehicleLoanDetails: React.FC<VehicleLoanDetailsProps> = ({
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

      let rule = vehicleLoanValidationRules[fieldId] || z.string();

      if (field.required) {
        if (rule instanceof z.ZodString) {
          // Special handling for business fields that are conditionally required
          if (
            ["businessName", "businessType", "applicantRole"].includes(fieldId)
          ) {
            // For conditionally visible fields, we rely on the visibility rule filter in the parent component
            // or we make them optional if not visible.
            // However, react-hook-form schema applies to all fields.
            // If a field is hidden but required in schema, validation fails.
            // To fix this, we'll make them optional in the strict schema if hidden,
            // OR rely on the fact that if they are hidden, they might be empty.
            // But simpler approach: The parent filters `formConfig` based on visibility.
            // We only build schema for fields present in `formConfig`.
            // So if `businessName` is hidden, it won't be in `formConfig`, preventing validation error?
            // No, `formConfig` passed here is filtered! YES.
            // The parent component filters `formConfig` before passing it.
            // So `schema` is built ONLY for visible fields.
            // So standard `min(1)` is fine.
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

    // Fallback for fields not in config but in cache (to prevent errors if cache has extra data)
    // We don't want to validate them if they are not in the current form view.
    // So we don't add them to the schema or add them as optional.

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
            min={field.min}
            max={field.max}
            tooltip={field.tooltip}
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

export default VehicleLoanDetails;
