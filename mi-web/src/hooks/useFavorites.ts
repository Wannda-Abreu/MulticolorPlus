import { useEffect, useMemo, useState } from "react";

import { FAVORITES_STORAGE_KEY } from "../lib/constants";

const readFavorites = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return useMemo(
    () => ({
      favorites,
      isFavorite: (productId: string) => favorites.includes(productId),
      toggleFavorite: (productId: string) => {
        setFavorites((current) =>
          current.includes(productId)
            ? current.filter((entry) => entry !== productId)
            : [...current, productId],
        );
      },
    }),
    [favorites],
  );
};
