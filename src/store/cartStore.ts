// src/state/cartStore.ts
import { CartItem } from '@/types';
import { create } from 'zustand';

interface CartState {
  items: CartItem[]; 
  isOpen: boolean;
  name: string;
  address: string;
  paymentMethod: string;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  toggleCart: () => void;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPaymentMethod: (paymentMethod: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],  
  isOpen: false,
  name: '',
  address: '',
  paymentMethod: 'Efectivo',
  setName: (name) => set({ name} ),
  setAddress: (address) => set({ address}),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod}),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => item.product._id === i.product._id && item.variant === i.variant
      );
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.product._id === item.product._id && item.variant === i.variant
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (id, variant) =>
    set((state) => ({
      items: state.items.filter((item) => item.product._id !== id && item.variant !== variant),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product._id === id ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true}),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCartStore;
