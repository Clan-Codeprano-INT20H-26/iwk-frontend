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
import { headerHeight } from '@/constants/headerHeight';
import { useCart } from '@/lib/hooks/useCart';
import type { KeyboardEvent } from 'react';

interface HeaderProps {
  currentPage: string;
  handleSearchChange?: (searchTerm: string) => void;
  handleSearchKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const StyledContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '20px 30px',
  height: headerHeight,
}));

export const Header = ({
  currentPage,
  handleSearchChange,
  handleSearchKeyDown,
}: HeaderProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { items } = useCart();

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
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {currentPage}
      </Typography>
      <Stack direction="row" alignItems="center" gap="20px">
        {handleSearchChange && (
          <SearchBar
            onChange={(e) => handleSearchChange?.(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        )}
        <Stack direction="row" alignItems="center" gap="15px">
          <IconButton onClick={() => navigate({ to: '/cart' })}>
            <ShoppingBasketOutlinedIcon
              fontSize="medium"
              color={items.length > 0 ? 'primary' : 'action'}
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
