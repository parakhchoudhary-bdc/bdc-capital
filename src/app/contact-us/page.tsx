import React from "react";
import ContactUsClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BDC Capital – Get Support & Loan Assistance",
  description:
    "Reach out to BDC Capital for personalized loan support, application assistance, and customer service from a trusted NBFC.",
};

export default function Page() {
  return <ContactUsClient />;
}
