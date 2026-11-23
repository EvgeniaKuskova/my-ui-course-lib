import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';
import { base as buttonBase } from '../button/Button.css.ts';

export const root = style({
    boxSizing: 'border-box',
    width: vars.calendarWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.calendarSectionGap,
    paddingBlock: vars.calendarPadding,
    paddingInline: vars.calendarPadding,
    background: vars.calendarBg,
    border: `${vars.calendarBorderWidth} solid ${vars.calendarBorderColor}`,
    borderRadius: vars.calendarBorderRadius,
    fontFamily: vars.fontFamily,
    color: vars.calendarColor,
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.calendarHeaderGap,
});

export const monthTitle = style({
    flex: 1,
    margin: 0,
    textAlign: 'center',
    fontSize: vars.calendarTitleFontSize,
    fontWeight: vars.calendarTitleFontWeight,
    color: vars.calendarColor,
});

export const navButton = style({
    boxSizing: 'border-box',
    width: vars.calendarNavSize,
    height: vars.calendarNavSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    background: 'transparent',
    border: `${vars.calendarBorderWidth} solid ${vars.calendarNavBorderColor}`,
    borderRadius: vars.calendarNavRadius,
    color: vars.calendarColor,
    cursor: 'pointer',
    selectors: {
        '&:not(:disabled):hover': {
            background: vars.calendarNavBgHover,
        },
        '&:disabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.calendarFocusColor}`,
            outlineOffset: '2px',
        },
    },
});

// Шевроны зеркалятся в RTL, иконка календаря — нет
export const chevron = style({
    display: 'flex',
    selectors: {
        '[dir="rtl"] &': {
            transform: 'scaleX(-1)',
        },
    },
});

export const grid = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.calendarGridRowGap,
});

export const row = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    columnGap: vars.calendarGridColumnGap,
    justifyItems: 'center',
});

export const weekday = style({
    height: vars.calendarWeekdayHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: vars.calendarWeekdayFontSize,
    color: vars.calendarMutedColor,
});

export const weekdayWeekend = style({
    color: vars.calendarWeekendColor,
});

export const cell = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

// Порядок объявления важен: weekend → disabled → day (внутри day — selected).
// Равная специфичность решается порядком, поэтому выбранный день
// перекрывает цвет выходного и disabled.
export const weekend = style({
    color: vars.calendarWeekendColor,
});

export const disabled = style({
    color: vars.calendarDisabledColor,
});

export const day = style({
    boxSizing: 'border-box',
    width: vars.calendarDaySize,
    height: vars.calendarDaySize,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.calendarDayGap,
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'transparent',
    borderRadius: vars.calendarDayRadius,
    fontFamily: vars.fontFamily,
    fontSize: vars.calendarDayFontSize,
    lineHeight: 1,
    color: vars.calendarColor,
    cursor: 'pointer',
    selectors: {
        '&:not([aria-disabled="true"]):hover': {
            background: vars.calendarHoverBg,
        },
        '&:not([aria-disabled="true"]):active': {
            background: vars.calendarActiveBg,
        },
        '&[aria-disabled="true"]': {
            cursor: 'not-allowed',
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.calendarFocusColor}`,
            outlineOffset: '2px',
        },
        '[aria-selected="true"] &': {
            background: vars.calendarSelectedBg,
            color: vars.calendarSelectedColor,
        },
        '[aria-selected="true"] &:hover': {
            background: vars.calendarSelectedBg,
        },
        '[aria-selected="true"] &:active': {
            background: vars.calendarSelectedBg,
        },
    },
});

// Точка под сегодняшним числом: currentColor наследует цвет текста дня
export const dot = style({
    width: vars.calendarDotSize,
    height: vars.calendarDotSize,
    borderRadius: '50%',
    background: 'currentColor',
});

export const footer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.calendarFooterGap,
});

export const selectedDate = style({
    fontSize: vars.calendarFooterFontSize,
    color: vars.calendarMutedColor,
    whiteSpace: 'nowrap',
});

// Кнопка «Сегодня» — ваш Button с иконкой, отступы 12 и 16.
// Селектор с классом Button повышает специфичность и перекрывает размеры size.
export const todayButton = style({
    selectors: {
        [`${buttonBase}&`]: {
            height: vars.calendarTodayBtnHeight,
            fontSize: vars.calendarTodayBtnFontSize,
            paddingBlock: vars.calendarTodayBtnPaddingBlock,
            paddingInline: vars.calendarTodayBtnPaddingInline,
        },
    },
});
