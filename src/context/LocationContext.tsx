import React, { createContext, useContext, useState } from 'react';

type LocationContextType = {
  isLocationEnabled: boolean;
  setIsLocationEnabled: (enabled: boolean) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  return (
    <LocationContext.Provider value={{ isLocationEnabled, setIsLocationEnabled }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}; 