import { AuthContainer } from '@/components/AuthContainer';
import { ContainedButton } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { LabeledTextfield } from '@/components/ui/LabeledTextField';
import { Link } from '@/components/ui/Link';
import { signInSchema, type SignInSchema } from '@/schema/sign-in.schema';
import { useUserStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignInPage = () => {
  const navigate = useNavigate();
  const signIn = useUserStore((state) => state.login);
  const isLoading = useUserStore((state) => state.isLoading);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
  });

  const onSubmit = async (data: SignInSchema) => {
    const { email, password } = data;

    await signIn(email, password, isRememberMe).then(
      (res) => res && navigate({ to: '/profile', replace: true })
    );
  };

  return (
    <>
      <AuthContainer
        title="Welcome back"
        description="Welcome back! Please enter your details to log into your account."
        footer={
          <Stack direction="row" gap={1} sx={{ justifyContent: 'center' }}>
            <Typography variant="subtitle2">
              {"Don't have an account?"}
            </Typography>
            <Link to="/auth/sign-up">Sign up</Link>
          </Stack>
        }
      >
        <Stack
          component="form"
          noValidate
          autoComplete="off"
          gap={1.5}
          maxWidth={400}
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabeledTextfield
            id="email"
            label="Email"
            required
            placeholder="example@mail.com"
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <LabeledTextfield
            id="password"
            label="Password"
            required
            type="password"
            placeholder="at least 6 characters"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          <Stack direction="row" gap={1} sx={{ justifyContent: 'start' }}>
            <Checkbox
              size="large"
              checked={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
            />
            <Typography variant="subtitle2">Remember me</Typography>
          </Stack>
          <ContainedButton loading={isLoading} type="submit">
            Sign in
          </ContainedButton>
        </Stack>
      </AuthContainer>
      <img src="/sign-in.png" alt="Sign in" />
    </>
  );
};

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
});
