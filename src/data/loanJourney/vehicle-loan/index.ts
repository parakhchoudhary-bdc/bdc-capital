import { LoanJourney } from "@/types/loanJourney";
import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";

export const vehicleLoan: LoanJourney = {
    id: "vehicle-loan",
    pathname: "vehicle-loan",
    title: "Vehicle Loan",
    loanJourney: {
        step1,
        step2,
        step3,
        step4,
    },
};
