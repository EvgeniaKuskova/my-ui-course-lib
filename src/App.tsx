import Button from './components/button/Button.tsx'
import type {
  ButtonSize,
  ButtonVariant,
} from './components/button/ButtonProps.ts'
import './App.css'
import { ThemeProvider } from './components/theme_context/ThemeContext.tsx'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']
const SIZES: ButtonSize[] = ['S', 'M', 'L']

function App() {
  return (
      <>
        <ThemeProvider>
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
        </ThemeProvider>
      </>
  )
}

export default App
