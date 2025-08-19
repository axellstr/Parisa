/// <reference path="../.astro/types.d.ts" />

// Global cart types
interface Window {
  parisaCart?: {
    items: any[];
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    checkout: () => void;
    getFormattedTotal: () => string;
    getTotalItems: () => number;
  };
  updateCartQuantity?: (id: string, quantity: any) => void;
  removeCartItem?: (id: string) => void;
}