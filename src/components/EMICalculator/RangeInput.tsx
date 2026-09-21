"use client";
import React, { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string; // %, Y etc
  prefix?: string; // ₹
  formatter?: (v: number) => string;
  onChange: (v: number) => void;
  disabled?: boolean; // To disable the input field
}

const onlyNumbers = (v: string) => v.replace(/[^0-9.]/g, "");
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

// Indian number formatting: 1,00,000 (lakhs system)
const formatIndianNumber = (num: string) => {
  if (!num) return "";

  const numStr = num.toString();
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);

  if (otherNumbers !== "") {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return lastThree;
};

// Limit decimal places to 2
const limitDecimalPlaces = (value: string, maxDecimals: number = 2): string => {
  if (!value.includes(".")) return value;

  const [integer, decimal] = value.split(".");
  if (decimal && decimal.length > maxDecimals) {
    return `${integer}.${decimal.substring(0, maxDecimals)}`;
  }
  return value;
};

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  unit,
  value,
  min,
  max,
  step,
  prefix,
  formatter,
  onChange,
  disabled = false,
}) => {
  const [input, setInput] = useState(
    formatter ? formatter(value) : value.toString(),
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  // Check if this is a currency field (has ₹ prefix)
  const isCurrencyField = prefix === "₹";

  useEffect(() => {
    // Only update input from external value changes when not editing
    if (!isEditing) {
      setInput(formatter ? formatter(value) : value.toString());
    }
  }, [value, formatter, isEditing]);

  // Restore cursor position after formatting update
  useLayoutEffect(() => {
    if (inputRef.current && cursor !== null) {
      inputRef.current.setSelectionRange(cursor, cursor);
      setCursor(null);
    }
  }, [input, cursor]);

  const rangeStyle = useMemo(() => {
    const percentage = Math.min(
      100,
      Math.max(0, ((value - min) / (max - min)) * 100),
    );
    return {
      background: `linear-gradient(
        to right,
        #005a45 0%,
        #005a45 ${percentage.toFixed(2)}%,
        #E5E7EB ${percentage.toFixed(2)}%,
        #E5E7EB 100%
      )`,
    };
  }, [value, min, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const start = el.selectionStart || 0;
    const valueBefore = el.value;

    // Count how many non-comma/non-prefix characters are before the cursor
    const digitsBefore = valueBefore
      .substring(0, start)
      .replace(/[^0-9.]/g, "").length;

    let raw = onlyNumbers(e.target.value);

    if (raw) {
      // Limit decimal places to 2 for non-currency fields (like interest rate)
      if (!isCurrencyField) {
        raw = limitDecimalPlaces(raw, 2);
      }

      // Only format with commas if it's a currency field
      const formatted = isCurrencyField ? formatIndianNumber(raw) : raw;
      setInput(formatted);

      // Calculate new cursor position
      let newPos = 0;
      let digitCount = 0;
      while (newPos < formatted.length && digitCount < digitsBefore) {
        if (/[0-9.]/.test(formatted[newPos])) {
          digitCount++;
        }
        newPos++;
      }
      setCursor(newPos);

      // Update slider in real-time if value is within range
      const numValue = Number(raw);
      if (numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    } else {
      setInput("");
      setCursor(0);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const validateAndApply = () => {
    setIsEditing(false);

    // Remove commas to get the actual number (for currency fields)
    const rawNumber = input.replace(/,/g, "");

    // If empty, set to min
    if (!rawNumber || rawNumber === "") {
      setInput(formatter ? formatter(min) : min.toString());
      onChange(min);
      return;
    }

    const numValue = Number(rawNumber);

    // Validate against min/max
    if (numValue < min) {
      setInput(formatter ? formatter(min) : min.toString());
      onChange(min);
    } else if (numValue > max) {
      setInput(formatter ? formatter(max) : max.toString());
      onChange(max);
    } else {
      // Valid value - apply formatter and update
      const clampedValue = clamp(numValue, min, max);
      setInput(formatter ? formatter(clampedValue) : clampedValue.toString());
      onChange(clampedValue);
    }
  };

  const handleBlur = () => {
    validateAndApply();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur(); // This will trigger handleBlur
    }
  };

  return (
    <div className="mb-6 md:mb-7 lg:mb-10">
      <div className="flex justify-between items-center mb-2">
        <p className="text-bodyBase tracking-base @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] font-medium text-titleColor">
          {label}
        </p>

        <div className="flex items-center border border-borderColor rounded-sm p-2.5 md:p-3.5 lg:p-4.5 gap-4 md:gap-6 text-titleColor">
          {prefix && (
            <span className="text-bodyBase tracking-base @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] select-none">
              {prefix}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="field-sizing-content outline-none text-right text-bodyBase tracking-base @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] disabled:cursor-not-allowed"
          />

          {unit && (
            <span className="text-bodyBase tracking-base @6xl:text-subHeading @6xl:tracking-subHeading leading-[100%] select-none">
              {unit}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={rangeStyle}
        className="w-full h-0.5 bg-gray-200 rounded-sm appearance-none cursor-pointer accent-orange"
      />

      <div className="flex justify-between mt-2 text-body2 tracking-base text-mainTitleCopyColor leading-[100%]">
        <span>{formatter ? formatter(min) : min}</span>
        <span>{formatter ? formatter(max) : max}</span>
      </div>
    </div>
  );
};

export default RangeInput;