import { Header } from '@/components/Header';
import { useUserStore } from '@/store/userStore';
import Typography from '@mui/material/Typography';
import { createFileRoute, redirect } from '@tanstack/react-router';

const ProfilePage = () => {
  return (
    <>
      <Header currentPage="profile" />
      <Typography variant="h4">Profile</Typography>
    </>
  );
};

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
  loader: async () => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
  },
});
