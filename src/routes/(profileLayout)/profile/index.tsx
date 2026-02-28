import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(profileLayout)/profile/')({
  loader: () => {
    throw redirect({ to: '/' });
  },
});
