import { createFileRoute } from '@tanstack/react-router';

const WishlistPage = () => {
  return <div>Hello "/profile/wishlist"!</div>;
};

export const Route = createFileRoute('/profile/wishlist')({
  component: WishlistPage,
});
