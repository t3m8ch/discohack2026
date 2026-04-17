import { createTheme, localStorageColorSchemeManager } from '@mantine/core'

export const THEME_STORAGE_KEY = 'react-hack-template-color-scheme'

export const colorSchemeManager = localStorageColorSchemeManager({
  key: THEME_STORAGE_KEY,
})

export const theme = createTheme({
  primaryColor: 'teal',
  defaultRadius: 'md',
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  headings: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  },
})
