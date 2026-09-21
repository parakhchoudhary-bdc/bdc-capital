import React from "react";
import { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form";

interface PopupInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    options?: string[];
    type?: "text" | "tel" | "number" | "select";
    colSpan?: "col-span-1" | "col-span-2";
}

const PopupInput = <T extends FieldValues>({
    label,
    name,
    register,
    error,
    options,
    type = "text",
    colSpan = "col-span-1",
    className = "",
    ...rest
}: PopupInputProps<T>) => {
    return (
        <div className={`flex flex-col ${colSpan} ${type === "select" ? "relative custom-select-popup" : ""}`}>
            <label htmlFor={name} className="text-[16px] tracking-base leading-[124%] text-mainTitleCopyColor mb-2.5">
                {label} <span className="text-[#ff2929]">*</span>
            </label>
            {type === "select" ? (
                <select
                    id={name}
                    {...register(name)}
                    className={`px-3 py-3.5 rounded-sm text-mainTitleColor text-[16px] leading-[120%] border-none outline-1 w-full appearance-none bg-white transition-all duration-200 ${error ? "outline-[#ff2929] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]" : "outline-[#e2e2e2] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"} ${className}`}
                    defaultValue=""
                    {...rest}
                >
                    <option value="" disabled>Select</option>
                    {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input
                    id={name}
                    type={type}
                    {...register(name)}
                    className={`px-3 py-3.5 rounded-sm text-mainTitleColor text-[16px] placeholder:text-[16px] border-none outline-1 w-full transition-all duration-200 ${error ? "outline-[#ff2929] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]" : "outline-[#e2e2e2] focus:outline-[#005a45] focus:ring-1 focus:ring-[#005a45]"} ${className}`}
                    {...rest}
                />
            )}
            <span className={`text-red-500 text-xs mt-1 ${error ? "opacity-100" : "opacity-0"}   `}>{error?.message}</span>
        </div>
    );
};

export default PopupInput;
