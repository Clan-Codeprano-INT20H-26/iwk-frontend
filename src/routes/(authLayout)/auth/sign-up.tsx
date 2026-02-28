import { type SignUpSchema, signUpSchema } from '@/schema/sign-up.schema';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import { useUserStore } from '@/store/userStore';
import { AuthContainer } from '@/components/AuthContainer';
import { Link } from '@/components/ui/Link';
import Typography from '@mui/material/Typography';
import { LabeledTextfield } from '@/components/ui/LabeledTextField';
import { ContainedButton } from '@/components/ui/Button';

const SignUpPage = () => {
  const navigate = useNavigate();
  const signUp = useUserStore((state) => state.register);
  const isLoading = useUserStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    shouldFocusError: true,
  });

  const onSubmit = async (data: SignUpSchema) => {
    const { username, email, password } = data;

    await signUp(email, password, username).then(() =>
      navigate({ to: '/profile/orders', replace: true })
    );
  };

  return (
    <>
      <AuthContainer
        title="Create an account"
        description="Create an account to get easy access to your dream shopping"
        footer={
          <Stack
            direction="row"
            gap={1}
            sx={{
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Already have an account?
            </Typography>
            <Link to="/auth/sign-in">Sign in</Link>
          </Stack>
        }
      >
        <Stack
          component="form"
          noValidate
          autoComplete="off"
          gap={2}
          maxWidth={400}
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabeledTextfield
            id="name"
            label="Name"
            required
            placeholder="Hayman Andrews"
            errorMessage={errors.username?.message}
            {...register('username')}
          />
          <LabeledTextfield
            id="email"
            label="Email"
            required
            placeholder="example@mail.com"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <LabeledTextfield
            id="password"
            label="Password"
            required
            type="password"
            placeholder="at least 8 characters"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
          <LabeledTextfield
            id="confirmPassword"
            label="Confirm password"
            required
            type="password"
            placeholder="at least 8 characters"
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
          />
          <ContainedButton loading={isLoading} type="submit" sx={{ mt: 1 }}>
            Sign up
          </ContainedButton>
        </Stack>
      </AuthContainer>
      <Stack component="img" src="/sign-up.png" alt="Sign up" />
    </>
  );
};

export const Route = createFileRoute('/(authLayout)/auth/sign-up')({
  component: SignUpPage,
});
