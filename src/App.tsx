import Button from './components/button/Button.tsx'
import type {
  ButtonSize,
  ButtonVariant,
} from './components/button/ButtonProps.ts'
import './App.css'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']
const SIZES: ButtonSize[] = ['S', 'M', 'L']

function App() {
  return (
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
    </section>
  )
}

export default App
