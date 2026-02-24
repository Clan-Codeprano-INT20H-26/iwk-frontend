import { createFileRoute } from '@tanstack/react-router';

const KitPage = () => {
  const { kitId } = Route.useParams();
  return <div>Hello, {kitId}!</div>;
};

export const Route = createFileRoute('/kits/$kitId')({
  component: KitPage,
});
