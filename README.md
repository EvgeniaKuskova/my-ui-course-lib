# my-ui-course-lib

Учебная UI-библиотека на [vanilla-extract](https://vanilla-extract.style/).

## Кастомизация через токены

Тема описана плоским объектом `themeTokens` в `src/styles/theme.css.ts`.
Провайдер принимает переопределения в `tokens`, а редактор подсказывает
доступные имена (`buttonSmallPaddingX`, `buttonFillBg`, …) и ругается на
опечатки.

```tsx
import { Button, ThemeProvider } from './index'

export default function App() {
  return (
    <>
      <Button>Обычная кнопка без кастомизаций</Button>

      <ThemeProvider tokens={{ buttonSmallPaddingX: '24px' }}>
        <Button size="S">Подтюненная кнопка</Button>
      </ThemeProvider>
    </>
  )
}
```

- Дефолты навешиваются глобально на `:root` (`createGlobalTheme`), поэтому
  компоненты работают и без провайдера.
- `ThemeProvider` переопределяет только переменные CSS на своём поддереве
  через inline-стили, поэтому вложенные провайдеры комбинируются.
- Если `tokens` не переданы, провайдер не создаёт лишнюю `div`-обёртку.

## Сборка

```bash
npm run build
```

На выходе появляется стабильный файл стилей:

```
dist/my-ui-library.css
```

Его можно импортировать напрямую:

```ts
import 'my-ui-course-lib/dist/my-ui-library.css'
```

Имя задаётся в `vite.config.ts` в `build.rollupOptions.output.assetFileNames`.
