import { useState } from "react";

import { isDarkMode, toggleThemeMode } from "@waldiez/theme";

export const useTheme = (flowId: string, storageId: string) => {
    const darkTheme = isDarkMode(flowId, storageId);
    const [isDark, setIsDark] = useState<boolean>(darkTheme);
    const onThemeToggle = () => {
        setIsDark(!isDark);
        toggleThemeMode(flowId, storageId);
    };
    return { isDark, onThemeToggle };
};
