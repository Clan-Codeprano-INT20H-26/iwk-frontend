import { Header } from '@/components/Header';
import { ProfileSidebar } from '@/components/ProfileSidebar';
import Box from '@mui/material/Box';
import { useUserStore } from '@/store/userStore';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

const ProfileLayout = () => {
  return (
    <>
      <Header currentPage="profile" />
      <Box sx={{ display: 'grid', gridTemplateColumns: '320px 1fr' }}>
        <ProfileSidebar />
        <Box sx={{ padding: '40px' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export const Route = createFileRoute('/profile')({
  component: ProfileLayout,
  loader: async () => {
    const { user, isLoading } = useUserStore.getState();
    if (!user && !isLoading) {
      throw redirect({ to: '/auth/sign-in' });
    }
  },
});
