import {
  Badge,
  Button,
  Card,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconCheck,
  IconMoonStars,
  IconPlugConnected,
  IconShieldCheck,
} from '@tabler/icons-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSessionQuery } from '@/auth/auth.queries'
import { useIsClient } from '@/lib/use-is-client'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const features = [
  {
    title: 'TanStack Start',
    description:
      'Файловый роутинг, SSR-ready архитектура и современный Vite workflow.',
    icon: IconPlugConnected,
  },
  {
    title: 'Mantine',
    description:
      'Готовые UI-компоненты, единая тема и переключение светлой/тёмной схемы.',
    icon: IconMoonStars,
  },
  {
    title: 'Auth + Session',
    description:
      'Регистрация, логин, logout и восстановление сессии через cookie backend-а.',
    icon: IconShieldCheck,
  },
]

function HomePage() {
  const navigate = useNavigate()
  const isClient = useIsClient()
  const sessionQuery = useSessionQuery(isClient)
  const isAuthenticated = sessionQuery.data?.status === 'authenticated'

  return (
    <Stack gap="xl">
      <Card className="hero-card" padding="xl" radius="xl">
        <Stack gap="lg">
          <Group gap="sm">
            <Badge variant="light" color="teal">
              Hackathon starter
            </Badge>
            <Badge variant="outline">TanStack Start</Badge>
            <Badge variant="outline">Mantine</Badge>
            <Badge variant="outline">TypeScript</Badge>
          </Group>

          <Stack gap="sm">
            <Title order={1} size="h1">
              Быстрый старт для React-проекта на хакатон.
            </Title>
            <Text c="dimmed" maw={720} size="lg">
              Шаблон уже содержит роутинг, TanStack Query, Mantine, cookie-based
              auth против Rust backend-а и переключение темы без мигания при
              первой загрузке страницы.
            </Text>
          </Stack>

          <Group>
            <Button
              size="md"
              onClick={() =>
                navigate({ to: isAuthenticated ? '/app' : '/login' })
              }
            >
              {isAuthenticated ? 'Открыть приложение' : 'Перейти ко входу'}
            </Button>
            <Button
              size="md"
              variant="default"
              onClick={() => navigate({ to: '/register' })}
            >
              Зарегистрироваться
            </Button>
          </Group>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {features.map(({ title, description, icon: Icon }) => (
          <Card key={title} withBorder radius="lg" padding="lg">
            <Stack gap="md">
              <ThemeIcon size="xl" radius="md" variant="light" color="teal">
                <Icon size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>{title}</Text>
                <Text c="dimmed" mt={6} size="sm">
                  {description}
                </Text>
              </div>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Card withBorder radius="lg" padding="xl">
        <Stack gap="md">
          <Title order={2}>Что уже готово</Title>
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="teal" radius="xl" size={22}>
                <IconCheck size={14} />
              </ThemeIcon>
            }
          >
            <List.Item>
              Прокси запросов на Rust backend через `/api/*`.
            </List.Item>
            <List.Item>Session query как единый источник истины.</List.Item>
            <List.Item>Public и protected routes с redirect-логикой.</List.Item>
            <List.Item>
              Хранение выбора темы и отсутствие flicker на cold load.
            </List.Item>
            <List.Item>ESLint + Prettier из коробки.</List.Item>
          </List>
        </Stack>
      </Card>
    </Stack>
  )
}
