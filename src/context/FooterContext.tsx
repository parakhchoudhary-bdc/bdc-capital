// app/context/FooterContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface FooterContentData {
  heading: string;
  description: string;
  ctaContent: string;
  href: string;
  target?: string;
}

interface FooterContextType {
  footerContent: FooterContentData | null;
  setFooterContent: (content: FooterContentData | null) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const useFooter = (): FooterContextType => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
};

interface FooterProviderProps {
  children: ReactNode;
}

export const FooterProvider = ({ children }: FooterProviderProps) => {
  const [footerContent, setFooterContent] = useState<FooterContentData | null>(
    null,
  );

  return (
    <FooterContext.Provider value={{ footerContent, setFooterContent }}>
      {children}
    </FooterContext.Provider>
  );
};
