import { fetchSession } from '@/auth/auth.api'
import { RoutePending } from '@/routing/route-pending.component'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  ssr: false,
  pendingComponent: RoutePending,
  async beforeLoad() {
    const session = await fetchSession()

    if (session.status === 'authenticated') {
      throw redirect({ to: '/app' })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <Outlet />
}
