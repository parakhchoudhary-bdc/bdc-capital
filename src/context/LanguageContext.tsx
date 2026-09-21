"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const COOKIE_NAME = "lang";

type Language = "en" | "mr";

// Helper to get cookie value outside of component lifecycle
const getInitialLang = (): Language => {
  if (typeof document === "undefined") return "en";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${COOKIE_NAME}=`);
  const cookieLang =
    parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
  return cookieLang === "mr" ? "mr" : "en";
};

interface LanguageContextType {
  language: Language;
  updateLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialLang = getInitialLang();
    setLanguage(initialLang);

    // Ensure classes are synced (script in layout.tsx handled initial, but let's be safe)
    document.documentElement.classList.remove("lang-english", "lang-marathi");
    document.documentElement.classList.add(
      initialLang === "mr" ? "lang-marathi" : "lang-english",
    );

    setIsReady(true);
  }, []);

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
    document.cookie = `${COOKIE_NAME}=${lang}; expires=${expires}; path=/`;

    // Update <html> class for fonts
    document.documentElement.classList.remove("lang-english", "lang-marathi");
    document.documentElement.classList.add(
      lang === "mr" ? "lang-marathi" : "lang-english",
    );
  };

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      <div style={{ visibility: isReady ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};