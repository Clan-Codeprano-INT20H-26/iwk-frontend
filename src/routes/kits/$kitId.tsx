import '@/styles/swiper.css';
import { useState } from 'react';
import { useKitStore } from '@/store/kitStore';
import { PageLoader } from '@/components/PageLoader';
import { createFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Header } from '@/components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ContainedButton, OutlinedButton } from '@/components/ui/Button';
import { headerHeight } from '@/constants/headerHeight';
import { useCart } from '@/lib/hooks/useCart';

const KitPage = () => {
  const { items, addItem, removeItem } = useCart();
  const { kit } = Route.useLoaderData();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const isInCart = items.some((item) => item.id === kit.id);

  return (
    <>
      <Header currentPage={kit.name} />
      <Stack
        gap={10}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: `calc(100vh - ${headerHeight})`, position: 'relative' }}
      >
        <Stack gap={3} direction="row" sx={{ width: '650px', p: '10px' }}>
          <Swiper
            direction="vertical"
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={kit?.images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="main-swiper"
          >
            {kit.images.map((kitImage, index) => (
              <SwiperSlide key={index} className="main-swiper-slide">
                <img src={kitImage} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            {kit.images.map((kitImage) => (
              <SwiperSlide>
                <img src={kitImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
        <Stack gap={6} maxWidth={600}>
          <Stack gap={3}>
            <Stack>
              <Typography variant="h4">{kit.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {kit.seller}
              </Typography>
              <Typography variant="subtitle1" color="primary.main">
                {kit.price}$
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <OutlinedButton size="large">Add to Wishlist</OutlinedButton>
              <ContainedButton
                size="large"
                onClick={() => (isInCart ? removeItem(kit.id) : addItem(kit))}
                color={isInCart ? 'error' : 'primary'}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </ContainedButton>
            </Stack>
          </Stack>
          <Stack gap={2}>
            <Typography variant="h6" color="primary.main">
              Description
            </Typography>
            <Typography variant="body1" fontWeight={200}>
              {kit?.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export const Route = createFileRoute('/kits/$kitId')({
  component: KitPage,
  loader: async ({ params }) => {
    const { kitId } = params;
    const { getKit } = useKitStore.getState();
    const kit = await getKit(kitId);
    return { kit };
  },
  pendingComponent: PageLoader,
});
