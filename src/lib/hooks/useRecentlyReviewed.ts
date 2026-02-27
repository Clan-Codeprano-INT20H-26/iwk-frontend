import type { Kit } from '@/types/kit';
import { useLocalStorage } from './useLocalStorage';

export const useRecentlyReviewed = () => {
  const { value: recentlyReviewed, setValue: setRecentlyReviewed } = useLocalStorage<Kit[]>(
    'recentlyReviewed',
    []
  );
  
  const addRecentlyReviewed= (kit: Kit) => {
    setRecentlyReviewed([...recentlyReviewed, { ...kit}]);
  };

  const removeRecentlyReviewed = (itemId: string) => {
    const filteredRecentlyReviewed = recentlyReviewed.filter((item) => item.id !== itemId);
    setRecentlyReviewed(filteredRecentlyReviewed);
  };


  return {
    recentlyReviewed,
    addRecentlyReviewed,
    removeRecentlyReviewed,
  };
};
