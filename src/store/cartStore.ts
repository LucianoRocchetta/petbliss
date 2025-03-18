// src/state/cartStore.ts
import { CartItem } from '@/types';
import { create } from 'zustand';

interface CartState {
  items: CartItem[]; 
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],  
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.product._id === item.product._id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.product._id === item.product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.product._id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product._id === id ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
