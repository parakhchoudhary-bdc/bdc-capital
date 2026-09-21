import { useState, useEffect } from "react";
import { useLoanApplication } from "@/hooks/useLoanApplication";

interface PincodeResponse {
    Status: string;
    PostOffice: {
        Name: string;
        District: string;
        State: string;
    }[];
}

export const usePincode = (pincode: string, fieldId: string) => {
    const { updateLoanData } = useLoanApplication();
    const [details, setDetails] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (pincode && /^\d{6}$/.test(pincode)) {
            setError(""); // Clear error while fetching
            fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                .then((res) => res.json())
                .then((response: any) => {
                    const data = response?.[0];
                    if (data && data.Status === "Success" && data.PostOffice?.length > 0) {
                        const po = data.PostOffice[0];
                        const info = `${po.District}, ${po.State}`;
                        setDetails(info);
                        setError("");
                        // Update loanData so Review page can see it
                        updateLoanData({ [`${fieldId}Details`]: info });
                    } else {
                        setDetails("");
                        setError("Enter valid pincode");
                        // Clear details if invalid
                        updateLoanData({ [`${fieldId}Details`]: undefined });
                    }
                })
                .catch((err) => {
                    console.error("Pincode fetch error:", err);
                    setDetails("");
                    setError("Enter valid pincode");
                    updateLoanData({ [`${fieldId}Details`]: undefined });
                });
        } else {
            setDetails("");
            setError("");
            // Clear if pincode is cleared/invalid length
            updateLoanData({ [`${fieldId}Details`]: undefined });
        }
    }, [pincode, fieldId, updateLoanData]);

    return { details, error };
};
