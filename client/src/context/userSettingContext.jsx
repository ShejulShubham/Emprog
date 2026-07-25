import React, { createContext, useContext, useEffect, useState } from "react";

const userSettingsContext = createContext();

const storageKey = "user-settings";

export default function UserSettingsProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        if ((storageKey in localStorage)) {
            const localThemeSetting = JSON.parse(localStorage.getItem(storageKey)).theme === "dark";
            setIsDarkMode(localThemeSetting);
        }
    }, [])
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        saveThemeToLocalStorage(isDarkMode);

    }, [isDarkMode]);

    function saveThemeToLocalStorage(setToDarkMode) {
        const userSettings = JSON.parse(localStorage.getItem(storageKey));

        const newSettings = {
            ...userSettings,
            theme: setToDarkMode ? "dark" : "light"
        }

        localStorage.setItem(storageKey, JSON.stringify(newSettings));
    }


    function toggleTheme() {
        setIsDarkMode(prev => !prev);
    }



    return (
        <userSettingsContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </userSettingsContext.Provider>
    );
};

export const useSettings = () => useContext(userSettingsContext);