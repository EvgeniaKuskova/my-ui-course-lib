import { useState } from 'react'
import Button from './components/Button'
import DatePicker from './components/DatePicker'
import type {
  ButtonSize,
  ButtonVariant,
} from './components/ButtonProps'
import type { DatePickerSize } from './components/DatePickerProps'
import './App.css'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']
const SIZES: ButtonSize[] = ['S', 'M', 'L']
const DATE_PICKER_SIZES: DatePickerSize[] = ['S', 'M', 'L']

const TODAY = new Date()
const MAX_DATE = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate() + 10,
)

function App() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <>
      <section className="spec">
        <h2 className="spec-title">Button</h2>
        <table className="spec-table">
          <thead>
            <tr>
              <th scope="col">variant</th>
              <th scope="col">size</th>
              <th scope="col">default</th>
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
      </section>

      <section className="spec">
        <h2 className="spec-title">DatePicker</h2>

        <div className="spec-row">
          <DatePicker value={date} onChange={setDate} />
          <DatePicker defaultValue={new Date()} />
          <DatePicker />
        </div>
        <p className="spec-note">
          Controlled: {date ? date.toLocaleDateString('ru-RU') : 'дата не выбрана'}
        </p>

        <div className="spec-row">
          {DATE_PICKER_SIZES.map((size) => (
            <DatePicker key={size} size={size} />
          ))}
        </div>
        <p className="spec-note">Размеры S / M / L</p>

        <div className="spec-row">
          <DatePicker
            min={TODAY}
            max={MAX_DATE}
            placeholder="Выберите дату"
          />
          <DatePicker size="S" disabled placeholder="Недоступно" />
        </div>
        <p className="spec-note">
          Ограничение периода min / max и состояние disabled
        </p>
      </section>
    </>
  )
}

export default App
