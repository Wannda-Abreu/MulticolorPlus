import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CART_STORAGE_KEY } from "../lib/constants";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

interface CartContextValue {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const readCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      items,
      totalAmount,
      totalItems,
      addToCart: (product) => {
        setItems((current) => {
          const existing = current.find((entry) => entry._id === product._id);

          if (existing) {
            return current.map((entry) =>
              entry._id === product._id
                ? { ...entry, quantity: entry.quantity + 1 }
                : entry,
            );
          }

          return [...current, { ...product, quantity: 1 }];
        });
      },
      removeFromCart: (productId) => {
        setItems((current) =>
          current.filter((entry) => entry._id !== productId),
        );
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current
            .map((entry) =>
              entry._id === productId ? { ...entry, quantity } : entry,
            )
            .filter((entry) => entry.quantity > 0),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
};
