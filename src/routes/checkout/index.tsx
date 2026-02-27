import { CheckoutForm } from '@/components/CheckoutForm';
import { Header } from '@/components/Header';
import { OrderSummary } from '@/components/OrderSummary';
import Stack from '@mui/material/Stack';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutSchema } from '@/schema/checkout.schema';
import { OrderService } from '@/api/orderService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/lib/hooks/useCart';
import { PageLoader } from '@/components/PageLoader';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useUserStore } from '@/store/userStore';

const orderService = new OrderService();

const CheckoutPage = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const user = useUserStore((state) => state.user)!;
  const [isLoading, setIsLoading] = useState(false);
  const [taxPercent, setTaxPercent] = useState<number>();
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  const { items: cart, clearCart } = useCart();

  const methods = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: user.email,
      latitude: '',
      longitude: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const latitude = useWatch({ control, name: 'latitude' });
  const longitude = useWatch({ control, name: 'longitude' });

  const kitIds = cart.map((item) => ({
    kitId: item.id,
    quantity: item.quantity,
  }));

  const onPaymentComplete = async () => {
    try {
      const order = await orderService.createOrder({
        latitude,
        longitude,
        items: kitIds,
      });
      clearCart();
      navigate({ to: '/order', search: { id: order.id } });
    } catch {
      toast.error('Failed to create order!');
    }
  };

  const onSubmit = async (data: CheckoutSchema) => {
    try {
      const { clientSecret } = await orderService.createIntent({
        items: kitIds,
      });

      if (!stripe || !elements) {
        onPaymentComplete();
        return;
      }

      const cardEl = elements.getElement(CardElement);
      if (!cardEl) {
        onPaymentComplete();
        return;
      }

      const order = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl,
          billing_details: {
            name: `${data.name} ${data.surname}`,
            email: data.email,
          },
        },
      });

      if (order.error) {
        toast.error(order.error.message || 'Payment failed');
        return;
      }

      if (order.paymentIntent?.status === 'succeeded') {
        onPaymentComplete();
        return;
      }
    } catch {
      toast.error('Failed to create order!');
    }
  };

  useEffect(() => {
    const handleTaxPercentChange = async () => {
      if (!latitude || !longitude) return;

      setIsLoading(true);

      try {
        const taxPercent = await orderService.calculateTax({
          latitude,
          longitude,
        });
        setTaxPercent(taxPercent);
        setMapDialogOpen(false);
      } catch {
        toast.error('The location is not in the New York area!');
      } finally {
        setIsLoading(false);
      }
    };
    handleTaxPercentChange();
  }, [latitude, longitude]);

  return (
    <>
      <Header currentPage="checkout" />
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{
          width: '100%',
          marginTop: '50px',
        }}
      >
        <FormProvider {...methods}>
          <CheckoutForm
            isLoading={isLoading}
            mapDialogOpen={mapDialogOpen}
            setMapDialogOpen={setMapDialogOpen}
          />
          <OrderSummary
            isCheckout
            taxPercent={taxPercent}
            onConfirmAndPay={handleSubmit(onSubmit)}
          />
        </FormProvider>
        {isSubmitting && <PageLoader open={isSubmitting} />}
      </Stack>
    </>
  );
};

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
  loader: () => {
    const cart = localStorage.getItem('cart');
    const { user, isLoading } = useUserStore.getState();

    if (!user && !isLoading) {
      throw redirect({ to: '/auth/sign-in' });
    }

    if (!cart || cart.length === 0) {
      throw redirect({ to: '/' });
    }
  },
});
