import React from "react";
import Home from "./home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BDC Capital – Accessible & Transparent NBFC Loan Solutions",
  description:
    "Explore BDC Capital Private Limited’s financial services — an RBI-registered NBFC offering personal, business, housing, vehicle, LAP, and cash credit loans with clarity, compliance, and customer-first support.",
  verification: {
    google: "Ia4R85zehkLKGpQkEQb8Z-Ic3dpgtMKMSZoAym2AIyE",
  },
};

export default function Page() {
  return <Home />;
}
