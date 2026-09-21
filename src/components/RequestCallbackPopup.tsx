import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePopup } from "@/context/PopupContext";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/context/LanguageContext";

import enCommon from "@/locales/en/common.json";
import mrCommon from "@/locales/mr/common.json";

// Move schema generation to a function or inside component to support localization
const createSchema = (t: typeof enCommon) => z.object({
    fullName: z.string().min(2, t.popup.errors.nameMin),
    mobileNumber: z.string().regex(/^\d{10}$/, t.popup.errors.mobileInvalid),
    loanType: z.string().min(1, t.popup.errors.selectLoan),
    pinCode: z.string().regex(/^\d{6}$/, t.popup.errors.pinCodeInvalid),
    city: z.string().min(1, t.popup.errors.cityRequired),
    preferredCallTime: z.string().min(1, t.popup.errors.selectTime),
});

type FormData = z.infer<ReturnType<typeof createSchema>>;

import PopupInput from "./PopupInput";

const RequestCallbackPopup: React.FC = () => {
    const { isPopupOpen, closePopup } = usePopup();
    const [mounted, setMounted] = useState(false);
    const { language } = useLanguage();
    const t = language === "en" ? enCommon : mrCommon;

    const schema = React.useMemo(() => createSchema(t), [t]);

    // Form handling
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        setError,
        clearErrors
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const pinCode = watch("pinCode");

    // Reset form and mock success state when popup closes
    useEffect(() => {
        if (!isPopupOpen) {
            reset();
            setShowSuccess(false);
        }
    }, [isPopupOpen, reset]);

    const loanOptions = [
        t.popup.options.personalLoan,
        t.popup.options.businessLoan,
        t.popup.options.housingLoan,
        t.popup.options.vehicleLoan,
        t.popup.options.loanAgainstProperty,
        t.popup.options.cashCreditFacility
    ];

    const timeOptions = [
        t.popup.options.morning,
        t.popup.options.afternoon,
        t.popup.options.evening
    ];

    useEffect(() => {
        if (pinCode && /^\d{6}$/.test(pinCode)) {
            fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.[0]?.Status === "Success") {
                        const postOffice = data[0].PostOffice[0];
                        // Using District as City
                        setValue("city", postOffice.District, { shouldValidate: true });
                        clearErrors("pinCode");
                    } else {
                        setValue("city", "");
                        setError("pinCode", { type: "manual", message: t.popup.errors.pinCodeInvalid });
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch pincode details:", err);
                    setValue("city", "");
                    setError("pinCode", { type: "manual", message: t.popup.errors.pinCodeInvalid });
                });
        } else {
            setValue("city", "");
        }
    }, [pinCode, setValue, setError, clearErrors, t]);

    // Lock body scroll when popup is open
    useBodyScrollLock({ isLocked: isPopupOpen });

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isPopupOpen || !mounted) return null;

    if (typeof document === "undefined") return null;

    return createPortal(
        <div className="popup fixed top-0 left-0 w-full h-full bg-black/90 z-80 flex justify-center items-center p-4">
            {/* Container */}
            <div className={`relative w-full max-w-lg lg:max-w-229 h-fit lg:h-[586.5px] bg-white rounded-xl flex overflow-visible items-stretch ${language === 'mr' ? 'font-kohinoor' : 'font-figtree'}`}>

                {/* Close Button */}
                <button
                    onClick={closePopup}
                    className="absolute -top-4 -right-2 md:-right-4 z-10 w-8 h-8 bg-[#005a45] rounded-full flex items-center justify-center text-white hover:bg-[#023632] transition-colors cursor-pointer"
                    aria-label="Close popup"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 1L1 13M1 1L13 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Left Image Section - Hidden on mobile/tablet */}
                <div className="relative hidden lg:block w-[42.5%] h-full rounded-tl-xl rounded-bl-xl overflow-hidden">
                    <img
                        src="/common/popup-img.png"
                        alt="Request a Call Back"
                        className="w-full h-full object-cover absolute top-0 left-0"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 p-6">
                        <h3 className="text-white text-heading2 tracking-heading2 font-medium">{t.popup.requestCallback}</h3>
                    </div>
                </div>

                {/* Right Form Section */}
                <form
                    className="w-full lg:w-[57.5%] h-full p-6 lg:p-8 flex flex-col justify-between"
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            const response = await fetch("/api/request-callback", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(data),
                            });

                            if (response.ok) {
                                setShowSuccess(true);
                                reset();
                                setTimeout(() => {
                                    setShowSuccess(false);
                                    closePopup();
                                }, 3000);
                            } else {
                                alert("Failed to submit request.");
                            }
                        } catch (error) {
                            console.error("Error:", error);
                            alert("Something went wrong.");
                        }
                    })}
                >
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                        <h3 className="text-heading2 tracking-heading2 font-medium lg:hidden block w-full col-span-2">{t.popup.requestCallback}</h3>

                        <PopupInput
                            label={t.popup.fullName}
                            name="fullName"
                            register={register}
                            error={errors.fullName}
                            placeholder={t.popup.placeholders.fullName}
                            colSpan="col-span-2"
                        />

                        <PopupInput
                            label={t.popup.mobileNumber}
                            name="mobileNumber"
                            register={register}
                            error={errors.mobileNumber}
                            placeholder={t.popup.placeholders.mobileNumber}
                            type="tel"
                        />

                        <PopupInput
                            label={t.popup.loanType}
                            name="loanType"
                            register={register}
                            error={errors.loanType}
                            type="select"
                            options={loanOptions}
                        />

                        <PopupInput
                            label={t.popup.pinCode}
                            name="pinCode"
                            register={register}
                            error={errors.pinCode}
                            placeholder={t.popup.placeholders.pinCode}
                            type="number"
                        />

                        <PopupInput
                            label={t.popup.city}
                            name="city"
                            register={register}
                            error={errors.city}
                            placeholder={t.popup.placeholders.city}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed"
                        />

                        <PopupInput
                            label={t.popup.preferredCallTime}
                            name="preferredCallTime"
                            register={register}
                            error={errors.preferredCallTime}
                            type="select"
                            colSpan="col-span-2"
                            options={timeOptions}
                        />

                        {/* Submit Button */}
                        <div className="col-span-2 mt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || showSuccess}
                                className={`w-fit bg-[#005a45] rounded-full py-3 px-6 text-[16px] tracking-base text-white font-medium hover:bg-[#023632] transition-colors cursor-pointer flex items-center gap-2`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        {t.popup.submitting}
                                    </>
                                ) : showSuccess ? t.popup.requestSubmitted : t.popup.submit}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        , document.body);
};

export default RequestCallbackPopup;
