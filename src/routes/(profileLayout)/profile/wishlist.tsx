import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { PageLoader } from '@/components/PageLoader';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { KitList } from '@/components/KitList';
import Stack from '@mui/material/Stack';

const WishlistPage = () => {
  const { items } = useWishlist();

  return (
    <Stack gap={3}>
      <Typography variant="h4">My Wishlist</Typography>
      <KitList kits={items} />
    </Stack>
  );
};

export const Route = createFileRoute('/(profileLayout)/profile/wishlist')({
  component: WishlistPage,
  pendingComponent: PageLoader,
});
