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
      {items.length > 0 ? (
        <KitList kits={items} />
      ) : (
        <Stack alignItems="center" justifyContent="center" sx={{ pt: 10 }}>
          <Typography color="text.secondary">No items in wishlist.</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export const Route = createFileRoute('/(profileLayout)/profile/wishlist')({
  component: WishlistPage,
  pendingComponent: PageLoader,
});
