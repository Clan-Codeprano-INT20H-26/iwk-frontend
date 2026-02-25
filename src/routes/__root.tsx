import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => (
  <>
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
    <Toaster />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
