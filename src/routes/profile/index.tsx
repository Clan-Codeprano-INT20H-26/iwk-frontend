import { createFileRoute } from '@tanstack/react-router';

const ProfilePage = () => {
  return <div>Hello "/profile/"!</div>;
};

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
});
