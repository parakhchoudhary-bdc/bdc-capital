"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";

// Define validation rules for business details
const validationRules: Record<string, z.ZodTypeAny> = {
  businessName: z.string().min(1, "Business name is required").max(80, "Business name must not exceed 80 characters"),
  businessType: z.string().min(1, "Please select business type"),
  natureofBusiness: z.string().min(1, "Please select nature of business").max(60, "Nature of business must not exceed 60 characters"),
  yearInBusiness: z.string().min(1, "Please select year in business"),
  applicantRole: z.string().min(1, "Please select authorised signatory role"),
  gstNumber: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        // Regex pattern: ^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[A-Z0-9]{1}$
        const gstRegex =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[A-Z0-9]{1}$/;
        return gstRegex.test(val);
      },
      { message: "Please enter a valid GST number (e.g. 22AAAAA0000A1Z5)" },
    ),
  panOfEntity: z
    .string()
    .regex(
      /^[A-Z]{3}[BP][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN of entity",
    ),
};

interface BusinessDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
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

      // Start with the rule from validationRules or a default string rule
      let rule = validationRules[fieldId] || z.string();

      if (field.required) {
        // Force min(1) for required fields.
        // We use a more direct approach since type checking can be brittle with Zod instances.
        if (fieldId === "gstNumber") {
          // GST is special, but if it were ever required, we'd add .min(1) here.
          // For now, validationRules[fieldId] handles it.
          rule = validationRules[fieldId];
        } else if (rule instanceof z.ZodString) {
          rule = rule.min(1, field.inputError || "This field is required");
        } else {
          rule = z
            .string()
            .min(1, field.inputError || "This field is required");
        }
      } else {
        // If not required, allow empty string
        if (fieldId === "gstNumber") {
          rule = validationRules[fieldId];
        } else {
          rule = z.string().optional().or(z.literal(""));
        }
      }

      schemaShape[fieldId] = rule;
    });

    // Fallback for fields in cache but not in current config
    Object.keys(validationRules).forEach((key) => {
      if (!schemaShape[key]) {
        schemaShape[key] = z.string().optional().or(z.literal(""));
      }
    });

    return z.object(schemaShape);
  }, [formConfig]);

  // Initial values helper
  const getInitialValues = () => {
    const defaults: Record<string, any> = {};
    formConfig.forEach((f) => {
      if (f.id) defaults[f.id] = loanData[f.id] || "";
    });
    return { ...defaults, ...loanData };
  };

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
    defaultValues: getInitialValues(),
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
        reset(getInitialValues());
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

  const onSubmit = (data: any) => {
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

export default BusinessDetails;
