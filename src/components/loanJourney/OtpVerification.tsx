"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface OTPVerificationProps {
  phoneNumber: string;
  correctOtp: string;
  otpCreatedAt: number | null;
  onResend: () => void;
  onBack: () => void;
  onVerify: () => void;
}

import JourneyHeader from "./JourneyHeader";
import JourneyFooter from "./JourneyFooter";

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  correctOtp,
  otpCreatedAt,
  onResend,
  onBack,
  onVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const maskedPhone = useMemo(
    () => phoneNumber.replace(/^(\d{6})(\d{4})$/, "XXXXXX$2"),
    [phoneNumber],
  );

  const isComplete = otp.every((v) => v !== "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(null); // Clear error on change

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.some((v) => /[^0-9]/.test(v))) return;

    const newOtp = [...otp];
    pasteData.forEach((val, i) => {
      if (i < 6) newOtp[i] = val;
    });
    setOtp(newOtp);
    setError(null);
    const lastIdx = Math.min(pasteData.length, 5);
    inputRefs.current[lastIdx]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isComplete) return;

    if (attempts >= 5) {
      setError("Too many attempts. Please try again later");
      return;
    }

    if (otpCreatedAt && Date.now() - otpCreatedAt > 5 * 60 * 1000) {
      setError("OTP has expired Re-send OTP");
      return;
    }

    if (otp.join("") === correctOtp) {
      setError(null);
      onVerify();
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        setError("Too many attempts. Please try again later");
      } else {
        setError(`Incorrect OTP. Re-send OTP in ${formatCountdown(countdown)}`);
      }
    }
  };

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (countdown === 0) {
      setCountdown(30);
      setOtp(new Array(6).fill(""));
      setAttempts(0);
      setError(null);
      onResend();
      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    }
  };

  // Update error message if it's the countdown one
  useEffect(() => {
    if (error && error.startsWith("Incorrect OTP")) {
      setError(`Incorrect OTP. Re-send OTP in ${formatCountdown(countdown)}`);
    }
  }, [countdown]);

  // Check for expiry periodically
  useEffect(() => {
    const timer = setInterval(() => {
      if (otpCreatedAt && Date.now() - otpCreatedAt > 5 * 60 * 1000 && !error) {
        setError("OTP has expired Re-send OTP");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCreatedAt, error]);

  return (
    <main className="min-h-screen w-full relative grid grid-cols-4 gap-x-4 md:gap-x-5 px-4 md:px-6 lg:px-10 z-10 force-font-figtree">
      <JourneyHeader />
      <div className="col-span-4 md:col-span-2 md:col-start-2 w-full h-fit m-auto text-center font-figtree py-27.5">
        <h3 className="text-heading1 tracking-heading1 leading-[90%] text-mainTitleColor font-medium mb-5">
          Mobile Verification
        </h3>
        <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mb-9 md:mb-12 lg:mb-15">
          A 6-digit one-time password has been sent to {maskedPhone}
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-125 mx-auto flex flex-col gap-y-10"
        >
          <div className="flex flex-col gap-y-2.5 w-full">
            <div className="flex justify-between gap-2.5 md:gap-4 lg:gap-7 w-full">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  className={`rounded-lg w-[12%] aspect-square text-center text-bodyBase transition-all outline-[0.5px] ${
                    error
                      ? "outline-[#ff2929] focus:outline-[#005a45]"
                      : digit
                        ? "outline-[#005a45] focus:outline-[#005a45]"
                        : "outline-borderColor focus:outline-[#005a45]"
                  }`}
                />
              ))}
            </div>
            <div
              className={`text-body2 leading-[124%] tracking-base flex flex-wrap gap-1.5 justify-start mt-2 ${error ? "text-red-500 font-medium" : "text-mainTitleCopyColor"}`}
            >
              {error && (
                <span>
                  {error.startsWith("Incorrect OTP")
                    ? "Incorrect OTP. "
                    : error.startsWith("OTP has expired")
                      ? "OTP has expired "
                      : error.startsWith("Too many attempts")
                        ? "Too many attempts. Please try again later"
                        : ""}
                </span>
              )}

              {!error?.startsWith("Too many attempts") && (
                <>
                  {countdown > 0 ? (
                    <p className="text-mainTitleCopyColor">
                      Re-send OTP in{" "}
                      <span className="text-[#005a45]">
                        {formatCountdown(countdown)}
                      </span>
                    </p>
                  ) : (
                    <Link
                      href=""
                      onClick={handleResend}
                      className="decoration-1 underline underline-offset-3 cursor-pointer transition-colors text-mainTitleCopyColor decoration-mainTitleCopyColor hover:text-[#005a45] hover:decoration-[#005a45]"
                    >
                      Re-send OTP
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <JourneyFooter
            onBack={onBack}
            continueLabel="Verify OTP"
            disabled={!isComplete || attempts >= 5}
          />
        </form>
      </div>
    </main>
  );
};

export default OTPVerification;
