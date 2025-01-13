import { createContext, useContext } from "react";

type WaldiezThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

export const WaldiezThemeContext = createContext<WaldiezThemeContextType | undefined>(undefined);

export const useWaldiezTheme = (): WaldiezThemeContextType => {
    const context = useContext(WaldiezThemeContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
