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
import { useRegisterMutation } from '@/auth/auth.queries'
import * as v from 'valibot'
import type { RegisterFormValues } from '@/auth/auth.schemas'
import {
  getValibotFormErrors,
  registerFormSchema,
  validateEmail,
  validatePassword,
} from '@/auth/auth.schemas'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
      confirmPassword: (value, values) => {
        if (value.length < 8) {
          return 'Подтвердите пароль'
        }

        return value === values.password ? null : 'Пароли не совпадают'
      },
    },
  })

  return (
    <Paper withBorder radius="lg" p="xl" maw={460} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          setSubmitError(null)

          try {
            const result = v.safeParse(registerFormSchema, values)

            if (!result.success) {
              form.setErrors(getValibotFormErrors(result.issues))
              return
            }

            await registerMutation.mutateAsync({
              email: result.output.email,
              password: result.output.password,
            })

            await navigate({ to: '/login' })
          } catch (error) {
            if (error instanceof ApiError) {
              form.setErrors({
                email: error.fields?.email[0],
                password: error.fields?.password[0],
              })
              setSubmitError(error.message)
              return
            }

            setSubmitError('Не удалось зарегистрироваться. Попробуйте ещё раз.')
          }
        })}
      >
        <Stack gap="md">
          <div>
            <Title order={1} size="h2">
              Регистрация
            </Title>
            <Text c="dimmed" mt={6} size="sm">
              Форма соответствует текущему контракту Rust backend-а: email +
              password.
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

          <PasswordInput
            withAsterisk
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            {...form.getInputProps('confirmPassword')}
          />

          <Button fullWidth type="submit" loading={registerMutation.isPending}>
            Создать аккаунт
          </Button>

          <Text c="dimmed" size="sm">
            Уже есть аккаунт?{' '}
            <Anchor component={Link} to="/login">
              Войти
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  )
}
