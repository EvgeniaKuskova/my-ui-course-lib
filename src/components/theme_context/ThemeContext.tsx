import {createContext, type ReactNode} from "react";
import {themeClass} from "../../styles/theme.css.ts";

type ThemeContextType = {
    themeClassName: string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={{ themeClassName: themeClass }}>
            <div className={themeClass}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
