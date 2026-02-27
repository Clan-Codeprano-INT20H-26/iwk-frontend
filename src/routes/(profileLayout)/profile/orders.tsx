import dayjs, { type Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createFileRoute } from '@tanstack/react-router';
import { useUserStore } from '@/store/userStore';
import { Select } from '@/components/ui/Select';
import { Loader } from '@/components/ui/Loader';
import { OrderItem } from '@/components/OrderItem';

export type SortCriteria = 'createdAt' | 'totalAmount';

const sortOptions = [
  { value: '-createdAt', label: 'Date: Newest first' },
  { value: '+createdAt', label: 'Date: Oldest first' },
  { value: '-totalAmount', label: 'Total: High to low' },
  { value: '+totalAmount', label: 'Total: Low to high' },
] as const;

type SortOptionValue = (typeof sortOptions)[number]['value'];

const OrdersPage = () => {
  const orders = useUserStore((state) => state.orders);
  const totalPages = useUserStore((state) => state.totalPages);
  const initialPageNumber = useUserStore((state) => state.pageNumber);
  const isLoading = useUserStore((state) => state.isLoading);
  const getOrders = useUserStore((state) => state.getOrders);

  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [sortBy, setSortBy] = useState<SortOptionValue>('-createdAt');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const minDate = dayjs(
    orders.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )[0]?.createdAt
  );

  const maxDate = dayjs(
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]?.createdAt
  );

  useEffect(() => {
    const handleLoadOrders = async () => {
      const sortCriteria = sortBy.slice(1) as SortCriteria;
      const isDescending = sortBy.startsWith('-');

      await getOrders({
        PageNumber: pageNumber,
        SortBy: sortCriteria,
        IsDescending: isDescending,
        ...(fromDate && { FromDate: fromDate.toISOString() }),
        ...(toDate && { ToDate: toDate?.toISOString() }),
      });
    };
    handleLoadOrders();
  }, [pageNumber, sortBy, fromDate, toDate, getOrders]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap={3}>
        <Typography variant="h4">My Orders</Typography>
        <Stack gap={2}>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Stack direction="row" gap={2}>
              <DatePicker
                label="From date"
                minDate={minDate}
                maxDate={maxDate}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                value={dayjs(fromDate)}
                onChange={(value) => setFromDate(value)}
              />
              <DatePicker
                label="To date"
                minDate={minDate}
                maxDate={maxDate}
                value={dayjs(toDate)}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                onChange={(value) => setToDate(value)}
              />
            </Stack>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOptionValue)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        {isLoading ? (
          <Loader size={80} sx={{ alignSelf: 'center', mt: 10 }} />
        ) : orders.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" sx={{ pt: 10 }}>
            <Typography color="text.secondary">No orders found.</Typography>
          </Stack>
        ) : (
          <Stack gap={2}>
            {orders.map((order) => (
              <OrderItem key={order.id} {...order} />
            ))}
          </Stack>
        )}
        {!isLoading && totalPages > 1 && (
          <Pagination
            color="primary"
            shape="rounded"
            page={pageNumber}
            count={totalPages}
            onChange={(_, value) => setPageNumber(value)}
            sx={{ alignSelf: 'center', mt: 2 }}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export const Route = createFileRoute('/(profileLayout)/profile/orders')({
  component: OrdersPage,
  loader: async () => {
    const { getOrders } = useUserStore.getState();
    await getOrders();
  },
});
