import { createFileRoute } from '@tanstack/react-router';

const SignInPage = () => {
  return <div>Hello "/auth/sign-in"!</div>;
};

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
});
