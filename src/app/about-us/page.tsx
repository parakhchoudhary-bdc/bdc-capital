import React from "react";
import AboutUsClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BDC Capital – NBFC with Transparent Finance Focus",
  description:
    "Learn how BDC Capital Private Limited delivers transparent, accessible loan solutions as an RBI-registered NBFC committed to compliance and customer trust.",
};

export default function Page() {
  return <AboutUsClient />;
}
