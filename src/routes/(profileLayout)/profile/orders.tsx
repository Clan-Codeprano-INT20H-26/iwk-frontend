import dayjs, { type Dayjs } from 'dayjs';
import { useState, useEffect, type ChangeEvent, useRef } from 'react';
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
import { ContainedButton } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { OrderService } from '@/api/orderService';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const orderService = new OrderService();

export type SortCriteria = 'date' | 'price';

const sortOptions = [
  { value: '-date', label: 'Date: Newest first' },
  { value: '+date', label: 'Date: Oldest first' },
  { value: '-price', label: 'Total: High to low' },
  { value: '+price', label: 'Total: Low to high' },
] as const;

type SortOptionValue = (typeof sortOptions)[number]['value'];

const OrdersPage = () => {
  const user = useUserStore((state) => state.user);
  const orders = useUserStore((state) => state.orders);
  const totalPages = useUserStore((state) => state.totalPages);
  const initialPageNumber = useUserStore((state) => state.pageNumber);
  const isLoading = useUserStore((state) => state.isLoading);
  const getOrders = useUserStore((state) => state.getOrders);

  const [isUploading, setIsUploading] = useState(false);
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [sortBy, setSortBy] = useState<SortOptionValue>('-date');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [minDate, setMinDate] = useState<Dayjs>(dayjs());
  const [maxDate, setMaxDate] = useState<Dayjs>(dayjs());

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
          await orderService.uploadCSV(formData);
          await getOrders();
          toast.success('CSV file uploaded successfully');
        } catch {
          toast.error('Failed to update CSV file!');
        } finally {
          setIsUploading(false);
          e.target.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const newMinDate = dayjs(
      orders.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )[0]?.createdAt
    );

    const newMaxDate = dayjs(
      orders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]?.createdAt
    );

    if (newMinDate < minDate) {
      setMinDate(newMinDate);
    }

    if (newMaxDate > maxDate) {
      setMaxDate(newMaxDate);
    }
  }, [orders]);

  const fromDateMax = toDate ?? maxDate;
  const toDateMin = fromDate ?? minDate;

  useEffect(() => {
    const handleLoadOrders = async () => {
      const sortCriteria = sortBy.slice(1) as SortCriteria;
      const isDescending = sortBy.startsWith('-');

      await getOrders({
        PageNumber: pageNumber,
        SortBy: sortCriteria,
        IsDescending: isDescending,
        ...(fromDate && { FromDate: fromDate.toISOString().split('T')[0] }),
        ...(toDate && { ToDate: toDate?.toISOString().split('T')[0] }),
      });
    };
    handleLoadOrders();
  }, [pageNumber, sortBy, fromDate, toDate, getOrders]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap={3}>
        <Stack direction="row" gap={3}>
          <Typography variant="h4">My Orders</Typography>
          {user?.isAdmin && (
            <>
              <input
                type="file"
                accept=".csv"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <ContainedButton
                color="success"
                startIcon={<FileUploadIcon />}
                loading={isUploading}
                onClick={() => inputRef.current?.click()}
              >
                Import Orders CSV
              </ContainedButton>
            </>
          )}
        </Stack>
        <Stack gap={2}>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Stack direction="row" gap={2}>
              <DatePicker
                label="From date"
                minDate={minDate}
                maxDate={fromDateMax}
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
                minDate={toDateMin}
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
