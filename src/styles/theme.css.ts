import { createGlobalTheme } from '@vanilla-extract/css';

export const themeTokens = {
    fontFamily: 'Inter, system-ui, sans-serif',

    buttonBorderColor: '#17171b',
    buttonBorderWidth: '1px',
    buttonBorderStyle: 'solid',
    buttonBorderRadius: '10px',
    buttonMinWidth: '140px',

    buttonFillBg: '#17171b',
    buttonFillBgHover: '#2d2d33',
    buttonFillBgActive: '#050506',
    buttonFillText: '#ffffff',

    buttonOutlineBg: '#ffffff',
    buttonOutlineBgHover: '#f4f4f5',
    buttonOutlineBgActive: '#e4e4e7',
    buttonOutlineText: '#08060d',

    buttonTextVariantColor: '#17171b',
    buttonTextVariantBgHover: '#f4f4f5',
    buttonTextVariantBgActive: '#e7e7ea',

    buttonSmallHeight: '36px',
    buttonSmallFontSize: '14px',
    buttonSmallPaddingX: '16px',
    buttonSmallPaddingY: '16px',

    buttonMediumHeight: '44px',
    buttonMediumFontSize: '15px',
    buttonMediumPaddingX: '16px',
    buttonMediumPaddingY: '16px',

    buttonLargeHeight: '52px',
    buttonLargeFontSize: '16px',
    buttonLargePaddingX: '16px',
    buttonLargePaddingY: '16px',
} as const;

export type ThemeToken = keyof typeof themeTokens;

export const vars = createGlobalTheme(':root', themeTokens);
