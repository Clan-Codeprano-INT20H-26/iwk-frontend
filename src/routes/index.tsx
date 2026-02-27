import { useCallback, useEffect, useRef, useState } from 'react';
import z from 'zod';
import { Header } from '@/components/Header';
import { Loader } from '@/components/ui/Loader';
import { useKitStore } from '@/store/kitStore';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { headerHeight } from '@/constants/headerHeight';
import { useDebounce } from '@/lib/hooks/useDebounce';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@/components/ui/Select';
import type { SortCriteria } from '@/types/sortCriteria';
import { KitList } from '@/components/KitList';

const normalizeSelectValue = (
  sortBy?: SortCriteria,
  isDescending?: boolean
) => {
  if (!sortBy) return '+name';
  const sortDirection = isDescending ? '-' : '+';
  return `${sortDirection}${sortBy}`;
};

const catalogSchema = z.object({
  page: z.number().optional(),
  searchTerm: z.string().optional(),
  sortBy: z.enum(['name', 'price']).optional(),
  desc: z.boolean().optional(),
});

const sortOptions = [
  { value: '+name', label: 'Name: A to Z' },
  { value: '-name', label: 'Name: Z to A' },
  { value: '+price', label: 'Price: High to Low  ' },
  { value: '-price', label: 'Price: Low to High' },
] as const;

const CatalogPage = () => {
  const navigate = useNavigate();
  const { sortBy, desc: isDescending } = Route.useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const { debouncedValue, isDebouncing } = useDebounce(searchTerm, 1500);
  const debouncedValueRef = useRef(debouncedValue);
  const kits = useKitStore((state) => state.kits);
  const isLoading = useKitStore((state) => state.isLoading);
  const totalPages = useKitStore((state) => state.totalPages);
  const pageNumber = useKitStore((state) => state.pageNumber);
  const setKits = useKitStore((state) => state.setKits);

  const isEmpty = kits.length === 0;

  const handleParamsChange = useCallback(
    (page?: number, sortBy?: SortCriteria, isDescending?: boolean) => {
      navigate({
        to: '/',
        search: {
          page,
          sortBy,
          desc: isDescending,
          ...(debouncedValue && { searchTerm: debouncedValue }),
        },
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
        gap={4}
        sx={{ p: 4, minHeight: `calc(100vh - ${headerHeight})` }}
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
          <Stack gap={3}>
            <Select
              value={normalizeSelectValue(sortBy, isDescending)}
              onChange={(e) => {
                const sortBy = (e.target.value as string).slice(1);
                const isDescending = (e.target.value as string).startsWith('-');
                handleParamsChange(
                  pageNumber,
                  sortBy as SortCriteria,
                  isDescending
                );
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <KitList kits={kits} />
          </Stack>
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
  validateSearch: catalogSchema,
  beforeLoad: (params) => {
    const { search } = params;
    const { data, success } = catalogSchema.safeParse(search);

    if (!success) {
      throw redirect({ to: '/', replace: true });
    }

    return data;
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const { page, searchTerm, sortBy = 'name', desc = false } = deps;

    const { getKits } = useKitStore.getState();
    await getKits({
      PageNumber: page,
      SearchTerm: searchTerm,
      SortBy: sortBy,
      IsDescending: desc,
    });
  },
});
