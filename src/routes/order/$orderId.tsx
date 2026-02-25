import { createFileRoute } from '@tanstack/react-router';

const OrderPage = () => {
  const { orderId } = Route.useParams();
  return (
    <div>
      <h1>Order {orderId}</h1>
    </div>
  );
};

export const Route = createFileRoute('/order/$orderId')({
  component: OrderPage,
});
