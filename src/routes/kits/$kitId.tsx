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
import type { Swiper as SwiperClass } from 'swiper';
import { styled } from '@mui/material/styles';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import '@/styles/Swiper.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const StyledContainer = styled(Stack)({
  height: '100vh',
  justifyContent:'center',
  alignItems:'center',
  position:'relative',
  flexDirection:'row'
})

const StyledSwiperContainer = styled(Stack)({
  width: '500px',
  height:'500px',
  flexDirection:'row',
  backgroundColor:"#999792",
  padding:'10px'
})

const KitPage = () => {
  const { kitId } = Route.useParams();
  const getKit = useKitStore(s => s.getKit);
  const [kit, setKit] = useState<Kit | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
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
  if (!kit) return <PageLoader />;

  return(
    <>
    <Header currentPage={`${kit?.name}`}/>
    <StyledContainer gap={10}>
      <StyledSwiperContainer>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={kit?.images.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {kit?.images.map(kitImage=> (
            <SwiperSlide className='mySwiperSlide'>
            <img src={kitImage} />
          </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {kit?.images.map(kitImage => (
            <SwiperSlide>
            <img src={kitImage} />
          </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiperContainer>
      <Stack gap={3} width={600}>
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
    </StyledContainer>
    </>
  );
};


export const Route = createFileRoute('/kits/$kitId')({
  component: KitPage,
  loader: () => {},
  pendingComponent: PageLoader,
});