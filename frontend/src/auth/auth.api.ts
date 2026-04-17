import * as v from 'valibot'
import { ApiError, apiRequest } from '@/lib/api'
import type { LoginInput, RegisterInput, SessionState } from './auth.schemas'
import {
  loginInputSchema,
  parseUser,
  registerInputSchema,
} from './auth.schemas'

export async function fetchSession(): Promise<SessionState> {
  try {
    const user = await apiRequest('/api/auth/me', {
      parse: parseUser,
    })

    return {
      status: 'authenticated',
      user,
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { status: 'unauthenticated' }
    }

    throw error
  }
}

export async function login(input: LoginInput) {
  const payload = v.parse(loginInputSchema, input)

  return apiRequest('/api/auth/login', {
    init: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    parse: parseUser,
  })
}

export async function register(input: RegisterInput) {
  const payload = v.parse(registerInputSchema, input)

  return apiRequest('/api/auth/register', {
    init: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    parse: parseUser,
  })
}

export async function logout() {
  await apiRequest('/api/auth/logout', {
    init: {
      method: 'POST',
    },
  })
}
