import { fetchSession } from '@/auth/auth.api'
import { RoutePending } from '@/routing/route-pending.component'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  ssr: false,
  pendingComponent: RoutePending,
  async beforeLoad() {
    const session = await fetchSession()

    if (session.status === 'unauthenticated') {
      throw redirect({ to: '/login' })
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
