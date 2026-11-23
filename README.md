# my-ui-course-lib

Библиотека UI-компонентов на React и TypeScript. Содержит переиспользуемые компоненты Button и Calendar, поддержку темизации, локализации и документацию Storybook.

## Компоненты

### Button

Компонент кнопки с поддержкой нескольких вариантов оформления и размеров.

**Доступные свойства:**

| Prop | Описание | Значения |
|---|---|---|
| `variant` | Вариант оформления | `fill`, `outline`, `text` |
| `size` | Размер кнопки | `S`, `M`, `L` |
| `disabled` | Отключает кнопку | `true`, `false` |
| `onClick` | Обработчик нажатия | Функция |
| `icon` | Иконка кнопки | `ReactNode` |
| `children` | Содержимое кнопки | `ReactNode` |

**Пример использования:**

```tsx
import { Button } from './index';

export default function App() {
  return (
    <>
      <Button variant="fill" size="M">
        Обычная кнопка
      </Button>

      <Button variant="outline" size="S">
        Кнопка с обводкой
      </Button>

      <Button variant="text" disabled>
        Отключенная кнопка
      </Button>
    </>
  );
}
```

### Calendar

Компонент календаря с возможностью выбора даты и переключения месяцев.

**Возможности:**

- Выбор даты.
- Переключение между месяцами.
- Отображение выбранной даты.
- Ограничение минимальной и максимальной даты.
- Отключение отдельных дат с помощью `isDateDisabled`.
- Поддержка разных локалей.
- Автоматическая установка фокуса с помощью `autoFocus`.

**Основные свойства:**

| Prop | Описание |
|---|---|
| `value` | Выбранная дата |
| `onValueChange` | Колбэк при выборе даты |
| `month` | Отображаемый месяц |
| `onMonthChange` | Колбэк при переключении месяца |
| `minDate` | Минимальная доступная дата |
| `maxDate` | Максимальная доступная дата |
| `isDateDisabled` | Функция проверки недоступности даты |
| `autoFocus` | Автоматическая установка фокуса |

**Пример использования:**

```tsx
import { useState } from 'react';
import { Calendar, ThemeProvider } from './index';
import { LocaleContext, ruRU } from './components/calendar/locale';

export default function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <ThemeProvider theme="light">
      <LocaleContext.Provider value={ruRU}>
        <Calendar
          value={date}
          onValueChange={setDate}
          autoFocus
        />

        <p>
          Выбранная дата:{' '}
          {date
            ? date.toLocaleDateString('ru-RU')
            : 'Дата не выбрана'}
        </p>
      </LocaleContext.Provider>
    </ThemeProvider>
  );
}
```

## Кастомизация через токены

Тема описана плоским объектом `themeTokens` в `src/styles/theme.css.ts`.

Провайдер принимает переопределения в `tokens`, а редактор подсказывает доступные имена (`buttonSmallPaddingX`, `buttonFillBg`, …) и ругается на опечатки.

```tsx
import { Button, ThemeProvider } from './index';

export default function App() {
  return (
    <>
      <Button>Обычная кнопка без кастомизаций</Button>

      <ThemeProvider tokens={{ buttonSmallPaddingX: '24px' }}>
        <Button size="S">Кастомизация</Button>
      </ThemeProvider>
    </>
  );
}
```

- Дефолты навешиваются глобально на `:root` (`createGlobalTheme`), поэтому компоненты работают и без провайдера.
- `ThemeProvider` переопределяет только переменные CSS на своём поддереве через inline-стили, поэтому вложенные провайдеры комбинируются.
- Если `tokens` не переданы, провайдер не создаёт лишнюю `div`-обёртку.

## Локализация

Calendar использует `LocaleContext` для настройки языка и формата дат.

Доступные локали:

- `ruRU` — русский язык.
- `enUS` — английский язык.
- `arEG` — арабский язык.

Для смены локали используется `LocaleContext.Provider`.

## Storybook

Для демонстрации и документации компонентов используется Storybook.

**Запуск Storybook:**

```bash
npm run storybook
```

После запуска Storybook доступен по адресу:

`http://localhost:6006`

**Сборка Storybook:**

```bash
npm run build-storybook
```

### Истории компонентов

Для компонентов созданы отдельные Storybook stories:

- `src/components/button/Button.stories.tsx` — истории Button.
- `src/components/calendar/Calendar.stories.tsx` — истории Calendar.

В Storybook доступны:

- Controls для изменения свойств компонентов.
- Actions для отслеживания событий `onClick`, `onValueChange` и `onMonthChange`.
- Autodocs с описанием компонентов, их свойств и примерами использования.
- Decorators для подключения `ThemeProvider` и `LocaleContext`.
- Проверка доступности с помощью `@storybook/addon-a11y`.

### Конфигурация Storybook

- `.storybook/main.ts` — настройки Storybook и подключаемые addons.
- `.storybook/preview.tsx` — глобальные decorators и параметры.
- `.storybook/tsconfig.json` — TypeScript-конфигурация для файлов Storybook.

## Установка зависимостей

```bash
npm install
```

## Запуск проекта

```bash
npm run dev
```

## Тестирование

Для запуска тестов используется Vitest:

```bash
npm run test
```

Команда выполняет тесты в однократном режиме.

## Сборка

Для сборки библиотеки:

```bash
npm run build
```

На выходе появляется стабильный файл стилей:

```text
dist/my-ui-library.css
```

Его можно импортировать напрямую:

```ts
import 'my-ui-course-lib/dist/my-ui-library.css';
```

Имя задаётся в `vite.config.ts` в `build.rollupOptions.output.assetFileNames`.

## Используемые технологии

- React
- TypeScript
- Vite
- Storybook
- Vitest
- CSS-in-TS / Vanilla Extract
- Storybook Addon A11y
