import type { Kit } from '@/types/kit';
import { useLocalStorage } from './useLocalStorage';

export const useWishlist = () => {
  const { value: wishlist, setValue: setWishlist } = useLocalStorage<Kit[]>(
    'wishlist',
    []
  );
  
  const addWish= (kit: Kit) => {
    setWishlist([...wishlist, { ...kit}]);
  };

  const removeWish = (itemId: string) => {
    const filteredWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(filteredWishlist);
  };


  return {
    wishes: wishlist,
    addWish,
    removeWish,
  };
};
