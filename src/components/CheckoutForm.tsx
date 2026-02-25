import { useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { WarningAmber } from '@mui/icons-material';
import { type CheckoutSchema } from '@/schema/checkout.schema';
import { CardElement } from '@stripe/react-stripe-js';
import { LabeledTextfield } from './ui/LabeledTextField';
import { Link } from './ui/Link';

interface CheckoutProps {
  onSubmit: (data: CheckoutSchema) => void;
  serverError?: string | null;
}

export const CheckoutForm = ({ onSubmit, serverError }: CheckoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CheckoutSchema>();

  return (
    <Box sx={{ width: 750 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Link to="/cart">Back to cart</Link>
        <Typography
          variant="h2"
          sx={{ marginTop: (theme) => theme.spacing(3) }}
        >
          Checkout
        </Typography>
        <Typography variant="h6" sx={{ mt: 8, mb: 3 }}>
          Personal info
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
          }}
        >
          <LabeledTextfield
            label="Name"
            {...register('name')}
            placeholder="Type your name..."
            errorMessage={errors.name?.message}
            reserveErrorSpace
          />
          <LabeledTextfield
            label="Surname"
            {...register('surname')}
            placeholder="Type your surname..."
            errorMessage={errors.surname?.message}
            reserveErrorSpace
          />
          <LabeledTextfield
            id="email"
            label="Email"
            placeholder="example@gmail.com"
            errorMessage={errors.email?.message}
            {...register('email')}
            reserveErrorSpace
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr ',
            gap: '24px',
          }}
        >
          <LabeledTextfield
            label="Latitude"
            {...register('latitude')}
            placeholder="40.746603"
            errorMessage={errors.latitude?.message}
            reserveErrorSpace
            disabled
          />
          <LabeledTextfield
            label="Longitude"
            {...register('longitude')}
            placeholder="-73.982700"
            errorMessage={errors.longitude?.message}
            reserveErrorSpace
            disabled
          />
        </Box>
        <Divider />
        <Typography variant="h6" sx={{ my: 3 }}>
          Payment info
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
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
                    color: '#424770',
                    fontFamily: 'Work Sans',
                    '::placeholder': {
                      color: '#424770',
                    },
                  },
                  invalid: {
                    color: 'error.main',
                  },
                },
              }}
            />
          </Box>
        </Box>
        {serverError && (
          <FormLabel
            sx={{
              color: 'error.main',
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <WarningAmber fontSize="small" />
            {serverError}
          </FormLabel>
        )}
      </form>
    </Box>
  );
};
