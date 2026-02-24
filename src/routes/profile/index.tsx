import { Header } from '@/components/Header';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

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
});
