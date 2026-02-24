import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { styled } from '@mui/material/styles';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from '@tanstack/react-router';
import { IconButton } from './ui/IconButton';
import { ContainedButton } from './ui/Button';
import { SearchBar } from './Searchbar';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

interface HeaderProps {
  currentPage: string;
}

const StyledContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '20px 30px',
  height: '80px',
}));

export const Header = ({ currentPage }: HeaderProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { value: cart } = useLocalStorage('cart', []);

  return (
    <StyledContainer>
      <Stack direction="row" alignItems="center" gap="20px">
        <IconButton onClick={() => navigate({ to: '/' })} sx={{ p: 0 }}>
          <img src="/logo.png" alt="logo" width={80} height={30} />
        </IconButton>
      </Stack>
      <Typography
        variant="h4"
        color="primary"
        fontFamily='"Jersey 20", cursive'
        fontWeight={400}
        textTransform="uppercase"
      >
        {currentPage}
      </Typography>
      <Stack direction="row" alignItems="center" gap="20px">
        <SearchBar />
        <Stack direction="row" alignItems="center" gap="15px">
          <IconButton onClick={() => navigate({ to: '/cart' })}>
            <ShoppingBasketOutlinedIcon
              fontSize="medium"
              color={cart.length > 0 ? 'primary' : 'action'}
            />
          </IconButton>
          {user ? (
            <IconButton
              onClick={() => navigate({ to: '/profile' })}
              sx={{ p: 0 }}
            >
              <Avatar
                src={user.avatar}
                sx={{ width: '28px', height: '28px' }}
              />
            </IconButton>
          ) : (
            <ContainedButton onClick={() => navigate({ to: '/auth/sign-in' })}>
              Sign in
            </ContainedButton>
          )}
        </Stack>
      </Stack>
    </StyledContainer>
  );
};
