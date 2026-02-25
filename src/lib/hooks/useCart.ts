import type { Kit } from '@/types/kit';
import type { CartItem } from '@/types/cartItem';
import { useLocalStorage } from './useLocalStorage';

export const useCart = () => {
  const { value: cart, setValue: setCart } = useLocalStorage<CartItem[]>(
    'cart',
    []
  );
  const subTotal = cart.reduce((acc, kit) => acc + kit.price * kit.quantity, 0);

  const addItem = (kit: Kit) => {
    setCart([...cart, { ...kit, quantity: 1 }]);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCart(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const filteredCart = cart.filter((item) => item.id !== itemId);
    setCart(filteredCart);
  };

  const increaseQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity + 1);
  };

  const decreaseQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity - 1);
  };

  return {
    items: cart,
    subTotal,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  };
};
