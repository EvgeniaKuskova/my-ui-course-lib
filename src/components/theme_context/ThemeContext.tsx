import { useMemo, type CSSProperties, type ReactNode } from "react";
import { vars } from "../../styles/theme.css.ts";
import type { ThemeToken } from "../../styles/theme.css.ts";

export type ThemeProviderProps = {
    tokens?: Partial<Record<ThemeToken, string>>;
    children?: ReactNode;
};

export const ThemeProvider = ({ tokens, children }: ThemeProviderProps) => {
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

    if (!overrides) {
        return <>{children}</>;
    }

    return <div style={overrides}>{children}</div>;
};

export { ThemeProvider as ThemeContext };
