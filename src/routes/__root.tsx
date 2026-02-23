import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => (
  <>
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
    <Toaster />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
