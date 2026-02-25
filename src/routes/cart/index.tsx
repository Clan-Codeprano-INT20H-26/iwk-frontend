import { CartItem } from '@/components/CartItem';
import { OrderSummary } from '@/components/OrderSummary';
import { createFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import { Header } from '@/components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useCart } from '@/lib/hooks/useCart';

const CartPage = () => {
  const { items } = useCart();

  return (
    <>
      <Header currentPage="cart" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '80px 196px',
        }}
      >
        <Stack>
          <Typography variant="h2" sx={{ marginBottom: '32px' }}>
            Cart
          </Typography>
          <Box>
            <Stack direction="column" spacing={4} alignItems="stretch">
              {items.length > 0 ? (
                items.map((item) => <CartItem key={item.id} {...item} />)
              ) : (
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty.
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
        <Box>
          <Stack direction="column">
            <OrderSummary />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export const Route = createFileRoute('/cart/')({
  component: CartPage,
});
