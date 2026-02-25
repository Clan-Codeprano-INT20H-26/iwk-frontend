import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';
import { getCookie } from '@/lib/utils/getCookie';
import { PageLoader } from '@/components/PageLoader';

const RootLayout = () => (
  <>
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
    <Toaster />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  loader: async () => {
    const token = getCookie('token');
    const { user, getProfile, logout } = useUserStore.getState();

    if (!user && token) {
      await getProfile().then((user) => {
        if (!user) {
          logout();
        }
      });
    }
  },
  pendingComponent: PageLoader,
});
