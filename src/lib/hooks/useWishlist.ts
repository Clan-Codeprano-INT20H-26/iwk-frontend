import type { Kit } from '@/types/kit';
import { useLocalStorage } from './useLocalStorage';

export const useWishlist = () => {
  const { value: wishlist, setValue: setWishlist } = useLocalStorage<Kit[]>(
    'wishlist',
    []
  );
  const subTotal = wishlist.reduce((acc, kit) => acc + kit.price, 0);

  const addWish= (kit: Kit) => {
    setWishlist([...wishlist, { ...kit}]);
  };

  const removeWish = (itemId: string) => {
    const filteredCart = wishlist.filter((item) => item.id !== itemId);
    setWishlist(filteredCart);
  };


  return {
    wishes: wishlist,
    subTotal,
    addWish,
    removeWish,
  };
};
