import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import FormInput from "@/components/loanJourney/FormInput";
import JourneyFooter from "./JourneyFooter";
import { usePincode } from "@/hooks/usePincode";

// Define the base validation rules for each possible field
const fieldValidationRules: Record<string, z.ZodTypeAny> = {
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name should only contain letters and spaces"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email ID"),
  dob: z.string().refine(
    (date) => {
      if (!date) return true;

      let day, month, year;
      if (date.includes("-")) {
        [year, month, day] = date.split("-").map(Number);
      } else if (date.includes("/")) {
        if (date.length !== 10) return false;
        [day, month, year] = date.split("/").map(Number);
      } else {
        return false;
      }

      if (!day || !month || !year) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      if (year < 1900 || year > new Date().getFullYear()) return false;

      // Strict date check (prevents Feb 30th etc)
      const birthDate = new Date(year, month - 1, day);
      if (
        birthDate.getFullYear() !== year ||
        birthDate.getMonth() !== month - 1 ||
        birthDate.getDate() !== day
      ) {
        return false;
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 21 && age <= 80;
    },
    { message: "Please enter a valid date in DD/MM/YYYY format (Age 21-80)" },
  ),
  pan: z
    .string()
    .regex(
      /^[A-Z]{3}[PB][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN number",
    ),
  aadhaar: z
    .string()
    .regex(/^\d{4}\s\d{4}\s\d{4}$/, "Enter valid Aadhaar number"),
  currentAddress: z.string().min(1, "Current address is required"),
  pincode: z
    .string()
    .min(1, "PIN code is required")
    .regex(/^[0-9]{6}$/, "Please enter a valid PIN code"),
  applicantRole: z.string().min(1, "Please select authorised signatory role"),
  businessName: z.string().min(1, "Business name is required").max(80, "Business name must not exceed 80 characters"),
  businessType: z.string().min(1, "Please select business type"),
  businessAddress: z.string().min(1, "Business address is required"),
  panOfEntity: z
    .string()
    .regex(
      /^[A-Z]{3}[BP][A-Z][0-9]{4}[A-Z]$/,
      "Please enter a valid PAN of entity",
    ),
  purposeOfCashCredit: z.string().min(1, "Please select purpose of cash credit"),
  purposeOfCashCreditOther: z
    .string()
    .min(1, "Please specify purpose of cash credit")
    .regex(/^[^0-9]*$/, "Should not contain numbers"),
  approximateCashCreditLimitRequired: z.string().min(1, "Please select approximate cash credit limit"),
  expectedUtilisationPattern: z.string().min(1, "Please select expected utilisation pattern"),
  existingCashCredit: z.string().min(1, "Please indicate if you have existing cash credit"),
  existingCashCreditAmount: z.string().min(1, "Please enter existing cash credit amount"),
};

type PersonalDetailsFormData = {
  [key: string]: any;
};

interface PersonalDetailsProps {
  formConfig?: InputField[];
  onBack?: () => void;
  onNext?: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  formConfig = [],
  onBack,
  onNext,
}) => {
  const { loanData, updateLoanData } = useLoanApplication();

  // Create a dynamic schema based on the current formConfig
  const dynamicSchema = React.useMemo(() => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    // Add validation for fields present in formConfig
    formConfig.forEach((field) => {
      const fieldId = field.id;
      if (!fieldId) return;

      let rule = fieldValidationRules[fieldId] || z.string();

      // Ensure required fields have at least one character
      if (field.required && rule instanceof z.ZodString) {
        rule = rule.min(1, field.inputError || "This field is required");
      }

      if (!field.required) {
        // If not required, allow empty string or optional
        if (rule instanceof z.ZodString) {
          rule = rule.optional().or(z.literal(""));
        } else {
          rule = rule.optional();
        }
      }

      schemaShape[fieldId] = rule;
    });

    // Also include fields not in current config as optional/literal("")
    // to allow existing data in cache to pass validation
    Object.keys(fieldValidationRules).forEach((key) => {
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
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(dynamicSchema),
    mode: "all",
    defaultValues: {
      ...formConfig.reduce(
        (acc, field) => {
          if (field.id) {
            let val = loanData[field.id] || "";
            if (field.id === "aadhaar" && val) {
              val = String(val)
                .replace(/\D/g, "")
                .replace(/(\d{4})(?=\d)/g, "$1 ");
            }
            acc[field.id] = val;
          }
          return acc;
        },
        {} as Record<string, any>,
      ),
      // Add explicit fallbacks for specific fields if needed
      phoneNumber: loanData.mobileNumber || loanData.phoneNumber || "",
    },
  });

  const allValues = watch();
  const { details: pincodeDetails, error: pincodeError } = usePincode(allValues.pincode, "pincode");
  const lastSyncedRef = useRef<string>("");
  const hasInitializedRef = useRef<boolean>(false);

  // Pre-fill from cache on mount (one-time only)
  useEffect(() => {
    if (loanData && !hasInitializedRef.current) {
      const isAnythingInData = Object.values(loanData).some(
        (val) => val !== "" && val !== undefined,
      );

      if (isAnythingInData) {
        const newValues: Record<string, any> = {};

        // Map all fields from formConfig
        formConfig.forEach((field) => {
          if (field.id) {
            newValues[field.id] = loanData[field.id] || "";
          }
        });

        // Handle special cases
        if (
          !newValues.phoneNumber &&
          (loanData.mobileNumber || loanData.phoneNumber)
        ) {
          newValues.phoneNumber =
            loanData.mobileNumber || loanData.phoneNumber || "";
        }

        reset(newValues);
      }
      hasInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanData]);

  // Persist form data back to TanStack Query cache as user types
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

  const onSubmit = (data: PersonalDetailsFormData) => {
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
            key={index}
            type={field.inputType}
            label={field.inputLabel}
            placeholder={field.inputPlaceholder}
            id={field.id || ""}
            required={field.required}
            error={error}
            options={field.options}
            tooltip={field.tooltip}
            disabled={fieldName === "phoneNumber" || fieldName === "mobileNumber"}
            helperText={
              fieldName === "pincode" ? (
                pincodeError ? (
                  <span className="text-[#ff2929] block">{pincodeError}</span>
                ) : pincodeDetails ? (
                  <span className="text-titleColor block">{pincodeDetails}</span>
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

export default PersonalDetails;
