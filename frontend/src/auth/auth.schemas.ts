import * as v from 'valibot'

export const userApiSchema = v.object({
  id: v.string(),
  email: v.pipe(v.string(), v.email()),
  created_at: v.string(),
})

export type User = {
  id: string
  email: string
  createdAt: string
}

export function parseUser(input: unknown): User {
  const parsed = v.parse(userApiSchema, input)

  return {
    id: parsed.id,
    email: parsed.email,
    createdAt: parsed.created_at,
  }
}

export type SessionState =
  | {
      status: 'authenticated'
      user: User
    }
  | {
      status: 'unauthenticated'
    }

export const emailSchema = v.pipe(
  v.string('Email обязателен'),
  v.trim(),
  v.nonEmpty('Email обязателен'),
  v.email('Введите корректный email'),
)

export const passwordSchema = v.pipe(
  v.string('Пароль обязателен'),
  v.nonEmpty('Пароль обязателен'),
  v.minLength(8, 'Минимум 8 символов'),
)

export const loginInputSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginInput = v.InferOutput<typeof loginInputSchema>

export const registerInputSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
})

export type RegisterInput = v.InferOutput<typeof registerInputSchema>

export const loginFormSchema = loginInputSchema
export type LoginFormValues = v.InferOutput<typeof loginFormSchema>

export const registerFormSchema = v.pipe(
  v.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: v.pipe(
      v.string('Подтверждение пароля обязательно'),
      v.nonEmpty('Подтверждение пароля обязательно'),
      v.minLength(8, 'Подтвердите пароль'),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'Пароли не совпадают',
    ),
    ['confirmPassword'],
  ),
)

export type RegisterFormValues = v.InferOutput<typeof registerFormSchema>

export function validateEmail(value: string) {
  const result = v.safeParse(emailSchema, value)
  return result.success ? null : result.issues[0].message
}

export function validatePassword(value: string) {
  const result = v.safeParse(passwordSchema, value)
  return result.success ? null : result.issues[0].message
}

export function getValibotFormErrors(issues: v.BaseIssue<unknown>[]) {
  if (issues.length === 0) {
    return {}
  }

  const nested =
    v.flatten(issues as [v.BaseIssue<unknown>, ...v.BaseIssue<unknown>[]])
      .nested ?? {}

  return Object.fromEntries(
    Object.entries(nested).map(([key, messages]) => [key, messages?.[0]]),
  ) as Record<string, string | undefined>
}
