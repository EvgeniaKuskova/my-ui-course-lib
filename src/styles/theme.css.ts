import { createGlobalTheme } from '@vanilla-extract/css';

export const themeTokens = {
    fontFamily: 'Inter, system-ui, sans-serif',

    // ——— Button (из прошлых домашек) ———
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

    buttonIconGap: '8px',

    // ——— Calendar ———
    calendarBg: '#FFFFFF',
    calendarBorderColor: '#E4E4E7',
    calendarBorderWidth: '1px',
    calendarBorderRadius: '16px',
    calendarWidth: '320px',
    calendarPadding: '16px',
    calendarSectionGap: '12px',

    calendarColor: '#18181B',
    calendarMutedColor: '#71717A',
    calendarWeekendColor: '#71717A',
    calendarDisabledColor: '#C4C4CC',
    calendarHoverBg: '#F4F4F5',
    calendarActiveBg: '#E4E4E7',
    calendarFocusColor: '#18181B',
    calendarSelectedBg: '#17171B',
    calendarSelectedColor: '#FFFFFF',

    calendarHeaderGap: '8px',
    calendarTitleFontSize: '16px',
    calendarTitleFontWeight: '600',
    calendarNavSize: '32px',
    calendarNavRadius: '8px',
    calendarNavBorderColor: '#E4E4E7',
    calendarNavBgHover: '#F4F4F5',

    calendarGridRowGap: '2px',
    calendarGridColumnGap: '4px',
    calendarDaySize: '36px',
    calendarDayRadius: '8px',
    calendarDayFontSize: '15px',
    calendarDayGap: '2px',
    calendarDotSize: '4px',
    calendarWeekdayHeight: '32px',
    calendarWeekdayFontSize: '13px',

    calendarFooterGap: '12px',
    calendarFooterFontSize: '14px',
    calendarTodayBtnHeight: '40px',
    calendarTodayBtnFontSize: '14px',
    calendarTodayBtnPaddingBlock: '12px',
    calendarTodayBtnPaddingInline: '16px',
} as const;

export type ThemeToken = keyof typeof themeTokens;

export const vars = createGlobalTheme(':root', themeTokens);

// Тёмная тема: те же токены — другие значения.
// ThemeProvider вешает атрибут на обёртку: <div data-theme="dark">
export const darkThemeTokens: Record<ThemeToken, string> = {
    ...themeTokens,

    buttonBorderColor: '#3F3F46',
    buttonFillBg: '#FAFAFA',
    buttonFillBgHover: '#E4E4E7',
    buttonFillBgActive: '#D4D4D8',
    buttonFillText: '#18181B',
    buttonOutlineBg: '#18181B',
    buttonOutlineBgHover: '#27272A',
    buttonOutlineBgActive: '#3F3F46',
    buttonOutlineText: '#FAFAFA',
    buttonTextVariantColor: '#FAFAFA',
    buttonTextVariantBgHover: '#27272A',
    buttonTextVariantBgActive: '#3F3F46',

    calendarBg: '#18181B',
    calendarBorderColor: '#27272A',
    calendarColor: '#FAFAFA',
    calendarMutedColor: '#A1A1AA',
    calendarWeekendColor: '#A1A1AA',
    calendarDisabledColor: '#52525B',
    calendarHoverBg: '#27272A',
    calendarActiveBg: '#3F3F46',
    calendarFocusColor: '#FAFAFA',
    calendarSelectedBg: '#FAFAFA',
    calendarSelectedColor: '#18181B',
    calendarNavBorderColor: '#3F3F46',
    calendarNavBgHover: '#27272A',
};

createGlobalTheme('[data-theme="dark"]', vars, darkThemeTokens);
