import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';
import { PageLoader } from '@/components/PageLoader';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { WishCard } from '@/components/WishCard';

const WishlistPage = () => {
  const {wishes} = useWishlist()

  return (
    <Stack gap={5} flexDirection='row' flexWrap='wrap'>
      {wishes.map(({id, name, price, images}, index) => (
        <WishCard key={index} id={id} name={name} price={price} image={images[0]}/>
      ))}
    </Stack>
  );
};

export const Route = createFileRoute('/profile/wishlist')({
  component: WishlistPage,
  pendingComponent: PageLoader,
});
