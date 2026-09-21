import React from "react";
import SitemapClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sitemap – BDC Capital",
    description: "Navigate through BDC Capital's website and find all our loan products, legal information, and support pages.",
};

export default function Page() {
    return <SitemapClient />;
}
