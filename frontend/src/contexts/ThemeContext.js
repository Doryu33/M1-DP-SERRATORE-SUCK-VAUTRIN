import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDark, setDark] = useState(false);

    const toggleTheme = () => {
        setDark(!isDark);
    };

    return (
        <>
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}

        </ThemeContext.Provider>
        </>
    )
}

export {ThemeContext, ThemeProvider};