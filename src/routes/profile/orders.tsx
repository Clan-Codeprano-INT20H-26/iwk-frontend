import { createFileRoute } from '@tanstack/react-router';

const OrdersPage = () => {
  return <div>Hello "/profile/orders"!</div>;
};

export const Route = createFileRoute('/profile/orders')({
  component: OrdersPage,
});
