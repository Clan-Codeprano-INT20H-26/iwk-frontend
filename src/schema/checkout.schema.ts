import z from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  surname: z.string().min(3, 'Surname is required'),
  email: z.email('Invalid email address'),
  latitude: z.string(),
  longitude: z.string(),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
