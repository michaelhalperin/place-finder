import { createContext, useContext, useState } from "react";

export type FavoritePlace = {
  latitude: number;
  longitude: number;
  title: string;
};

type FavoritesContextType = {
  favorites: FavoritePlace[];
  addFavorite: (place: FavoritePlace) => void;
  removeFavorite: (place: FavoritePlace) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritePlace[]>([]);

  const addFavorite = (place: FavoritePlace) => {
    setFavorites((prev) => [...prev, place]);
  };

  const removeFavorite = (place: FavoritePlace) => {
    setFavorites((prev) =>
      prev.filter(
        (p) => p.latitude !== place.latitude || p.longitude !== place.longitude
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
