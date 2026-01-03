import React, { createContext, useContext, useState } from "react";

const userSettingsContext = createContext();

const storageKey = "user-settings";

export default function UserSettingsProvider({ children }) {
    // TODO: fix this for reloading of page
    const [isDarkMode, SetIsDarkMode] = useState(localStorage.getItem(storageKey).theme === 'dark' || (!((storageKey) in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    console.log("Theme: ", isDarkMode);

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    function toggleTheme() {
        SetIsDarkMode(prev => !prev);

        const userSettings = JSON.parse(localStorage.getItem(storageKey));

        const newSettings = {
            ...userSettings,
            theme: isDarkMode ? "light" : "dark"
        }

        localStorage.setItem(storageKey, JSON.stringify(newSettings));
    }



    return (
        <userSettingsContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </userSettingsContext.Provider>
    );
};

export const useSettings = () => useContext(userSettingsContext);