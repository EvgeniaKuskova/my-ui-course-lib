import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Складываем все стили библиотеки в один стабильный файл без хэша,
          // чтобы его можно было предсказуемо импортировать:
          //   import 'my-ui-course-lib/dist/my-ui-library.css';
          if (assetInfo.name?.endsWith('.css')) {
            return 'my-ui-library.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
