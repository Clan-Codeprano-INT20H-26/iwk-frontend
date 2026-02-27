import { createFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import { KitList } from '@/components/KitList';
import { useRecentlyViewed } from '@/lib/hooks/useRecentlyViewed';
import Stack from '@mui/material/Stack';

const RecentlyViewedPage = () => {
  const { items } = useRecentlyViewed();

  return (
    <Stack gap={3}>
      <Typography variant="h4">Recently viewed</Typography>
      {items.length > 0 ? (
        <KitList kits={items} />
      ) : (
        <Stack alignItems="center" justifyContent="center" sx={{ pt: 10 }}>
          <Typography color="text.secondary">
            No items recently viewed.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export const Route = createFileRoute(
  '/(profileLayout)/profile/recently-viewed'
)({
  component: RecentlyViewedPage,
});
