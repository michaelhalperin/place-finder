import React, { createContext, useContext, useState } from "react";

interface SortContextType {
  isAscending: boolean;
  setIsAscending: (value: boolean) => void;
  sortType: string;
  setSortType: (value: string) => void;
}

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [sortType, setSortType] = useState("rating");

  return (
    <SortContext.Provider
      value={{ isAscending, setIsAscending, sortType, setSortType }}
    >
      {children}
    </SortContext.Provider>
  );
};

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};
