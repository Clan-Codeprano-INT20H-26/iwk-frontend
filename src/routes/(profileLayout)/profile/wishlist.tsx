import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { PageLoader } from '@/components/PageLoader';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { WishCard } from '@/components/WishCard';

const WishlistPage = () => {
  const { wishes } = useWishlist();

  return (
<<<<<<< HEAD:src/routes/profile/wishlist.tsx
    <>
      <Typography variant='h3' sx={{mb:'70px'}}>My Wishlist</Typography>
      <Stack gap={5} flexDirection='row' flexWrap='wrap'>
        {wishes.map(({id, name, price, images}, index) => (
          <WishCard key={index} id={id} name={name} price={price} image={images[0]}/>
        ))}
      </Stack>
    </>
=======
    <Stack gap={5} flexDirection="row" flexWrap="wrap">
      {wishes.map(({ id, name, price, images }, index) => (
        <WishCard
          key={index}
          id={id}
          name={name}
          price={price}
          image={images[0]}
        />
      ))}
    </Stack>
>>>>>>> fd454a687f10a4a53cbe61ab3e0f2d16231e8de7:src/routes/(profileLayout)/profile/wishlist.tsx
  );
};

export const Route = createFileRoute('/(profileLayout)/profile/wishlist')({
  component: WishlistPage,
  pendingComponent: PageLoader,
});
