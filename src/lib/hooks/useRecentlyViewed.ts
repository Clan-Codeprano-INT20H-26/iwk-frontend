import type { Kit } from '@/types/kit';
import { useLocalStorage } from './useLocalStorage';

export const useRecentlyViewed = () => {
  const { value: recentlyViewed, setValue: setRecentlyViewed } =
    useLocalStorage<Kit[]>('recentlyViewed', []);

  const addItem = (kit: Kit) => {
    const isInRecentlyViewed = recentlyViewed.some(
      (item) => item.id === kit.id
    );
    if (isInRecentlyViewed) return;
    setRecentlyViewed([...recentlyViewed, { ...kit }]);
  };

  return {
    items: recentlyViewed,
    addItem,
  };
};
