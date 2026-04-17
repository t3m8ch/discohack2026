import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { Link, useNavigate } from '@tanstack/react-router'
import { ThemeControl } from './theme-control.component'
import { useLogoutMutation, useSessionQuery } from '@/auth/auth.queries'
import { useIsClient } from '@/lib/use-is-client'

function initialsFromEmail(email: string) {
  return email.slice(0, 2).toUpperCase()
}

export function AppHeader() {
  const navigate = useNavigate()
  const isClient = useIsClient()
  const sessionQuery = useSessionQuery(isClient)
  const logoutMutation = useLogoutMutation()

  const session = sessionQuery.data
  const isAuthenticated = session?.status === 'authenticated'
  const user = isAuthenticated ? session.user : null

  return (
    <Group justify="space-between" h="100%" wrap="nowrap">
      <Group gap="lg" wrap="nowrap">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: 'header-link header-link-active' }}
          className="header-brand"
        >
          React Hack Template
        </Link>

        <Group gap="md" visibleFrom="sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'header-link header-link-active' }}
            className="header-link"
          >
            Главная
          </Link>

          {isAuthenticated && (
            <Link
              to="/app"
              activeProps={{ className: 'header-link header-link-active' }}
              className="header-link"
            >
              Приложение
            </Link>
          )}
        </Group>
      </Group>

      <Group gap="sm" wrap="nowrap">
        <ThemeControl />

        {isAuthenticated && user ? (
          <>
            <Group gap="sm" visibleFrom="sm" wrap="nowrap">
              <Avatar color="teal" radius="xl">
                {initialsFromEmail(user.email)}
              </Avatar>

              <Stack gap={0} mr="xs">
                <Text fw={600} size="sm">
                  Авторизован
                </Text>
                <Text c="dimmed" size="xs">
                  {user.email}
                </Text>
              </Stack>
            </Group>

            <Button
              color="red"
              variant="light"
              loading={logoutMutation.isPending}
              onClick={async () => {
                await logoutMutation.mutateAsync()
                await navigate({ to: '/' })
              }}
            >
              Выйти
            </Button>
          </>
        ) : (
          <Group gap="xs" wrap="nowrap">
            <Button
              variant="default"
              onClick={() => navigate({ to: '/login' })}
            >
              Войти
            </Button>
            <Button onClick={() => navigate({ to: '/register' })}>
              Регистрация
            </Button>
          </Group>
        )}
      </Group>
    </Group>
  )
}
