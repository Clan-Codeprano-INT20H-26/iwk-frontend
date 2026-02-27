import z from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  surname: z.string().min(3, 'Surname is required'),
  email: z.email('Invalid email address'),
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
