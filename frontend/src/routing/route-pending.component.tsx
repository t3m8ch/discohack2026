import { Center, Loader, Stack, Text } from '@mantine/core'

export function RoutePending() {
  return (
    <Center mih="50vh">
      <Stack align="center" gap="sm">
        <Loader size="sm" />
        <Text c="dimmed" size="sm">
          Загружаем страницу...
        </Text>
      </Stack>
    </Center>
  )
}
