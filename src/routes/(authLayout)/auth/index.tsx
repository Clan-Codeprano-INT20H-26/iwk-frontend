import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(authLayout)/auth/')({
  loader: () => {
    throw redirect({ to: '/auth/sign-in' });
  },
});
