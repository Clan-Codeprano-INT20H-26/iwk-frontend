import { formatPercent } from '@/lib/utils/formatPercent';
import { formatPrice } from '@/lib/utils/formatPrice';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { ContainedButton } from './ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import Stack from '@mui/material/Stack';

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
  const navigate = useNavigate();
  const { subTotal } = useCart();

  const taxTotal = subTotal * (taxPercent || 1);
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
            mt: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="primary.main">
            ${finalTotal.toFixed(2)}
          </Typography>
        </Stack>
      )}
      <ContainedButton onClick={handleCheckout}>
        {isCheckout ? 'Confirm & Pay' : 'Checkout'}
      </ContainedButton>
    </Stack>
  );
};
