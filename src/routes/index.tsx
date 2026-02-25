import { Header } from '@/components/Header';
import { KitCard } from '@/components/KitCard';
import { Loader } from '@/components/ui/Loader';
import { useKitStore } from '@/store/kitStore';
import Grid from '@mui/material/Grid';
import { createFileRoute } from '@tanstack/react-router';
import { headerHeight } from '@/constants/headerHeight';

const CatalogPage = () => {
  const { kits, isLoading } = useKitStore();

  return (
    <>
      <Header currentPage="catalog" />
      <Grid
        container
        spacing={2}
        sx={{ padding: 4, minHeight: `calc(100vh - ${headerHeight})` }}
      >
        {isLoading ? (
          <Loader size={80} sx={{ m: 'auto' }} />
        ) : (
          kits.map((kit) => (
            <Grid size={2} key={kit.id}>
              <KitCard {...kit} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: CatalogPage,
  loader: async () => {
    const { getKits } = useKitStore.getState();
    await getKits();
  },
});
