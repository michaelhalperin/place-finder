import axios from "axios";
import { BACKEND_URL } from "@env";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  return (await axios.post(`${BACKEND_URL}/auth/login`, credentials)).data;
};

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, data);
    await AsyncStorage.setItem("userToken", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<User> => {
  const token = await AsyncStorage.getItem("userToken");

  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });

    const userData = {
      ...response.data,
      settings: {
        ...response.data.settings,
        savedPlaces: response.data.savedPlaces || [],
      },
    };

    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timed out - please check your internet connection"
        );
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deleteUserAccount = async (userId: string): Promise<void> => {
  return (await axios.delete(`${BACKEND_URL}/users/${userId}`)).data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userId");
};

export const updateUserSettings = async (userId: string, data: any) => {
  const token = await AsyncStorage.getItem("userToken");

  const response = await axios.put(
    `${BACKEND_URL}/api/users/settings/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteSavedPlace = async (userId: string, placeId: string): Promise<User> => {
  const token = await AsyncStorage.getItem("userToken");

  try {
    const response = await axios.delete(
      `${BACKEND_URL}/api/users/settings/${userId}/${placeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};
