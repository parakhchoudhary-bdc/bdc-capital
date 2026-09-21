"use client";
import React, { useState, useMemo } from "react";
// import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/context/LanguageContext";
import enContact from "@/locales/en/contact-us.json";
import mrContact from "@/locales/mr/contact-us.json";
import enLoans from "@/locales/en/loans.json";
import mrLoans from "@/locales/mr/loans.json";

interface FormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  loanType: string;
  message?: string;
}

interface FormField {
  id: keyof Pick<FormData, "fullName" | "mobileNumber" | "email">;
  label: string;
  required: boolean;
  placeholder: string;
}

function ContactForm(): React.ReactElement {
  const { language } = useLanguage();
  const t = language === "mr" ? mrContact : enContact;
  const loansData = language === "mr" ? mrLoans : enLoans;

  const schema = useMemo(() => z.object({
    fullName: z.string().min(2, t.form.nameField.error),
    email: z.string().email(t.form.emailField.error),
    mobileNumber: z.string().regex(/^\d{10}$/, t.form.phoneNumberField.error),
    loanType: z.string().min(1, t.form.selectLoanTypeField.error),
    message: z.string().optional(),
  }), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitData = async (data: FormData): Promise<void> => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        reset();

        // Auto hide success message after 5 seconds and return to normal
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      setShowSuccess(false);
      setShowError(true);

      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (): void => {
    return;
  };

  const formFields: FormField[] = [
    {
      id: "fullName",
      label: t.form.nameField.label,
      required: true,
      placeholder: t.form.nameField.placeholder,
    },
    {
      id: "mobileNumber",
      label: t.form.phoneNumberField.label,
      required: true,
      placeholder: t.form.phoneNumberField.placeholder,
    },
    {
      id: "email",
      label: t.form.emailField.label,
      required: true,
      placeholder: t.form.emailField.placeholder,
    },
  ];

  return (
    <form

      onSubmit={handleSubmit(submitData, onError)}
      className="col-span-4 order-2 @6xl:order-3 @6xl:row-span-3 @6xl:row-start-1 col-start-1 md:col-span-3 @6xl:col-start-3 @6xl:col-span-2 w-full"
    >
      <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-8">
        {formFields.map((field) => (
          <div
            className="flex flex-col mb-1 col-span-2 md:col-span-1"
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className="text-body1 tracking-base leading-[124%] text-mainTitleColor mb-2.5"
            >
              {field.label}
              <span className="text-[#ff2929]">*</span>
            </label>
            <input
              id={field.id}
              type="text"
              {...register(field.id)}
              className={`px-3 py-4.5 h-14.5 outline-[0.5px] rounded-sm text-mainTitleColor text-[16px] placeholder:text-[16px]
                ${errors[field.id] ? "outline-[#ff2929] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]" : "outline-[#e2e2e2] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"}`}
              placeholder={field.placeholder}
            />
            {errors[field.id] && (
              <span className="text-sm text-[#ff2929] leading-[100%] mt-2">
                {errors[field.id]?.message}
              </span>
            )}
          </div>
        ))}

        <div
          className={`mb-1 custom-select-wrapper relative flex flex-col col-span-2 md:col-span-1`}
        >
          <label
            htmlFor="loanType"
            className="text-body1 tracking-base leading-[124%] text-mainTitleColor mb-2.5"
          >
            {t.form.selectLoanTypeField.label}
            <span className="text-[#ff2929]">*</span>
          </label>
          <select
            id="loanType"
            {...register("loanType")}
            className={`px-3 py-4.5 h-14.5 rounded-sm text-mainTitleColor text-[16px] leading-[120%] outline-[0.5px] 
              ${errors.loanType ? "outline-[#ff2929] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]" : "outline-[#e2e2e2] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"}`}
          >
            <option value="">{language === "mr" ? "निवडा" : "Select"}</option>
            {loansData.loansData.map((loan) => (
              <option key={loan.id} value={loan.title}>
                {loan.title}
              </option>
            ))}
          </select>
          {errors.loanType ? (
            <span className="text-sm text-[#ff2929] leading-[100%] mt-2">
              {errors.loanType.message}
            </span>
          ) : (
            <span className="opacity-0 h-5"></span>
          )}
        </div>

        <div
          className={`md:col-span-2 flex flex-col col-span-2 ${errors.loanType ? "mt-0" : "-mt-4"
            }`}
        >
          <label
            htmlFor="message"
            className="text-body1 tracking-base leading-[124%] text-mainTitleColor mb-2.5"
          >
            {t.form.msgField.label}
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className="px-3 py-4.5 border border-[#e2e2e2] rounded-sm text-mainTitleColor text-[16px] placeholder:text-[16px] focus:outline-[0.5px] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"
            placeholder={t.form.msgField.placeholder}
          ></textarea>
          {errors.message && (
            <span className="text-sm text-[#ff2929] leading-[100%] mt-2">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-y-4 md:justify-between md:items-center">
        <button
          type="submit"
          disabled={isSubmitting || showSuccess}
          className={`w-fit transition-all duration-300 text-[16px] text-white px-6 py-3 rounded-full mt-8 cursor-pointer flex items-center justify-center gap-2 bg-[#005a45] hover:bg-[#023632]`}
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {language === "mr" ? "सादर करत आहे..." : "Submitting..."}
            </>
          ) : showSuccess ? (
            language === "mr" ? "यशस्वीरित्या सादर केले" : "Submitted"
          ) : (
            t.form.submit
          )}
        </button>
        {showSuccess && (
          <div
            onClick={() => setShowSuccess(false)}
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-[16px] leading-[120%] md:mt-8 text-green-700 transition-all"
          >
            {language === "mr" ? "संदेश यशस्वीरित्या पाठवला!" : "Message sent successfully!"}
            <button
              type="button"
              className="text-green-700 hover:text-green-900 text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {showError && (
          <div
            onClick={() => setShowError(false)}
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-[16px] leading-[120%] md:mt-8 text-[#ff2929]  transition-all"
          >
            {language === "mr" ? "संदेश पाठवण्यात अयशस्वी." : "Failed to send message."}
            <button
              type="button"
              className="text-[#ff2929] hover:text-red-900 text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
