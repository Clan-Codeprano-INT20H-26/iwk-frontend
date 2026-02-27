import { Header } from '@/components/Header';
import { KitCard } from '@/components/KitCard';
import { Loader } from '@/components/ui/Loader';
import { useKitStore } from '@/store/kitStore';
import Grid from '@mui/material/Grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { headerHeight } from '@/constants/headerHeight';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  const totalPages = useKitStore((state) => state.totalPages);
  const pageNumber = useKitStore((state) => state.pageNumber);

  const isEmpty = kits.length === 0;

  const handleParamsChange = useCallback(
    (page?: number) => {
      navigate({
        to: '/',
        search: { page, ...(debouncedValue && { searchTerm: debouncedValue }) },
      });
    },
    [navigate, debouncedValue]
  );

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.length < 3 && searchTerm !== '') return;
    setSearchTerm(searchTerm);
    setKits([]);
  };

  useEffect(() => {
    if (debouncedValue !== debouncedValueRef.current) {
      handleParamsChange();
    }
    debouncedValueRef.current = debouncedValue;
  }, [debouncedValue, handleParamsChange, setKits]);

  return (
    <>
      <Header
        currentPage="catalog"
        handleSearchChange={handleSearch}
        handleSearchKeyDown={(e) => {
          if (e.key === 'Enter') handleParamsChange();
        }}
      />
      <Stack
        justifyContent="space-between"
        sx={{ padding: 4, minHeight: `calc(100vh - ${headerHeight})` }}
      >
        {isLoading || isDebouncing ? (
          <Loader size={80} sx={{ m: 'auto' }} />
        ) : isEmpty ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ flex: 1, py: 8, color: 'text.secondary' }}
          >
            No kits found. Try a different search or check back later.
          </Stack>
        ) : (
          <Grid container spacing={5}>
            {kits.map((kit) => (
              <Grid size={2} key={kit.id}>
                <KitCard {...kit} />
              </Grid>
            ))}
          </Grid>
        )}
        {!isLoading && !isDebouncing && (
          <Pagination
            color="primary"
            shape="rounded"
            page={pageNumber}
            count={totalPages}
            onChange={(_, value) => handleParamsChange(value)}
            sx={{
              alignSelf: 'center',
              visibility: isEmpty ? 'hidden' : 'visible',
            }}
          />
        )}
      </Stack>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: CatalogPage,
  loader: async (params) => {
    const { page, searchTerm }: SearchParams = params.location.search;
    const { getKits } = useKitStore.getState();
    await getKits({
      PageNumber: page,
      SearchTerm: searchTerm,
    });
  },
});
