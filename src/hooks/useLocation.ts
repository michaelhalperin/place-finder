import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  const requestAndGetLocation = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setState(prev => ({
          ...prev,
          error: 'Permission to access location was denied',
          loading: false,
        }));
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        error: null,
        loading: false,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to get location',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    requestAndGetLocation();
  }, []);

  return {
    ...state,
    refreshLocation: requestAndGetLocation,
  };
}; 