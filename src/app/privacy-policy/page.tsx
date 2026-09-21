import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – BDC Capital Private Limited",
  description: "Read BDC Capital’s privacy practices detailing how we collect, use, and safeguard customer information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-full px-4 md:px-6 lg:px-10 pt-20">
      <section className="py-15 lg:py-20 max-w-5xl @6xl:max-w-7xl mx-auto flex flex-col gap-15">
        <div>
          <h1 className="text-display tracking-display leading-[110%] font-medium text-titleColor">Privacy Policy</h1>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mt-4">
            <span className="font-medium text-mainTitleColor">Last updated:</span> 19 Feb 2026
          </p>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mt-6">
            BDC Capital Private Limited (“BDC Capital”, “we”, “our”, or “us”) is committed to protecting
            the privacy and personal information of users visiting our website and applying for our
            financial products. This Privacy Policy explains how we collect, use, store, and protect your
            information.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">1. Information We Collect</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            We may collect the following types of information when you visit our website or submit an
            enquiry or loan application:
          </p>

          <div className="flex flex-col gap-4 pl-0 md:pl-4">
            <h3 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">a. Personal Information</h3>
            <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
              <li>Full name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>Address details</li>
              <li>PAN, Aadhaar, and other KYC-related information</li>
              <li>Employment and income details</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 pl-0 md:pl-4">
            <h3 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">b. Business Information (where applicable)</h3>
            <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
              <li>Business name and type</li>
              <li>Nature of business</li>
              <li>Financial and operational details</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 pl-0 md:pl-4">
            <h3 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">c. Technical Information</h3>
            <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Website usage data (for analytics and performance)</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">2. Purpose of Information Collection</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            The information collected is used for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Processing loan enquiries and applications</li>
            <li>Conducting eligibility assessment and verification</li>
            <li>Completing Know Your Customer (KYC) requirements</li>
            <li>Communicating with applicants regarding their requests</li>
            <li>Complying with legal, regulatory, and RBI requirements</li>
            <li>Improving website performance and user experience</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">3. Consent</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            By submitting your information on this website, you:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Confirm that the information provided is true and accurate</li>
            <li>Provide explicit consent for the collection, storage, processing, and sharing of your personal data</li>
            <li>Acknowledge that your data may be shared with third parties solely for verification, credit assessment, and regulatory compliance</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">4. Information Sharing & Disclosure</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            BDC Capital does not sell or rent personal information to third parties.
            Your information may be shared only with:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Credit bureaus and verification agencies</li>
            <li>Banks, financial institutions, or service providers involved in loan processing</li>
            <li>Regulatory or statutory authorities, if required by law</li>
          </ul>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            All third parties are required to follow applicable data protection and confidentiality standards.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">5. Data Storage & Security</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            We implement reasonable security practices and procedures to protect your information against unauthorized access, misuse, or loss. Your data is stored securely and accessed only by authorized personnel on a need-to-know basis.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">6. Cookies & Website Tracking</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            Our website may use cookies or similar technologies to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Improve website functionality</li>
            <li>Analyse traffic and usage patterns</li>
          </ul>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            You may choose to disable cookies through your browser settings; however, some features of the website may not function properly.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">7. Data Retention</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            Personal information is retained only for as long as necessary to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Fulfil the purposes stated in this policy</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            Once no longer required, the information is securely deleted or anonymised.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">8. User Rights</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            You may request:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete data</li>
            <li>Clarification on how your data is being used</li>
          </ul>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            Requests can be made by contacting us using the details provided below.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">9. Third-Party Links</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            Our website may contain links to external websites. BDC Capital is not responsible for the privacy practices or content of such third-party sites.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">10. Policy Updates</h2>
          <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
            BDC Capital reserves the right to update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">11. Contact Information</h2>
          <div className="flex flex-col gap-2">
            <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
              For questions or concerns regarding this Privacy Policy, please contact:
            </p>
            <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor font-bold">
              BDC Capital Private Limited
            </p>
            <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
              1602, Signature by Lotus, Veera Desai Industrial Estate,
              <br />
              Andheri West, Mumbai, Maharashtra - 400053, India
            </p>
            <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mt-2">
              Email: <a href="mailto:siddhesh@bombaydc.com" className="text-mainTitleColor underline hover:text-[#005a45] transition-colors">siddhesh@bombaydc.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}