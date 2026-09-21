import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions – BDC Capital",
    description: "Review the user terms, conditions, and legal policies governing the use of the BDC Capital digital platform.",
};

export default function TermsAndConditions() {
    return (
        <main className="min-h-full px-4 md:px-6 lg:px-10 pt-20">
            <section className="py-15 lg:py-20 max-w-5xl @6xl:max-w-7xl mx-auto flex flex-col gap-15">
                <div>
                    <h1 className="text-display tracking-display leading-[110%] font-medium text-titleColor">Terms & Conditions</h1>
                    <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mt-4">
                        <span className="font-medium text-mainTitleColor">Last updated:</span> 19 Feb 2026
                    </p>
                    <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor mt-6">
                        These Terms & Conditions (“Terms”) govern your access to and use of the website operated
                        by BDC Capital Private Limited (“BDC Capital”, “we”, “our”, or “us”). By accessing this
                        website or submitting any enquiry or application, you agree to be bound by these Terms.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">1. About BDC Capital</h2>
                    <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        BDC Capital Private Limited (formerly known as Pyar Finance Private Limited) is a
                        Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India (RBI).
                        All loan products and services offered are subject to applicable laws, regulations, and
                        internal policies.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">2. Website Usage</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>This website is intended to provide general information about BDC Capital’s loan products and services.</li>
                        <li>Accessing or using this website does not create a contractual relationship or guarantee loan approval.</li>
                        <li>Users must ensure that the information they provide is accurate, complete, and up to date.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">3. Loan Applications & Enquiries</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>Submission of an enquiry or application does not guarantee loan approval or disbursement.</li>
                        <li>All loan products are subject to internal assessment, verification, and applicable regulatory guidelines.</li>
                        <li>Loan terms including amount, interest rate, tenure, and applicable charges are determined after evaluation.</li>
                        <li>BDC Capital reserves the right to accept or reject any application without assigning reasons, as permitted by law.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">4. Accuracy of Information</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>Users are responsible for ensuring the accuracy of information provided during enquiries or applications.</li>
                        <li>BDC Capital shall not be responsible for any consequences arising from incorrect, incomplete, or misleading information submitted by users.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">5. KYC & Verification</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>BDC Capital may collect personal, financial, and KYC information as required under applicable laws and RBI guidelines.</li>
                        <li>Additional documents or information may be requested during the evaluation or verification process.</li>
                        <li>Failure to provide required information may result in rejection or delay of the application.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">6. Use of Information</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>Information collected through this website is used for processing enquiries, loan applications, verification, communication, and regulatory compliance.</li>
                        <li>BDC Capital may share information with third parties such as credit bureaus, verification agencies, or regulatory authorities, strictly for lawful purposes.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">7. Intellectual Property</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>All content on this website, including text, graphics, logos, and design elements, is the property of BDC Capital or its licensors.</li>
                        <li>No content may be copied, reproduced, or distributed without prior written permission from BDC Capital.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">8. Limitation of Liability</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>BDC Capital shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website.</li>
                        <li>The website and its content are provided on an “as is” basis without warranties of any kind.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">9. Third-Party Links</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>This website may contain links to external websites for informational purposes.</li>
                        <li>BDC Capital does not endorse or control such third-party websites and is not responsible for their content or practices.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">10. Compliance & Regulatory Disclaimer</h2>
                    <ul className="list-disc pl-5 space-y-2 text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        <li>BDC Capital operates in compliance with RBI regulations applicable to NBFCs.</li>
                        <li>Users are advised that financial products involve risks and should carefully review terms before applying.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">11. Modification of Terms</h2>
                    <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        BDC Capital reserves the right to modify or update these Terms & Conditions at any time without prior notice. Updated terms will be effective once published on this website.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">12. Governing Law & Jurisdiction</h2>
                    <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-subHeading tracking-subHeading leading-[110%] font-medium text-titleColor">13. Contact Information</h2>
                    <div className="flex flex-col gap-1">
                        <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                            If you have questions regarding these Terms, please contact us at:
                        </p>
                        <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor font-bold">
                            BDC Capital Private Limited
                        </p>
                        <p className="text-bodyBase tracking-base leading-[124%] text-mainTitleCopyColor">
                            (Formerly known as Pyar Finance Private Limited)
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
