import {
  ActionIcon,
  Menu,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import {
  IconCheck,
  IconDeviceDesktop,
  IconMoonStars,
  IconSun,
} from '@tabler/icons-react'

const iconProps = {
  size: 16,
  stroke: 1.8,
}

export function ThemeControl() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: false,
  })

  const activeIcon =
    computedColorScheme === 'dark' ? (
      <IconMoonStars {...iconProps} />
    ) : (
      <IconSun {...iconProps} />
    )

  return (
    <Menu position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon aria-label="Переключить тему" variant="default" size="lg">
          {activeIcon}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Тема</Menu.Label>

        <Menu.Item
          leftSection={<IconDeviceDesktop {...iconProps} />}
          rightSection={colorScheme === 'auto' ? <IconCheck size={14} /> : null}
          onClick={() => setColorScheme('auto')}
        >
          Система
        </Menu.Item>

        <Menu.Item
          leftSection={<IconSun {...iconProps} />}
          rightSection={
            colorScheme === 'light' ? <IconCheck size={14} /> : null
          }
          onClick={() => setColorScheme('light')}
        >
          Светлая
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoonStars {...iconProps} />}
          rightSection={colorScheme === 'dark' ? <IconCheck size={14} /> : null}
          onClick={() => setColorScheme('dark')}
        >
          Тёмная
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
