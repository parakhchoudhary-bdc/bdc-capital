import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { MainRefProvider } from "@/context/MainRefContext";
import QueryProvider from "@/providers/QueryProvider";
import Script from "next/script";
// import Footer from "@/components/Footer";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const kohinoor = localFont({
  src: "../../public/fonts/kohinoor-devanagari.ttf",
  variable: "--font-kohinoor",
});

export const metadata: Metadata = {
  title: "BDC Capital | Registered NBFC & Credit Solutions",
  description: "Finance that’s easier to access, when you need it most. Personal, Business, Housing, Vehicle & Working Capital loans by BDC Capital Private Limited.",
  icons: {
    icon: "/common/bdc-capital-logo.svg",
    shortcut: "/common/bdc-capital-logo.svg",
    apple: "/common/bdc-capital-logo.svg",
  },
  openGraph: {
    title: "BDC Capital | Registered NBFC & Credit Solutions",
    description: "Finance that’s easier to access, when you need it most. Personal, Business, Housing, Vehicle & Working Capital loans by BDC Capital Private Limited.",
    siteName: "BDC Capital",
    images: [
      {
        url: "/common/bdc-capital-og.jpg",
        width: 1200,
        height: 630,
        alt: "BDC Capital - NBFC Financial Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BDC Capital | Registered NBFC & Credit Solutions",
    description: "Finance that’s easier to access, when you need it most. Personal, Business, Housing, Vehicle & Working Capital loans by BDC Capital Private Limited.",
    images: ["/common/bdc-capital-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var COOKIE_NAME = 'lang';
                  var value = "; " + document.cookie;
                  var parts = value.split("; " + COOKIE_NAME + "=");
                  var lang = 'en';
                  if (parts.length === 2) {
                    lang = parts.pop().split(";").shift();
                  }
                  document.documentElement.classList.add(lang === 'mr' ? 'lang-marathi' : 'lang-english');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${figtree.variable} ${kohinoor.variable} antialiased`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F1B7B98CJJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F1B7B98CJJ');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vmwcv58f3g");
          `}
        </Script>
        <QueryProvider>
          <MainRefProvider>
            <ClientLayout>{children}</ClientLayout>
          </MainRefProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
