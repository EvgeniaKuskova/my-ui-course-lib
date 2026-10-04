import { useEffect, useId, useRef, useState } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react'
import type { DatePickerProps } from './DatePickerProps'
import './DatePicker.css'

export type { DatePickerSize } from './DatePickerProps'

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

interface DayCell {
  date: Date
  inMonth: boolean
}

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

const addDays = (date: Date, delta: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta)

const addMonths = (date: Date, delta: number) => {
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1)
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate()

  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(date.getDate(), lastDay),
  )
}

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  a != null && b != null && dayKey(a) === dayKey(b)

const formatDate = (date: Date | null | undefined) => {
  if (!date) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}.${date.getFullYear()}`
}

function buildWeeks(viewDate: Date): DayCell[][] {
  const first = startOfMonth(viewDate)
  const offset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate()

  const cells: DayCell[] = []

  for (let i = offset; i > 0; i--) {
    cells.push({ date: addDays(first, -i), inMonth: false })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
      inMonth: true,
    })
  }

  let tail = new Date(viewDate.getFullYear(), viewDate.getMonth(), daysInMonth)
  while (cells.length % 7 !== 0) {
    tail = addDays(tail, 1)
    cells.push({ date: tail, inMonth: false })
  }

  const weeks: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return weeks
}

function DatePicker({
  value,
  defaultValue = null,
  onChange,
  size = 'M',
  placeholder = 'ДД.ММ.ГГГГ',
  min = null,
  max = null,
  id,
  className,
  disabled,
  onClick,
  ...rest
}: DatePickerProps) {
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<Date | null>(defaultValue)
  const selected = isControlled ? (value ?? null) : innerValue

  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState<Date>(() =>
    startOfMonth(selected ?? new Date()),
  )
  const [focusedDate, setFocusedDate] = useState<Date>(() =>
    startOfDay(selected ?? new Date()),
  )

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const uid = useId().replace(/:/g, '')
  const cellId = (date: Date) => `day-${uid}-${dayKey(date)}`

  const minDay = min ? startOfDay(min) : null
  const maxDay = max ? startOfDay(max) : null
  const isDisabled = (date: Date) => {
    const day = startOfDay(date)
    if (minDay && day < minDay) return true
    if (maxDay && day > maxDay) return true
    return false
  }

  // Закрытие по клику вне компонента
  useEffect(() => {
    if (!open) return

    const handleMouseDown = (event: globalThis.MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [open])

  // При открытии переносим фокус на сетку календаря
  useEffect(() => {
    if (!open) return

    gridRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const selectDate = (date: Date) => {
    if (isDisabled(date)) return

    if (!isControlled) setInnerValue(date)
    onChange?.(date)
    close()
  }

  const handleTriggerClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || disabled) return

    if (!open) {
      // Показываем месяц с выбранной (или сегодняшней) датой
      const next = startOfDay(selected ?? new Date())
      setFocusedDate(next)
      setViewDate(startOfMonth(next))
    }

    setOpen(!open)
  }

  const handleGridKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const base = focusedDate
    let next: Date

    switch (event.key) {
      case 'ArrowLeft':
        next = addDays(base, -1)
        break
      case 'ArrowRight':
        next = addDays(base, 1)
        break
      case 'ArrowUp':
        next = addDays(base, -7)
        break
      case 'ArrowDown':
        next = addDays(base, 7)
        break
      case 'PageUp':
        next = addMonths(base, -1)
        break
      case 'PageDown':
        next = addMonths(base, 1)
        break
      case 'Home':
        next = addDays(base, -((base.getDay() + 6) % 7))
        break
      case 'End':
        next = addDays(base, 6 - ((base.getDay() + 6) % 7))
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        selectDate(base)
        return
      case 'Escape':
        event.preventDefault()
        close()
        return
      case 'Tab':
        setOpen(false)
        return
      default:
        return
    }

    event.preventDefault()
    setFocusedDate(next)

    if (
      next.getMonth() !== viewDate.getMonth() ||
      next.getFullYear() !== viewDate.getFullYear()
    ) {
      setViewDate(startOfMonth(next))
    }
  }

  const rootClasses = [
    'date-picker',
    `date-picker--${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const valueClasses = selected
    ? 'date-picker__value'
    : 'date-picker__value date-picker__value--placeholder'

  const today = new Date()
  const weeks = buildWeeks(viewDate)

  return (
    <div className={rootClasses} ref={rootRef}>
      <button
        {...rest}
        ref={triggerRef}
        type="button"
        id={id}
        className="date-picker__trigger"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={handleTriggerClick}
      >
        <span className={valueClasses}>{selected ? formatDate(selected) : placeholder}</span>
        <svg
          className="date-picker__icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4 1.5v2M12 1.5v2M1.5 6h13M2.5 2.5h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="date-picker__popup"
          role="dialog"
          aria-label="Выбор даты"
        >
          <div className="date-picker__header">
            <button
              type="button"
              className="date-picker__nav"
              aria-label="Предыдущий месяц"
              onClick={() => setViewDate((prev) => addMonths(prev, -1))}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M10 3 5 8l5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="date-picker__caption">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>

            <button
              type="button"
              className="date-picker__nav"
              aria-label="Следующий месяц"
              onClick={() => setViewDate((prev) => addMonths(prev, 1))}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="m6 3 5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="date-picker__weekdays" aria-hidden="true">
            {WEEKDAYS.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div
            className="date-picker__grid"
            role="grid"
            aria-label={MONTHS[viewDate.getMonth()]}
            aria-activedescendant={cellId(focusedDate)}
            tabIndex={0}
            ref={gridRef}
            onKeyDown={handleGridKeyDown}
          >
            {weeks.map((week, weekIndex) => (
              <div className="date-picker__row" role="row" key={weekIndex}>
                {week.map((cell) => {
                  const classes = [
                    'date-picker__day',
                    cell.inMonth ? '' : 'date-picker__day--outside',
                    sameDay(cell.date, selected)
                      ? 'date-picker__day--selected'
                      : '',
                    sameDay(cell.date, today)
                      ? 'date-picker__day--today'
                      : '',
                    sameDay(cell.date, focusedDate)
                      ? 'date-picker__day--focused'
                      : '',
                    isDisabled(cell.date)
                      ? 'date-picker__day--disabled'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  return (
                    <button
                      key={dayKey(cell.date)}
                      id={cellId(cell.date)}
                      type="button"
                      role="gridcell"
                      className={classes}
                      tabIndex={-1}
                      disabled={isDisabled(cell.date)}
                      aria-selected={sameDay(cell.date, selected)}
                      aria-current={
                        sameDay(cell.date, today) ? 'date' : undefined
                      }
                      aria-label={formatDate(cell.date)}
                      onClick={() => selectDate(cell.date)}
                    >
                      {cell.date.getDate()}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="date-picker__footer">
            <button
              type="button"
              className="date-picker__action"
              disabled={isDisabled(new Date())}
              onClick={() => selectDate(new Date())}
            >
              Сегодня
            </button>
            <button
              type="button"
              className="date-picker__action"
              disabled={!selected}
              onClick={() => {
                if (!isControlled) setInnerValue(null)
                onChange?.(null)
                close()
              }}
            >
              Очистить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
