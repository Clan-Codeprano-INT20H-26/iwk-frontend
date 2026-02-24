import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { kitId } = Route.useParams();
  return <div>Hello, {kitId}!</div>;
};

export const Route = createFileRoute('/kits/$kitId')({
  component: RouteComponent,
});
