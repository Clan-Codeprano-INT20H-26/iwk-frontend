import { z } from 'zod';
import { Header } from '@/components/Header';
import { ContainedButton, OutlinedButton } from '@/components/ui/Button';
import { useUserStore } from '@/store/userStore';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

const orderSchema = z.object({
  id: z.uuid(),
});

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = Route.useSearch();

  return (
    <>
      <Header currentPage={`order #${id}`} />
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'end',
          paddingTop: '200px',
        }}
      >
        <Stack gap={5}>
          <Stack gap={1}>
            <Typography variant="h1">THANK YOU</Typography>
            <Stack direction="row" gap={1}>
              <Typography variant="h3" fontWeight={300}>
                for your order
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '750px' }}
          >
            Your order has been received and is currently being processed. You
            will receive an email confirmation with your order details shortly.
          </Typography>
          <Stack direction="row" gap={2}>
            <OutlinedButton
              size="large"
              onClick={() => navigate({ to: '/profile/orders', replace: true })}
            >
              View Order
            </OutlinedButton>
            <ContainedButton
              size="large"
              onClick={() => navigate({ to: '/', replace: true })}
            >
              Continue Shopping
            </ContainedButton>
          </Stack>
        </Stack>
        <Stack
          component="img"
          src="/order-confirmation.png"
          width={494}
          height={450}
          alt="Thank you"
        />
      </Stack>
    </>
  );
};

export const Route = createFileRoute('/order/')({
  component: OrderPage,
  validateSearch: orderSchema,
  beforeLoad: (params) => {
    const { search } = params;
    const { data, success } = orderSchema.safeParse(search);

    if (!success) {
      throw redirect({ to: '/', replace: true });
    }

    return data;
  },
  loader: async () => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
  },
});
