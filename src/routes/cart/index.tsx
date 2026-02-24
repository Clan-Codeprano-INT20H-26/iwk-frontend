import { Header } from '@/components/Header';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

const CartPage = () => {
  return (
    <>
      <Header currentPage="cart" />
      <Typography variant="h4">Cart</Typography>
    </>
  );
};

export const Route = createFileRoute('/cart/')({
  component: CartPage,
});
