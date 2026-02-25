// ...existing code...
import { useEffect, useState } from 'react';
import { useKitStore } from '@/store/kitStore';
import { type Kit } from '@/types/kit';
import { PageLoader } from '@/components/PageLoader';
import { createFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { defaultTypography } from '@/styles/typography';
import { Header } from '@/components/Header';
import {Swiper, SwiperSlide} from "swiper/react"

import { Navigation } from 'swiper/modules';

const KitPage = () => {
  const { kitId } = Route.useParams();
  const getKit = useKitStore(s => s.getKit);
  const [kit, setKit] = useState<Kit | null>(null);

  useEffect(() => {
    if (!kitId) return;
    const fetch = async () => {
      try {
        const data = await getKit(kitId);
        setKit(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, [kitId, getKit]);

  return(
    <>
    <Header currentPage={`${kit?.name}`}/>
    <Stack sx={{height: '100vh',justifyContent:'center', alignItems:'center'}}>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {kit?.images.map(kitImg => (
          <SwiperSlide>
            <img src={kitImg} alt="Kit's image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Stack gap={1}>
        <Stack sx={{fontFamily:defaultTypography.fontFamily}}>
          <Typography variant="h4">
            {kit?.name}
          </Typography>
          <Typography variant="subtitle1" color='#5C5C5C'>
            {kit?.seller}
          </Typography>
          <Typography variant="subtitle1" color="#4F46E5">
            {kit?.price}$
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h6" color="#4F46E5">
            Description
          </Typography>
          <Typography variant="subtitle2">
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
  loader: () => {},
  pendingComponent: PageLoader,
});