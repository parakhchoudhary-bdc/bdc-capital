import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["loanApplication"];
const STORAGE_KEY = "loan_application_data";

export interface LoanApplicationData {
    loanType?: string;
    mobileNumber?: string;
    fullName?: string;
    email?: string;
    dob?: string;
    phoneNumber?: string;
    [key: string]: any;
}

export const useLoanApplication = () => {
    const queryClient = useQueryClient();

    // 1. Get data from cache
    const { data } = useQuery<LoanApplicationData>({
        queryKey: QUERY_KEY,
        queryFn: () => {
            const cached = queryClient.getQueryData<LoanApplicationData>(QUERY_KEY);
            if (cached) return cached;

            if (typeof window !== "undefined") {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    try {
                        return JSON.parse(saved);
                    } catch (e) {
                        return {};
                    }
                }
            }
            return {};
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });

    // 2. Function to update data
    const updateLoanData = useCallback((newData: Partial<LoanApplicationData>) => {
        queryClient.setQueryData(QUERY_KEY, (oldData: any) => {
            // Create a candidate for the updated data
            const candidate = { ...oldData, ...newData };

            // Determine if anything actually changed
            const keys = Object.keys(candidate);
            const hasChanged = keys.some(key => candidate[key] !== oldData?.[key]);

            if (!hasChanged && oldData) {
                return oldData;
            }

            // Sync with localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));
            }

            return candidate;
        });
    }, [queryClient]);

    // 3. Clear data
    const clearLoanData = useCallback(() => {
        queryClient.setQueryData(QUERY_KEY, {});
        localStorage.removeItem(STORAGE_KEY);
    }, [queryClient]);

    return {
        loanData: data || {},
        updateLoanData,
        clearLoanData,
    };
};
