"use client";
import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormInputProps {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  id: string;
  required?: boolean;
  error?: string;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: Option[];
  className?: string;
  min?: number;
  max?: number;
  tooltip?: string;
  helperText?: string | React.ReactNode;
  [key: string]: any;
}

const FormInput = forwardRef<HTMLInputElement | HTMLSelectElement, FormInputProps>(({
  type,
  label,
  placeholder,
  name,
  id,
  required = false,
  error,
  value = "",
  onChange,
  onBlur,
  options = [],
  className = "",
  min,
  max,
  tooltip,
  helperText,
  ...rest
}, ref) => {
  const [mounted, setMounted] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState<'top' | 'bottom'>('top');
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  // Calculate tooltip position when it opens
  React.useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const tooltipHeight = 150; // Approximate max height of tooltip
      const spaceAbove = rect.top;

      // If not enough space above, flip to bottom
      if (spaceAbove < tooltipHeight) {
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition('top');
      }
    }
  }, [showTooltip]);

  const isSelect = type === "select";
  const isDate = type === "date";
  const isAadhaar = (id?.toLowerCase().includes("aadhaar") || name?.toLowerCase().includes("aadhaar"));

  const baseInputStyles = "px-3 py-3.5 h-14.5 rounded-sm text-mainTitleColor text-[16px] leading-[120%] border-none outline outline-1 w-full transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorStyles = error
    ? "outline-[#ff2929] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"
    : "outline-borderColor focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]";

  return (
    <div className={`flex flex-col gap-2.5 w-full ${className}`}>
      <label
        htmlFor={id}
        className="text-[16px] tracking-base leading-[124%] text-mainTitleCopyColor flex items-center gap-2"
      >
        {label}
        {required && <span className="text-[#ff2929]">*</span>}
        {tooltip && (
          <div className="relative inline-flex items-center" ref={tooltipRef}>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              aria-label="More information"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="4.5" r="1" fill="currentColor" />
              </svg>
            </button>
            {showTooltip && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-64 p-3 bg-white text-xs text-gray-700 rounded-lg shadow-md border border-gray-100 z-50 animate-in fade-in zoom-in duration-200 ${tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                  }`}
                role="tooltip"
              >
                {tooltip}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent ${tooltipPosition === 'top'
                    ? 'top-full border-t-white'
                    : 'bottom-full border-b-white'
                    }`}
                />
              </div>
            )}
          </div>
        )}
      </label>

      {isSelect ? (
        <div className="custom-select-wrapper-journey relative w-full">
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`${baseInputStyles} ${errorStyles} appearance-none bg-transparent cursor-pointer`}
            {...rest}
          >
            <option value="">{placeholder || "Select"}</option>
            {options.map((option: Option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : isDate ? (
        <div className="relative w-full group">
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            name={name}
            id={id}
            placeholder={placeholder || "DD/MM/YYYY"}
            value={value}
            maxLength={10}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");
              if (val.length > 2 && val.length <= 4) {
                val = `${val.slice(0, 2)}/${val.slice(2)}`;
              } else if (val.length > 4) {
                val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
              }
              e.target.value = val;
              onChange?.(e);
            }}
            onBlur={onBlur}
            className={`${baseInputStyles} ${errorStyles}`}
            {...rest}
          />
        </div>
      ) : isAadhaar ? (
        <div className="relative w-full group">
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            name={name}
            id={id}
            placeholder={placeholder || "1234 5678 9012"}
            value={value}
            maxLength={14}
            inputMode="numeric"
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
              const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
              e.target.value = formatted;
              onChange?.(e);
            }}
            onBlur={onBlur}
            className={`${baseInputStyles} ${errorStyles}`}
            {...rest}
          />
        </div>
      ) : type === "radio" ? (
        <div className="flex flex-wrap gap-x-8 gap-y-4 pt-1">
          {options.map((option: Option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  ref={ref as React.Ref<HTMLInputElement>}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="peer appearance-none w-5.5 h-5.5 rounded-full border border-borderColor checked:border-[#005a45] transition-all duration-200 cursor-pointer"
                  {...rest}
                />
                <div className="absolute w-3 h-3 rounded-full bg-[#005a45] scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none" />
              </div>
              <span className="text-[16px] text-mainTitleColor group-hover:text-[#005a45] transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      ) : type === "currency" ? (
        <div className="relative w-full group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-mainTitleColor text-[16px] pointer-events-none">
            ₹
          </div>
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              // Extract digits only
              let rawValue = e.target.value.replace(/[^\d]/g, "");

              // Max 9 digits
              if (rawValue.length > 9) {
                rawValue = rawValue.slice(0, 9);
              }

              if (rawValue === "") {
                e.target.value = "";
                onChange?.(e);
                return;
              }

              // Indian Currency Formatting (e.g. 1,00,000)
              let formatted = rawValue;
              if (rawValue.length > 3) {
                let lastThree = rawValue.substring(rawValue.length - 3);
                let otherNumbers = rawValue.substring(0, rawValue.length - 3);
                otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
                formatted = otherNumbers + "," + lastThree;
              }

              e.target.value = formatted;
              onChange?.(e);
            }}
            onBlur={onBlur}
            className={`${baseInputStyles} ${errorStyles} pl-7`}
            {...rest}
          />
        </div>
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => {
            if (id === 'pan' || id === 'panOfEntity') {
              e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            }
            onChange?.(e);
          }}
          maxLength={
            id === 'pan' || id === 'panOfEntity' ? 10 :
              (id.toLowerCase().includes('other') || name.toLowerCase().includes('other') || id.includes('vehicleModel')) ? 60 :
                undefined
          }
          onBlur={onBlur}
          className={`${baseInputStyles} ${errorStyles}`}
          min={min}
          max={max}
          {...rest}
        />
      )}

      {helperText && (
        <p className="text-[16px] text-titleCopyColor">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs md:text-sm text-[#ff2929] leading-tight block">
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
