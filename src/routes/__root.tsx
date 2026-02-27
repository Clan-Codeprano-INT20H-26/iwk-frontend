import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';
import { getCookie } from '@/lib/utils/getCookie';
import { PageLoader } from '@/components/PageLoader';
import { StripeProvider } from '@/providers/StripeProvider';

const RootLayout = () => (
  <ThemeProvider>
    <StripeProvider>
      <Outlet />
      <Toaster />
    </StripeProvider>
  </ThemeProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  loader: async () => {
    const token = getCookie('token');
    const { user, getProfile, logout } = useUserStore.getState();

    if (!user && token) {
      await getProfile().catch(() => {
        logout();
      });
    }
  },
  pendingComponent: PageLoader,
});
