import { useMemo, type CSSProperties, type ReactNode } from "react";
import { vars } from "../../styles/theme.css.ts";
import type { ThemeToken } from "../../styles/theme.css.ts";
import { ThemeContext } from "./themeContext.ts";
import type { Theme } from "./themeContext.ts";

export type ThemeProviderProps = {
    theme?: Theme;
    tokens?: Partial<Record<ThemeToken, string>>;
    children?: ReactNode;
};

export const ThemeProvider = ({ theme, tokens, children }: ThemeProviderProps) => {
    const overrides = useMemo<CSSProperties | undefined>(() => {
        if (!tokens) {
            return undefined;
        }

        const style: Record<string, string> = {};

        for (const token of Object.keys(tokens) as ThemeToken[]) {
            const value = tokens[token];
            if (value === undefined) {
                continue;
            }
            style[vars[token].slice(4, -1)] = value;
        }

        return style as CSSProperties;
    }, [tokens]);

    const content = overrides ? <div style={overrides}>{children}</div> : children;

    if (theme === undefined) {
        return <>{content}</>;
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div data-theme={theme}>{content}</div>
        </ThemeContext.Provider>
    );
};
