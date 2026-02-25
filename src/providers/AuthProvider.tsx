import { useEffect, type PropsWithChildren } from 'react';
import { useUserStore } from '@/store/userStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const getProfile = useUserStore((state) => state.getProfile);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return <>{children}</>;
};
