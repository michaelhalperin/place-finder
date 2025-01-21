import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useLocationContext } from "../context/LocationContext";

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
    if (!isLocationEnabled) {
      setState({
        latitude: null,
        longitude: null,
        error: "Location services are disabled",
        loading: false,
      });
      return;
    }

    requestAndGetLocation();
  }, [isLocationEnabled]);

  const requestAndGetLocation = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setState((prev) => ({
          ...prev,
          error: "Permission to access location was denied",
          loading: false,
        }));
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        error: null,
        loading: false,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to get location",
        loading: false,
      }));
    }
  };

  return {
    ...state,
    refreshLocation: requestAndGetLocation,
  };
};
