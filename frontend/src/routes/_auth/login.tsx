import { useState } from 'react'
import {
  Alert,
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ApiError } from '@/lib/api'
import { useLoginMutation } from '@/auth/auth.queries'
import type { LoginFormValues } from '@/auth/auth.schemas'
import { validateEmail, validatePassword } from '@/auth/auth.schemas'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  })

  return (
    <Paper withBorder radius="lg" p="xl" maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          setSubmitError(null)

          try {
            await loginMutation.mutateAsync(values)
            await navigate({ to: '/app' })
          } catch (error) {
            if (error instanceof ApiError) {
              form.setErrors({
                email: error.fields?.email[0],
                password: error.fields?.password[0],
              })
              setSubmitError(error.message)
              return
            }

            setSubmitError('Не удалось выполнить вход. Попробуйте ещё раз.')
          }
        })}
      >
        <Stack gap="md">
          <div>
            <Title order={1} size="h2">
              Вход
            </Title>
            <Text c="dimmed" mt={6} size="sm">
              Используйте cookie-based auth against `../rust-hack-template`.
            </Text>
          </div>

          {submitError && (
            <Alert
              color="red"
              icon={<IconAlertCircle size={16} />}
              title="Ошибка"
            >
              {submitError}
            </Alert>
          )}

          <TextInput
            withAsterisk
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label="Пароль"
            placeholder="Минимум 8 символов"
            {...form.getInputProps('password')}
          />

          <Button fullWidth type="submit" loading={loginMutation.isPending}>
            Войти
          </Button>

          <Text c="dimmed" size="sm">
            Нет аккаунта?{' '}
            <Anchor component={Link} to="/register">
              Зарегистрироваться
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  )
}
