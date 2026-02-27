import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/profile/recently-reviewed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/recently-reviewed"!</div>
}
