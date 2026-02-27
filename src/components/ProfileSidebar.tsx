import HistoryIcon from '@mui/icons-material/History';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { useUserStore } from '@/store/userStore';
import { headerHeight } from '@/constants/headerHeight';
import { useNavigate } from '@tanstack/react-router';
import { Link } from './ui/Link';
import { TextButton } from './ui/Button';
import Stack from '@mui/material/Stack';

export const ProfileSidebar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logout);

  const navLinks = [
    {
      label: 'Order history',
      icon: <HistoryIcon />,
      to: '/profile/orders',
    },
    {
      label: 'My Wishlist',
      icon: <LoyaltyIcon />,
      to: '/profile/wishlist',
    },
  ] as const;

  const handleLogOut = () => {
    navigate({ to: '/', replace: true });
    logOut();
  };

  return (
    <Drawer
      open
      variant="persistent"
      sx={{
        width: '320px',
        zIndex: 100,

        '& .MuiPaper-root': {
          height: `calc(100vh - ${headerHeight})`,
          position: 'sticky',
          top: 0,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: '16px',
          padding: '32px 40px',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          src={user?.avatar}
          alt="Avatar"
          sx={{ width: '64px', height: '64px' }}
        />
        <Stack gap="4px">
          <Typography variant="body2" color="text.secondary">
            Welcome
          </Typography>
          <Typography variant="subtitle2">{user?.username}</Typography>
        </Stack>
      </Stack>
      <Stack
        gap="40px"
        sx={{
          p: '32px 40px',
        }}
      >
        <Stack gap="20px">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              inactiveProps={{ style: { color: '#0F172A' } }}
              activeProps={{ style: { color: '#4F46E5' } }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </Stack>
        <TextButton
          sx={{
            color: 'error.main',
            justifyContent: 'flex-start',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          size="small"
          onClick={handleLogOut}
          startIcon={<LogoutIcon />}
        >
          Logout
        </TextButton>
      </Stack>
    </Drawer>
  );
};
