"use client";
import { useState, useEffect } from "react";

const useScreenSizeMedium = (): boolean => {
  const [isDevice, setIsDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDevice(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isDevice;
};

export default useScreenSizeMedium;
