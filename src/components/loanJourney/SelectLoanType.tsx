"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoanApplication } from "@/hooks/useLoanApplication";
import { InputField } from "@/types/loanJourney";
import * as z from "zod";
import FormInput from "@/components/loanJourney/FormInput";

const schema = z.object({
  loanType: z.string().min(1, "Please select a loan type"),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid mobile number"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name should only contain letters and spaces"),
  email: z.string().email("Please enter a valid email ID"),
  dob: z
    .string()
    .min(1, "Please enter a valid Date of birth")
    .refine(
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
});

type FormData = z.infer<typeof schema>;

interface SelectLoanTypeProps {
  initialLoanType?: string;
  options: { value: string; label: string }[];
  formHeading: string;
  formDescription: string;
  backCta?: string;
  form?: InputField[];
  ctaContent: string;
  onSuccess?: (data: FormData) => void;
}

import JourneyHeader from "@/components/loanJourney/JourneyHeader";
import JourneyFooter from "@/components/loanJourney/JourneyFooter";

const SelectLoanType: React.FC<SelectLoanTypeProps> = ({
  initialLoanType,
  options = [],
  formHeading,
  formDescription,
  backCta,
  form = [],
  ctaContent,
  onSuccess,
}) => {
  const router = useRouter();
  const { loanData, updateLoanData, clearLoanData } = useLoanApplication();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      loanType: initialLoanType || loanData.loanType || "",
      mobileNumber: loanData.mobileNumber || "",
      fullName: loanData.fullName || "",
      email: loanData.email || "",
      dob: loanData.dob || "",
    },
  });

  const allValues = watch();
  const lastSyncedRef = useRef<string>("");

  // Sync route with loan type selection
  useEffect(() => {
    if (allValues.loanType && allValues.loanType !== initialLoanType) {
      router.replace(`/apply/${allValues.loanType}`);
    } else if (!allValues.loanType && initialLoanType) {
      router.replace("/apply");
    }
  }, [allValues.loanType, initialLoanType, router]);

  // Persist all form data in TanStack Query cache as user types
  useEffect(() => {
    const currentValuesStr = JSON.stringify(allValues);
    if (currentValuesStr !== lastSyncedRef.current) {
      lastSyncedRef.current = currentValuesStr;
      updateLoanData(allValues);
    }
  }, [allValues, updateLoanData]);

  const onSubmit = (data: FormData) => {
    onSuccess?.(data);
  };

  return (
    <>
      <main className="min-h-screen w-full relative grid grid-cols-4 gap-x-4 md:gap-x-5 px-4 md:px-6 lg:px-10 z-10 bg-[#f1f1f1] force-font-figtree">
        <JourneyHeader />
        <div className="col-span-4 w-full font-figtree py-27.5">
          <h3 className="text-heading1 tracking-heading1 leading-[90%] text-mainTitleColor font-medium text-center mx-auto mb-4">
            {formHeading}
          </h3>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor text-center mb-8 lg:mb-12">
            {formDescription}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-174.5 mx-auto flex flex-col items-start gap-y-6 md:gap-y-8 relative h-fit"
          >
            {form.map((field: InputField, index: number) => {
              const fieldName = field.id as keyof FormData;
              return (
                <FormInput
                  key={index}
                  type={field.inputType || "text"}
                  label={field.inputLabel}
                  placeholder={field.inputPlaceholder}
                  id={field.id || ""}
                  required={field.required}
                  error={errors[fieldName]?.message}
                  options={field.inputType === "select" ? options : []}
                  value={allValues[fieldName]}
                  {...register(fieldName)}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
                  ) => {
                    register(fieldName).onChange(e);
                    if (fieldName === "loanType") {
                      // router handling is done in useEffect
                    }
                  }}
                />
              );
            })}

            <JourneyFooter
              continueLabel={ctaContent}
              onBack={() => {
                clearLoanData();
                router.push("/");
              }}
              backLabel="Go to Home"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default SelectLoanType;
