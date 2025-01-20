import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "@/api/backApi";
import { useFavorites } from "@/context/FavoritesContext";
import { User } from "@/types/types";

interface UseUserDataRefreshProps {
  setUserData?: (userData: User | null) => void;
  onError?: (error: any) => void;
}

export const useUserDataRefresh = ({
  setUserData,
  onError,
}: UseUserDataRefreshProps = {}) => {
  const { addFavorite } = useFavorites();

  const refreshUserData = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        if (setUserData) {
          setUserData(null);
        }
        return null;
      }

      const user = await getUserProfile(userId);

      if (setUserData) {
        setUserData(user);
      }

      if (user.settings?.savedPlaces) {
        user.settings.savedPlaces.forEach((place) => addFavorite(place));
      }

      return user;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      if (onError) {
        onError(error);
      }
      return null;
    }
  }, [addFavorite, setUserData, onError]);

  return { refreshUserData };
};
