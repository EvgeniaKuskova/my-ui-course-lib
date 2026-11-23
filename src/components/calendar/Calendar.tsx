import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import Button from '../button/Button.tsx';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons.tsx';
import { useLocale } from './locale.ts';
import type { Locale } from './locale.ts';
import type { CalendarProps } from './Calendar.types.ts';
import * as s from './Calendar.css.ts';

/* ——— работа с датами ——— */

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const daysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const addDays = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

// 31 января → 28/29 февраля, 31 марта → 30 апреля
const addMonths = (date: Date, amount: number) => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const day = Math.min(date.getDate(), daysInMonth(target));
  return new Date(target.getFullYear(), target.getMonth(), day);
};

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

/* ——— форматирование через Intl ——— */

const capitalize = (value: string, locale: string) =>
  value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);

// «Ноябрь 2026»: месяц и год через Intl, без «г.» и служебных частей
const formatMonthTitle = (date: Date, locale: string) => {
  const parts = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).formatToParts(date);

  const text = parts
    .filter((part) => part.type === 'month' || part.type === 'year')
    .map((part) => part.value)
    .join(' ');

  return capitalize(text, locale);
};

// русский Intl дописывает «г.» в конце — в макете даты без него
const RU_YEAR_SUFFIX = /[\s\u00A0\u202F]+г\.\s*$/;

const formatDate = (
  date: Date,
  locale: string,
  monthStyle: 'long' | 'short',
  withWeekday = false,
) => {
  const text = new Intl.DateTimeFormat(locale, {
    ...(withWeekday ? { weekday: 'long' } : {}),
    day: 'numeric',
    month: monthStyle,
    year: 'numeric',
  }).format(date);

  return text.replace(RU_YEAR_SUFFIX, '');
};

// 2 января 2000 — воскресенье: опорная неделя для названий дней
const WEEKDAY_REFERENCE = new Date(2000, 0, 2);

type WeekdayInfo = {
  label: string;
  fullName: string;
  isWeekend: boolean;
};

const buildWeekdays = (locale: Locale): WeekdayInfo[] => {
  const { locale: localeCode, firstDayOfWeek, weekend } = locale;
  // в арабском дни недели короткие — weekday: 'narrow'
  const weekdayStyle = localeCode.startsWith('ar') ? 'narrow' : 'short';
  const short = new Intl.DateTimeFormat(localeCode, { weekday: weekdayStyle });
  const long = new Intl.DateTimeFormat(localeCode, { weekday: 'long' });

  return Array.from({ length: 7 }, (_, column) => {
    const offset = (firstDayOfWeek + column) % 7;
    const date = addDays(WEEKDAY_REFERENCE, offset);

    return {
      label: short.format(date),
      fullName: long.format(date),
      isWeekend: weekend.includes(date.getDay()),
    };
  });
};

/* ——— компонент ——— */

