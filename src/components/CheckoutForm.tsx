import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { MapMouseEvent } from 'mapbox-gl';
import Map, { Marker, type MarkerDragEvent } from 'react-map-gl/mapbox';
import { CardElement } from '@stripe/react-stripe-js';
import { nyBounds, nyCenter } from '@/constants/nyBounds';
import { type CheckoutSchema } from '@/schema/checkout.schema';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { LabeledTextfield } from './ui/LabeledTextField';
import { Link } from './ui/Link';
import { ContainedButton } from './ui/Button';
import Grid from '@mui/material/Grid';

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface CheckoutProps {
  isLoading: boolean;
  mapDialogOpen: boolean;
  setMapDialogOpen: (open: boolean) => void;
}

export const CheckoutForm = ({
  isLoading,
  mapDialogOpen,
  setMapDialogOpen,
}: CheckoutProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutSchema>();

  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLng, setCurrentLng] = useState<number | null>(null);

  const handleMapClick = (e: MapMouseEvent) => {
    e.preventDefault();
    const { lat: newLat, lng: newLng } = e.lngLat;
    setCurrentLat(newLat);
    setCurrentLng(newLng);
  };

  const handleConfirmLocation = () => {
    if (!currentLat || !currentLng) return;
    setValue('latitude', currentLat.toFixed(6));
    setValue('longitude', currentLng.toFixed(6));
  };

  return (
    <Box sx={{ width: 750 }}>
      <Link to="/cart">Back to cart</Link>
      <Typography variant="h2" sx={{ mt: (theme) => theme.spacing(3) }}>
        Checkout
      </Typography>
      <Stack gap={3}>
        <Typography variant="h6" sx={{ mt: 8, mb: 3 }}>
          Personal info
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <LabeledTextfield
              label="Name"
              {...register('name')}
              placeholder="Type your name..."
              errorMessage={errors.name?.message}
              reserveErrorSpace
            />
          </Grid>
          <Grid size={4}>
            <LabeledTextfield
              label="Surname"
              {...register('surname')}
              placeholder="Type your surname..."
              errorMessage={errors.surname?.message}
              reserveErrorSpace
            />
          </Grid>
          <Grid size={4}>
            <LabeledTextfield
              label="Email"
              placeholder="example@gmail.com"
              errorMessage={errors.email?.message}
              {...register('email')}
              reserveErrorSpace
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={6}>
            <LabeledTextfield
              label="Latitude"
              {...register('latitude')}
              placeholder="Choose your location..."
              errorMessage={errors.latitude?.message}
              reserveErrorSpace
              disabled
            />
          </Grid>
          <Grid size={6}>
            <LabeledTextfield
              label="Longitude"
              {...register('longitude')}
              placeholder="Choose your location..."
              errorMessage={errors.longitude?.message}
              reserveErrorSpace
              disabled
            />
          </Grid>
        </Grid>
        <ContainedButton
          type="button"
          size="large"
          sx={{ mb: 3, alignSelf: 'flex-start' }}
          onClick={() => setMapDialogOpen(true)}
        >
          Choose your location
        </ContainedButton>
      </Stack>
      <Divider />
      <Typography variant="h6" sx={{ my: 3 }}>
        Payment info
      </Typography>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.text.secondary}`,
          borderRadius: '8px',
          p: 2,
          maxWidth: '100%',
          height: '56px',
        }}
      >
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#4F46E5',
                fontFamily: 'Work Sans',
                '::placeholder': {
                  color: '#94A3B8',
                },
              },
              invalid: {
                color: 'error.main',
              },
            },
          }}
        />
      </Box>
      <Dialog
        open={mapDialogOpen}
        onClose={() => !isLoading && setMapDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Choose your location (Currently only NY is supported)
        </DialogTitle>
        <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              ...nyCenter,
              zoom: 8,
            }}
            doubleClickZoom={false}
            onDblClick={handleMapClick}
            renderWorldCopies={false}
            maxBounds={nyBounds}
            style={{ height: 700 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {currentLat && currentLng && (
              <Marker
                longitude={currentLng}
                latitude={currentLat}
                draggable
                anchor="center"
                onDragEnd={(e: MarkerDragEvent) => {
                  const { lng, lat } = e.target.getLngLat();
                  setCurrentLat(lat);
                  setCurrentLng(lng);
                }}
              />
            )}
          </Map>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <ContainedButton
            disabled={isLoading}
            onClick={() => setMapDialogOpen(false)}
          >
            Cancel
          </ContainedButton>
          <ContainedButton
            loading={isLoading}
            onClick={handleConfirmLocation}
            disabled={!currentLat || !currentLng}
          >
            Confirm location
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
