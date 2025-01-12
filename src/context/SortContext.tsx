import React, { createContext, useContext, useState } from "react";

export type SortType = "distance" | "rating" | "name" | "popularity";

interface SortContextType {
  sortType: SortType;
  setSortType: (type: SortType) => void;
}

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortType, setSortType] = useState<SortType>("distance");

  return (
    <SortContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};
