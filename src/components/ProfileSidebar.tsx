import { useRef } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { useUserStore } from '@/store/userStore';
import { headerHeight } from '@/constants/headerHeight';
import { useNavigate } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/EditSquare';
import { Link } from './ui/Link';
import { TextButton } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { UserService } from '@/api/userService';
import { toast } from 'react-hot-toast';

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

const userService = new UserService();

export const ProfileSidebar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logOut = useUserStore((state) => state.logout);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogOut = () => {
    navigate({ to: '/', replace: true });
    logOut();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUser({ ...user, avatar: reader.result as string });

        const formData = new FormData();
        formData.append('file', file);

        try {
          await userService.uploadAvatar(formData);
          toast.success('Avatar updated successfully');
        } catch {
          setUser({ ...user, avatar: user?.avatar });
          toast.error('Failed to update avatar!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Drawer
      open
      variant="persistent"
      sx={{
        width: '320px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
        <Stack sx={{ position: 'relative' }}>
          <Avatar
            src={user?.avatar}
            alt={user?.username}
            sx={{ width: '64px', height: '64px' }}
          />
          <IconButton
            onClick={() => inputRef.current?.click()}
            sx={{
              p: 0,
              position: 'absolute',
              bottom: '4px',
              right: '2px',
              '& svg': { width: '22px', height: '22px' },
            }}
          >
            <EditIcon />
          </IconButton>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </Stack>

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
