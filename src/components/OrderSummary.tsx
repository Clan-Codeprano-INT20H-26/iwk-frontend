import { formatPercent } from '@/lib/utils/formatPercent';
import { formatPrice } from '@/lib/utils/formatPrice';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { ContainedButton } from './ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import Stack from '@mui/material/Stack';
import { useUserStore } from '@/store/userStore';
import InfoIcon from '@mui/icons-material/InfoOutline';
import Tooltip from '@mui/material/Tooltip';

interface OrderSummaryProps {
  isCheckout?: boolean;
  taxPercent?: number;
  onConfirmAndPay?: () => void;
}

export const OrderSummary = ({
  isCheckout = false,
  onConfirmAndPay,
  taxPercent,
}: OrderSummaryProps) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { items, subTotal } = useCart();

  const taxTotal = subTotal * (taxPercent ?? 0);
  const finalTotal = subTotal + taxTotal;

  const handleCheckout = () => {
    if (isCheckout && onConfirmAndPay) {
      onConfirmAndPay();
    } else {
      navigate({ to: '/checkout' });
    }
  };

  return (
    <Stack gap={5} sx={{ minWidth: '350px' }}>
      <Typography variant="h4">Summary</Typography>
      <Stack direction="column" gap={2}>
        <Stack>
          {items.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1">{item.name}</Typography>
              <Stack direction="row" gap={1}>
                <Typography variant="subtitle1" color="primary.main">
                  {formatPrice(item.price)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  x {item.quantity}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack
          sx={{
            gap: 2,
            paddingBottom: '20px',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Subtotal</Typography>
            <Typography variant="subtitle1" color="primary.main">
              ${subTotal.toFixed(2)}
            </Typography>
          </Stack>
          {isCheckout && taxPercent && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">
                Tax ({formatPercent(taxPercent)})
              </Typography>
              <Typography variant="subtitle1" color="primary.main">
                {formatPrice(subTotal * taxPercent)}
              </Typography>
            </Stack>
          )}
        </Stack>
        {isCheckout && (
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '20px',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1" color="primary.main">
              ${finalTotal.toFixed(2)}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Tooltip
        title="You must be logged in to checkout"
        arrow
        disableHoverListener={!!user}
      >
        <Stack>
          <ContainedButton
            onClick={handleCheckout}
            disabled={items.length === 0 || !user}
            startIcon={!user && <InfoIcon fontSize="small" />}
          >
            {isCheckout ? 'Confirm & Pay' : 'Checkout'}
          </ContainedButton>
        </Stack>
      </Tooltip>
    </Stack>
  );
};
