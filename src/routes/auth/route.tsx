import Box from '@mui/material/Box';
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';
import { useUserStore } from '@/store/userStore';

const AuthLayout = () => {
  return (
    <>
      <Box sx={{ position: 'absolute', top: '25px', left: '30px' }}>
        <Link to="/">
          <img src="/logo.png" alt="logo" width={80} height={30} />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  loader: async () => {
    const { user } = useUserStore.getState();
    if (user) {
      throw redirect({ to: '/profile' });
    }
  },
});
