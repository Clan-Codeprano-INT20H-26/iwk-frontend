import { createFileRoute } from '@tanstack/react-router';

const CheckoutPage = () => {
  return <div>Hello "/checkout/"!</div>;
};

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
});
