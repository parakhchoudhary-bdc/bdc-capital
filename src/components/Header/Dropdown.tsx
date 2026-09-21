"use client";
import React, { useRef, ReactNode } from "react";
import useScreenSizeSmall from "@/hooks/useScreenSizeSmall";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  triggerClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
  className = "",
  triggerClassName = "",
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSmallScreen = useScreenSizeSmall();

  const handleMouseEnter = () => {
    if (!isSmallScreen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSmallScreen) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };

  const handleClick = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick} className={triggerClassName}>
        {trigger}
      </div>
      {children}
    </div>
  );
};

export default Dropdown;
