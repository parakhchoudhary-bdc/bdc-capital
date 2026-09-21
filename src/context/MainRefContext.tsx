"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  RefObject,
} from "react";

interface MainRefContextType {
  mainRef: RefObject<HTMLDivElement | null> | null;
  setMainRef: (ref: RefObject<HTMLDivElement | null>) => void;
}

const MainRefContext = createContext<MainRefContextType | undefined>(undefined);

export const MainRefProvider = ({ children }: { children: ReactNode }) => {
  const [mainRef, setMainRefState] =
    useState<RefObject<HTMLDivElement | null> | null>(null);

  const setMainRef = (ref: RefObject<HTMLDivElement | null>) => {
    setMainRefState(ref);
  };

  return (
    <MainRefContext.Provider value={{ mainRef, setMainRef }}>
      {children}
    </MainRefContext.Provider>
  );
};

export const useMainRef = () => {
  const context = useContext(MainRefContext);
  if (!context) {
    throw new Error("useMainRef must be used within a MainRefProvider");
  }
  return context;
};
