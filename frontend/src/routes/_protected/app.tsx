import { Badge, Card, Code, Group, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useSessionQuery } from '@/auth/auth.queries'

export const Route = createFileRoute('/_protected/app')({
  component: ProtectedAppPage,
})

function ProtectedAppPage() {
  const sessionQuery = useSessionQuery(true)
  const session = sessionQuery.data

  if (session?.status !== 'authenticated') {
    return null
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start">
        <div>
          <Title order={1}>Защищённая страница</Title>
          <Text c="dimmed" mt={4}>
            Этот маршрут доступен только после успешного логина.
          </Text>
        </div>
        <Badge color="teal" variant="light">
          Session restored from backend cookie
        </Badge>
      </Group>

      <Card withBorder radius="lg" padding="xl">
        <Stack gap="sm">
          <Title order={3}>Текущий пользователь</Title>
          <Text>
            <strong>Email:</strong> {session.user.email}
          </Text>
          <Text>
            <strong>Создан:</strong>{' '}
            {new Date(session.user.createdAt).toLocaleString()}
          </Text>
          <Text c="dimmed" size="sm">
            Данные живут в памяти TanStack Query и восстанавливаются на старте
            приложения запросом <Code>/api/auth/me</Code>.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
