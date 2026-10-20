import Button from './components/button/Button.tsx'
import type {
  ButtonSize,
  ButtonVariant,
} from './components/button/ButtonProps.ts'
import './App.css'
import { ThemeProvider } from './components/theme_context/ThemeContext.tsx'

// 1. Импортируем провайдер темы, который мы создали ранее

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']
const SIZES: ButtonSize[] = ['S', 'M', 'L']

function App() {
  return (
      // 2. Оборачиваем всё содержимое в ThemeProvider
      // Именно этот div внутри провайдера добавит класс темы и активирует все CSS-переменные
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
        </section>
      </ThemeProvider>
  )
}

export default App
