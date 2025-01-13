import React, { ReactNode, useEffect, useState } from "react";

import { WaldiezThemeContext } from "@waldiez/theme/useWaldiezTheme";
import { isInitiallyDark, setTheme } from "@waldiez/theme/utils";

export const WaldiezThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(isInitiallyDark());
    useEffect(() => {
        const initialDark = isInitiallyDark();
        setIsDark(initialDark);
    }, []);
    const toggleTheme = () => {
        setIsDark(prev => {
            setTheme(!prev);
            return !prev;
        });
    };
    return (
        <WaldiezThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </WaldiezThemeContext.Provider>
    );
};
