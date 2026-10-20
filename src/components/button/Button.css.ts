import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';

export const base = style({
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: vars.fontFamily,
    minWidth: vars.buttonMinWidth,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.buttonBorderRadius,
    border: `${vars.buttonBorderWidth} ${vars.buttonBorderStyle} ${vars.buttonBorderColor}`,
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
        height: vars.buttonSmallHeight,
        fontSize: vars.buttonSmallFontSize,
        padding: `${vars.buttonSmallPaddingY} ${vars.buttonSmallPaddingX}`,
    },
    M: {
        height: vars.buttonMediumHeight,
        fontSize: vars.buttonMediumFontSize,
        padding: `${vars.buttonMediumPaddingY} ${vars.buttonMediumPaddingX}`,
    },
    L: {
        height: vars.buttonLargeHeight,
        fontSize: vars.buttonLargeFontSize,
        padding: `${vars.buttonLargePaddingY} ${vars.buttonLargePaddingX}`,
    }
});

export const variant = styleVariants({
    fill: {
        backgroundColor: vars.buttonFillBg,
        color: vars.buttonFillText,
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.buttonFillBgHover,
                borderColor: vars.buttonFillBgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.buttonFillBgActive,
                borderColor: vars.buttonFillBgActive,
            },
            '&:disabled': {
                color: vars.buttonFillText,
            }
        }
    },
    outline: {
        backgroundColor: vars.buttonOutlineBg,
        color: vars.buttonOutlineText,
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.buttonOutlineBgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.buttonOutlineBgActive,
            },
            '&:disabled': {
                backgroundColor: vars.buttonOutlineBg,
            }
        }
    },
    text: {
        backgroundColor: 'transparent',
        color: vars.buttonTextVariantColor,
        borderColor: 'transparent',
        selectors: {
            '&:not(:disabled):hover': {
                backgroundColor: vars.buttonTextVariantBgHover,
            },
            '&:not(:disabled):active': {
                backgroundColor: vars.buttonTextVariantBgActive,
            }
        }
    }
});
