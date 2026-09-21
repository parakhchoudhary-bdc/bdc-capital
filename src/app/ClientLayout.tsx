"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { FooterProvider } from "@/context/FooterContext";
import { useMainRef } from "@/context/MainRefContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { PopupProvider } from "@/context/PopupContext";
import RequestCallbackPopup from "@/components/RequestCallbackPopup";

gsap.registerPlugin(ScrollTrigger);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { mainRef } = useMainRef();
  const footerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Reset footer state when pathname changes
    if (footerRef.current) {
      gsap.set(footerRef.current, { opacity: 1 });
    }

    // Skip footer animation for contact-us page
    if (pathname === "/contact-us" || pathname.startsWith("/apply-for")) {
      // Ensure ScrollTrigger is cleaned up if it exists
      if (mainRef?.current) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === mainRef.current) {
            st.kill();
          }
        });
      }
      return;
    }

    if (mainRef?.current && footerRef.current) {
      const footerHeight = footerRef.current.offsetHeight || 100;
      const windowHeight = window.innerHeight;

      gsap.set(footerRef.current, { opacity: 0 });

      const anim = gsap.to(footerRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "bottom 80%",
          end: `bottom ${windowHeight - (footerHeight + 100)}px`,
          scrub: true,
          // markers: true,
        },
      });

      return () => {
        anim.kill();
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      };
    }
  }, [mainRef, footerRef, pathname]);

  return (
    <PopupProvider>
      <ReactLenis root>
        <LanguageProvider>
          <RequestCallbackPopup />
          <FooterProvider>
            {!pathname.startsWith("/apply") && <Header />}
            <div ref={mainRef}>{children}</div>
            {!pathname.startsWith("/apply") && (
              <Footer
                id="footer"
                ref={footerRef}
                className={`${pathname !== "/contact-us" && "sticky bg-white bottom-0 overflow-visible"}`}
              />
            )}
          </FooterProvider>
        </LanguageProvider>
      </ReactLenis>
    </PopupProvider>
  );
}