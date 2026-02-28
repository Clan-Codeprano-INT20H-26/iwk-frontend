import type { Kit } from '@/types/kit';
import { useLocalStorage } from './useLocalStorage';

export const useWishlist = () => {
  const { value: wishlist, setValue: setWishlist } = useLocalStorage<Kit[]>(
    'wishlist',
    []
  );

  const addItem = (kit: Kit) => {
    setWishlist([...wishlist, { ...kit }]);
  };

  const removeItem = (itemId: string) => {
    const filteredWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(filteredWishlist);
  };

  return {
    items: wishlist,
    addItem,
    removeItem,
  };
};
