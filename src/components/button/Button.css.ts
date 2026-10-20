import { style, styleVariants } from '@vanilla-extract/css';
import {vars} from "../../styles/theme.css.ts";

export const base = style({
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: vars.font.family,
    minWidth: vars.button.minWidth,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.button.borderRadius,
    border: `${vars.button.borderWidth} ${vars.button.borderStyle} ${vars.button.borderColor}`,
    cursor: 'pointer',

    selectors: {
        '&:disabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
        }
    }
});

export const size = styleVariants({
    S: {
        height: vars.button.size.S.height,
        fontSize: vars.button.size.S.fontSize,
        padding: vars.button.size.S.padding,
    },
    M: {
        height: vars.button.size.M.height,
        fontSize: vars.button.size.M.fontSize,
        padding: vars.button.size.M.padding,
    },
    L: {
        height: vars.button.size.L.height,
        fontSize: vars.button.size.L.fontSize,
        padding: vars.button.size.L.padding,
    }
});

export const variant = styleVariants({
    fill: {
        backgroundColor: vars.button.fill.bg,
        color: vars.button.fill.text,
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.button.fill.bgHover,
                borderColor: vars.button.fill.bgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.button.fill.bgActive,
                borderColor: vars.button.fill.bgActive,
            },
            '&:disabled': {
                color: vars.button.fill.text,
            }
        }
    },
    outline: {
        backgroundColor: vars.button.outline.bg,
        color: vars.button.outline.text,
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.button.outline.bgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.button.outline.bgActive,
            },
            '&:disabled': {
                backgroundColor: vars.button.outline.bg,
            }
        }
    },
    text: {
        backgroundColor: 'transparent',
        color: vars.button.textVariant.color,
        borderColor: 'transparent',
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.button.textVariant.bgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.button.textVariant.bgActive,
            }
        }
    }
});
