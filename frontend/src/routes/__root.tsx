import '@mantine/core/styles.css'
import {
  AppShell,
  ColorSchemeScript,
  Container,
  MantineProvider,
} from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { AppHeader } from '@/header/header.component'
import { THEME_STORAGE_KEY, colorSchemeManager, theme } from '@/lib/theme'
import appCss from '@/styles.css?url'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'React Hack Template',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ColorSchemeScript
          defaultColorScheme="auto"
          localStorageKey={THEME_STORAGE_KEY}
        />
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={theme}
            defaultColorScheme="auto"
            colorSchemeManager={colorSchemeManager}
          >
            <AppShell header={{ height: 72 }} padding="md">
              <AppShell.Header>
                <Container size="lg" h="100%">
                  <AppHeader />
                </Container>
              </AppShell.Header>

              <AppShell.Main>
                <Container size="lg" py="xl">
                  {children}
                </Container>
              </AppShell.Main>
            </AppShell>
          </MantineProvider>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  )
}
