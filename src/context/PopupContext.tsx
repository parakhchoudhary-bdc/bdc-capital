"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
    isPopupOpen: boolean;
    openPopup: () => void;
    closePopup: () => void;
    togglePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const togglePopup = () => setIsPopupOpen((prev) => !prev);

    return (
        <PopupContext.Provider
            value={{ isPopupOpen, openPopup, closePopup, togglePopup }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (context === undefined) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
};
