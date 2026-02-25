import { CheckoutForm } from '@/components/CheckoutForm';
import { Header } from '@/components/Header';
import { OrderSummary } from '@/components/OrderSummary';
import Stack from '@mui/material/Stack';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutSchema } from '@/schema/checkout.schema';
import { OrderService } from '@/api/orderService';
import { useCallback, useEffect, useState } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { PageLoader } from '@/components/PageLoader';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const orderService = new OrderService();

const CheckoutPage = () => {
  const [taxPercent, setTaxPercent] = useState<number>();
  const [serverError, setServerError] = useState<string | null>(null);

  const { items: cart } = useCart();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const methods = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      latitude: '',
      longitude: '',
    },
  });

  const {
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const kitIds = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const onPaymentComplete = async () => {
    const order = await orderService.createOrder({
      latitude,
      longitude,
      kitId: kitIds,
    });
    navigate({ to: '/order/$orderId', params: { orderId: order.id } });
  };

  const handleSubmit = useCallback(
    async (data: CheckoutSchema) => {
      console.log(data);
      // const orderNumber = Date.now();

      const finalizeOrder = () => {
        reset();
        onPaymentComplete();
      };

      try {
        setServerError(null);

        // const body = {
        //   ...data,
        //   orderNumber,
        //   kitIds,
        // };

        // const { clientSecret } = await orderService.createPaymentIntent(body);

        if (!stripe || !elements) {
          finalizeOrder();
          return;
        }

        const cardEl = elements.getElement(CardElement);
        if (!cardEl) {
          finalizeOrder();
          return;
        }

        // const result = await stripe.confirmCardPayment(resJson.clientSecret, {
        //   payment_method: {
        //     card: cardEl,
        //     billing_details: {
        //       name: `${data.name} ${data.surname}`,
        //       email: data.email,
        //     },
        //   },
        // });

        // if (result.error) {
        //   setServerError(result.error.message || 'Payment failed');
        //   return;
        // }

        // if (result.paymentIntent?.status === 'succeeded') {
        //   finalizeOrder();
        //   elements.getElement(CardElement)?.clear();
        //   return;
        // }
      } catch {
        finalizeOrder();
      }
    },
    [stripe, elements, cart]
  );

  useEffect(() => {
    const handleTaxPercentChange = async () => {
      const taxPercent = await orderService.calculateTax({
        latitude,
        longitude,
      });
      setTaxPercent(taxPercent);
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
          <CheckoutForm onSubmit={handleSubmit} serverError={serverError} />
          <OrderSummary isCheckout taxPercent={taxPercent} />
        </FormProvider>
        {isSubmitting && <PageLoader open={isSubmitting} />}
      </Stack>
    </>
  );
};

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
});