export function Calendar(props: CalendarProps) {
  const {
    value,
    onValueChange,
    month: monthProp,
    onMonthChange,
    minDate,
    maxDate,
    isDateDisabled,
    autoFocus,
  } = props;

  const locale = useLocale();
  const { locale: localeCode, dir, firstDayOfWeek, weekend, messages } = locale;

  const min = minDate ? startOfDay(minDate) : null;
  const max = maxDate ? startOfDay(maxDate) : null;

  // month — показанный месяц, value — выбранная дата: листание не трогает value
  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(value ?? new Date()),
  );
  const month = monthProp ? startOfMonth(monthProp) : internalMonth;

  const [focusedDate, setFocusedDate] = useState(() => {
    const base = value ?? startOfDay(new Date());
    return isSameMonth(base, month) ? base : startOfMonth(month);
  });

  // если месяц сменили снаружи — фокус остаётся внутри видимого месяца
  const focusDate = isSameMonth(focusedDate, month)
    ? focusedDate
    : startOfMonth(month);

  const today = startOfDay(new Date());
  const titleId = useId();

  const isUnavailable = useCallback(
    (date: Date) => {
      const day = startOfDay(date);
      if (min && day < min) return true;
      if (max && day > max) return true;
      return isDateDisabled ? isDateDisabled(day) : false;
    },
    [min, max, isDateDisabled],
  );

  const changeMonth = (next: Date) => {
    const nextMonth = startOfMonth(next);
    setInternalMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  const selectDate = (date: Date) => {
    if (isUnavailable(date)) return;
    onValueChange(date);
  };

  const goToday = () => {
    const now = startOfDay(new Date());
    changeMonth(now);
    setFocusedDate(now);
    if (!isUnavailable(now)) onValueChange(now);
  };

  /* фокус на нужном дне: autoFocus при монтировании, дальше — после навигации */

  const pendingFocus = useRef(false);
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  const autoFocusRef = useRef(autoFocus);

  useEffect(() => {
    if (autoFocusRef.current) {
      autoFocusRef.current = false;
      dayRefs.current.get(dayKey(focusDate))?.focus();
      return;
    }

    if (pendingFocus.current) {
      pendingFocus.current = false;
      dayRefs.current.get(dayKey(focusDate))?.focus();
    }
  }, [focusDate]);

  const moveFocus = (next: Date) => {
    pendingFocus.current = true;
    setFocusedDate(next);
    if (!isSameMonth(next, month)) changeMonth(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const weekOffset = (focusDate.getDay() - firstDayOfWeek + 7) % 7;
    let next: Date;

    switch (event.key) {
      // в RTL стрелки ← → работают наоборот
      case 'ArrowLeft':
        next = addDays(focusDate, dir === 'rtl' ? 1 : -1);
        break;
      case 'ArrowRight':
        next = addDays(focusDate, dir === 'rtl' ? -1 : 1);
        break;
      case 'ArrowUp':
        next = addDays(focusDate, -7);
        break;
      case 'ArrowDown':
        next = addDays(focusDate, 7);
        break;
      case 'Home':
        next = addDays(focusDate, -weekOffset);
        break;
      case 'End':
        next = addDays(focusDate, 6 - weekOffset);
        break;
      case 'PageUp':
        next = addMonths(focusDate, -1);
        break;
      case 'PageDown':
        next = addMonths(focusDate, 1);
        break;
      default:
        return;
    }

    event.preventDefault();
    moveFocus(next);
  };

  /* сетка: дни соседних месяцев не показываем */

  const weeks = useMemo(() => {
    const first = startOfMonth(month);
    const leading = (first.getDay() - firstDayOfWeek + 7) % 7;
    const count = daysInMonth(month);
    const total = Math.ceil((leading + count) / 7) * 7;

    const cells: (Date | null)[] = Array.from({ length: total }, (_, index) => {
      const day = index - leading + 1;
      return day >= 1 && day <= count
        ? new Date(month.getFullYear(), month.getMonth(), day)
        : null;
    });

    const rows: (Date | null)[][] = [];
    for (let index = 0; index < cells.length; index += 7) {
      rows.push(cells.slice(index, index + 7));
    }
    return rows;
  }, [month, firstDayOfWeek]);

  const weekdays = useMemo(() => buildWeekdays(locale), [locale]);

  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(localeCode, { day: 'numeric' }),
    [localeCode],
  );

  // в макете у en месяц сокращённый («Nov 17, 2026»), у ru и ar — длинный
  const monthStyle: 'long' | 'short' = localeCode.startsWith('en')
    ? 'short'
    : 'long';

  const prevDisabled = min !== null && month <= startOfMonth(min);
  const nextDisabled = max !== null && month >= startOfMonth(max);

  const title = formatMonthTitle(month, localeCode);

  return (
    <div className={s.root} dir={dir}>
      <div className={s.header}>
        <button
          type="button"
          className={s.navButton}
          aria-label={messages.calendar.prevMonth}
          disabled={prevDisabled}
          onClick={() => changeMonth(addMonths(month, -1))}
        >
          <ChevronLeftIcon className={s.chevron} />
        </button>

        <h2 className={s.monthTitle} id={titleId}>
          {title}
        </h2>

        <button
          type="button"
          className={s.navButton}
          aria-label={messages.calendar.nextMonth}
          disabled={nextDisabled}
          onClick={() => changeMonth(addMonths(month, 1))}
        >
          <ChevronRightIcon className={s.chevron} />
        </button>
      </div>

      <div
        className={s.grid}
        role="grid"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        <div className={s.row} role="row">
          {weekdays.map((weekday) => (
            <div
              key={weekday.fullName}
              role="columnheader"
              className={[s.weekday, weekday.isWeekend ? s.weekdayWeekend : '']
                .filter(Boolean)
                .join(' ')}
              aria-label={weekday.fullName}
            >
              {weekday.label}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={s.row} role="row">
            {week.map((date, dayIndex) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${dayIndex}`}
                    role="gridcell"
                    className={s.cell}
                  />
                );
              }

              const key = dayKey(date);
              const selected = value !== null && isSameDay(value, date);
              const isToday = isSameDay(today, date);
              const disabled = isUnavailable(date);
              const isWeekend = weekend.includes(date.getDay());
              const className = [
                s.day,
                isWeekend ? s.weekend : '',
                disabled ? s.disabled : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={key}
                  role="gridcell"
                  className={s.cell}
                  aria-selected={selected || undefined}
                >
                  <button
                    type="button"
                    ref={(element) => {
                      if (element) {
                        dayRefs.current.set(key, element);
                      } else {
                        dayRefs.current.delete(key);
                      }
                    }}
                    className={className}
                    tabIndex={isSameDay(focusDate, date) ? 0 : -1}
                    aria-disabled={disabled || undefined}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={formatDate(date, localeCode, monthStyle, true)}
                    onClick={() => selectDate(date)}
                  >
                    <span>{dayFormatter.format(date)}</span>
                    {isToday && <span className={s.dot} aria-hidden="true" />}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={s.footer}>
        <span className={s.selectedDate} aria-live="polite">
          {value ? formatDate(value, localeCode, monthStyle) : '\u2014'}
        </span>

        <Button
          variant="outline"
          icon={<CalendarIcon />}
          className={s.todayButton}
          onClick={goToday}
        >
          {messages.calendar.today}
        </Button>
      </div>
    </div>
  );
}
