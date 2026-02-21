'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Configuration metadata for custom products
export interface ConfigurationMeta {
  templateId: string;
  sizeId: string;
  sizeLabel: string;
  resinColor: string;
  resinColorHex: string;
  resinRatio: string;
  resinTransparency: string;
  personalizationText?: string;
  personalizationFont?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  // Extended fields for configured products
  isConfigured?: boolean;
  configuration?: ConfigurationMeta;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  addConfiguredItem: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Generate unique ID for configured items
  const generateConfiguredItemId = () => {
    return `config-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const numQuantity = Number(quantity);
    setItems((prevItems) => {
      // Don't merge configured items - each is unique
      if ('isConfigured' in product && product.isConfigured) {
        return [...prevItems, { ...product, quantity: numQuantity }];
      }

      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + numQuantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: numQuantity }];
    });
  };

  // Add a configured item (each configuration is unique, never merged)
  const addConfiguredItem = (item: Omit<CartItem, 'quantity' | 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: generateConfiguredItemId(),
      quantity: 1,
      isConfigured: true,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = React.useMemo(() => 
    items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
  [items]);

  const totalPrice = React.useMemo(() => 
    items.reduce((sum, item) => sum + (item.price * (Number(item.quantity) || 0)), 0),
  [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, addConfiguredItem, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
