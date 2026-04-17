import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { fetchSession, login, logout, register } from './auth.api'

export const sessionQueryKey = ['session'] as const

export const sessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: fetchSession,
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: false,
})

export function ensureSession(queryClient: QueryClient) {
  return queryClient.fetchQuery(sessionQueryOptions)
}

export function useSessionQuery(enabled = true) {
  return useQuery({
    ...sessionQueryOptions,
    enabled,
  })
}

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey })
      await queryClient.fetchQuery(sessionQueryOptions)
    },
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(sessionQueryKey, { status: 'unauthenticated' })
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey })
    },
  })
}
