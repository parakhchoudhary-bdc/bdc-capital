import React from "react";
import LoansJourneyClient from "./page-client";
import { allLoanJourneys } from "@/data/loanJourney";

interface PageParams {
  loanJourney: string;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { loanJourney } = await params;

  // Find the selected loan journey from the new TS data
  const selectedLoan = allLoanJourneys.find(
    (item) => item.pathname === loanJourney
  );

  const data = selectedLoan ? [selectedLoan] : [];

  // @ts-ignore - Temporary ignore while updating client component types
  return <LoansJourneyClient filteredData={data} />;
}
