import React from "react";
import LoansClient from "./page-client";
import { Metadata } from "next";

interface PageParams {
  loan: string;
}

const loanMetadata: Record<string, { title: string; description: string }> = {
  "personal-loan": {
    title: "Personal Loans – Flexible & Transparent Funding | BDC Capital",
    description: "Get responsible, transparent personal loan solutions from BDC Capital tailored to your financial needs with clear terms and easy access.",
  },
  "business-loan": {
    title: "Business Loans – Tailored Credit Solutions | BDC Capital",
    description: "Discover flexible business financing from BDC Capital to fuel growth and working capital requirements with personalized loan options.",
  },
  "housing-loan": {
    title: "Housing Loans – Finance for Your Home | BDC Capital",
    description: "Secure competitive housing loan solutions from BDC Capital to support residential property financing with transparent eligibility and service.",
  },
  "vehicle-loan": {
    title: "Vehicle Loans – Purchase New or Used Vehicles | BDC Capital",
    description: "Access convenient vehicle loan financing for new and used automobiles with BDC Capital’s customer-centric approach and clear terms.",
  },
  "loan-against-property": {
    title: "Loan Against Property (LAP) – Secured Credit | BDC Capital",
    description: "Get secured financing options by leveraging your property with BDC Capital’s transparent Loan Against Property solutions.",
  },
  "cash-credit-facility": {
    title: "Cash Credit Facility – Working Capital Support | BDC Capital",
    description: "Access cash credit solutions from BDC Capital to support your business’s working capital needs with flexible and responsible lending.",
  },
};

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { loan } = await params;
  const metadata = loanMetadata[loan];

  return {
    title: metadata?.title || "BDC Capital",
    description: metadata?.description || "BDC Capital - Your trusted financial partner.",
  };
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { loan } = await params;

  return (
    <LoansClient
      loanPath={loan}
    />
  );
}
