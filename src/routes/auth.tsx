import Box from '@mui/material/Box';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { getCookie } from '@/lib/utils/getCookie';

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
    const token = getCookie('token');
    if (token) {
      throw redirect({ to: '/profile' });
    }
  },
});
