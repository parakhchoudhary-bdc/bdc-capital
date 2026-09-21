"use client";
import { useState, useEffect } from "react";

const useScreenSizeLarge = (): boolean => {
  const [isDevice, setIsDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDevice(window.innerWidth >= 1152);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isDevice;
};

export default useScreenSizeLarge;