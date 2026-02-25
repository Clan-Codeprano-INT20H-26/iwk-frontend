import { Header } from '@/components/Header';
import { KitCard } from '@/components/KitCard';
import { Loader } from '@/components/ui/Loader';
import { useKitStore } from '@/store/kitStore';
import Grid from '@mui/material/Grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { headerHeight } from '@/constants/headerHeight';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface SearchParams {
  page?: number;
  searchTerm?: string;
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { debouncedValue, isDebouncing } = useDebounce(searchTerm, 1500);
  const debouncedValueRef = useRef(debouncedValue);
  const kits = useKitStore((state) => state.kits);
  const isLoading = useKitStore((state) => state.isLoading);
  const setKits = useKitStore((state) => state.setKits);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setKits([]);
  };

  useEffect(() => {
    if (debouncedValue !== debouncedValueRef.current) {
      navigate({
        to: '/',
        ...(debouncedValue && { search: { searchTerm: debouncedValue } }),
      });
    }
    debouncedValueRef.current = debouncedValue;
  }, [debouncedValue, navigate, setKits]);

  return (
    <>
      <Header currentPage="catalog" handleSearch={handleSearch} />
      <Grid
        container
        spacing={5}
        sx={{ padding: 4, minHeight: `calc(100vh - ${headerHeight})` }}
      >
        {isLoading || isDebouncing ? (
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
  loader: async (params) => {
    const { page, searchTerm }: SearchParams = params.location.search;
    const { getKits } = useKitStore.getState();
    await getKits({
      Page: page,
      SearchTerm: searchTerm,
    });
  },
});
