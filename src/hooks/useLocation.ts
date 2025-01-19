import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useLocationContext } from '../context/LocationContext';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const { isLocationEnabled } = useLocationContext();
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    // Reset state when location is disabled
    if (!isLocationEnabled) {
      setState({
        latitude: null,
        longitude: null,
        error: 'Location services are disabled',
        loading: false,
      });
      return;
    }

    // Only request location if enabled
    requestAndGetLocation();
  }, [isLocationEnabled]);

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
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
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

  return {
    ...state,
    refreshLocation: requestAndGetLocation,
  };
}; 