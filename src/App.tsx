import { useState } from 'react'
import Button from './components/button/Button.tsx'
import type {
  ButtonSize,
  ButtonVariant,
} from './components/button/ButtonProps.ts'
import './App.css'
import { ThemeProvider } from './components/theme_context/themeProvider.tsx'
import type { Theme } from './components/theme_context/themeContext.ts'
import { Calendar } from './components/calendar/Calendar.tsx'
import {
  LocaleContext,
  arEG,
  enUS,
  ruRU,
} from './components/calendar/locale.ts'
import type { Locale } from './components/calendar/locale.ts'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']
const SIZES: ButtonSize[] = ['S', 'M', 'L']

const LOCALES: Record<string, Locale> = {
  'ru-RU': ruRU,
  'en-US': enUS,
  'ar-EG': arEG,
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [localeCode, setLocaleCode] = useState('ru-RU')
  const [date, setDate] = useState<Date | null>(null)
  const [limitedDate, setLimitedDate] = useState<Date | null>(null)

  const locale = LOCALES[localeCode] ?? ruRU

  const now = new Date()
  const minDate = new Date(now.getFullYear(), now.getMonth(), 10)
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 20)

  return (
      <ThemeProvider theme={theme}>
        <section className="spec">
          <table className="spec-table">
            <thead>
            <tr>
              <th scope="col">variant</th>
              <th scope="col">size</th>
              <th scope="col">default/hover/active</th>
              <th scope="col">disabled</th>
            </tr>
            </thead>

            <tbody>
            {VARIANTS.flatMap((variant) =>
                SIZES.map((size) => (
                    <tr key={`${variant}-${size}`}>
                      <th className="spec-table__label" scope="row">
                        {variant}
                      </th>
                      <th className="spec-table__label" scope="row">
                        {size}
                      </th>
                      <td>
                        <Button variant={variant} size={size}>
                          Кнопка
                        </Button>
                      </td>
                      <td>
                        <Button variant={variant} size={size} disabled>
                            Кнопка
                        </Button>
                      </td>
                    </tr>
                )),
            )}
            </tbody>
          </table>

          <Button
              as="a"
              href="https://staff.skbkontur.ru/profile/kuskova.e"
              size="S"
              variant="outline"
          >
            Ссылка
          </Button>

          <ThemeProvider tokens={{
            buttonSmallPaddingX: '24px',
            buttonFillBg: "rgba(22,119,255,0.81)",
            buttonBorderColor: "rgba(1,18,71,0.43)",
            buttonFillBgHover: "rgb(19,99,213)",
            buttonFillBgActive: "rgb(4,39,101)",
          }}>
            <Button size="M">Кастомизация</Button>
          </ThemeProvider>
        </section>

        <section className="spec">
          <h2 className="demo-title">Calendar</h2>

          <div className="demo-controls">
            <div className="demo-group">
              {Object.keys(LOCALES).map((code) => (
                  <Button
                      key={code}
                      size="S"
                      variant={code === localeCode ? 'fill' : 'outline'}
                      onClick={() => setLocaleCode(code)}
                  >
                    {code}
                  </Button>
              ))}
            </div>

            <div className="demo-group">
              <Button
                  size="S"
                  variant={theme === 'light' ? 'fill' : 'outline'}
                  onClick={() => setTheme('light')}
              >
                light
              </Button>
              <Button
                  size="S"
                  variant={theme === 'dark' ? 'fill' : 'outline'}
                  onClick={() => setTheme('dark')}
              >
                dark
              </Button>
            </div>
          </div>

          <LocaleContext.Provider value={locale}>
            <div className="demo-calendars" dir={locale.dir}>
              <div className="demo-card">
                <Calendar value={date} onValueChange={setDate} autoFocus />
                <p className="demo-caption">
                  value / onValueChange, листание месяцев не меняет дату
                </p>
              </div>

              <div className="demo-card">
                <Calendar
                    value={limitedDate}
                    onValueChange={setLimitedDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    isDateDisabled={(day) =>
                        day.getDay() === 0 || day.getDay() === 6
                    }
                />
                <p className="demo-caption">
                  minDate / maxDate / isDateDisabled — выходные недоступны
                </p>
              </div>
            </div>
          </LocaleContext.Provider>
        </section>
      </ThemeProvider>
  )
}

export default App
