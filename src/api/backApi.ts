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

  return (
    await axios.get(`${BACKEND_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const updateUserProfile = async (
  userId: string,
  data: Partial<User>
): Promise<User> => {
  return (await axios.put(`${BACKEND_URL}/users/${userId}`, data)).data;
};

export const deleteUserAccount = async (userId: string): Promise<void> => {
  return (await axios.delete(`${BACKEND_URL}/users/${userId}`)).data;
};

// User preferences
export const updateUserPreferences = async (
  userId: string,
  preferences: User["preferences"]
): Promise<User> => {
  return (
    await axios.put(`${BACKEND_URL}/users/${userId}/preferences`, preferences)
  ).data;
};

// User favorites
export const updateUserFavorites = async (
  userId: string,
  favorites: string[]
): Promise<User> => {
  return (
    await axios.put(`${BACKEND_URL}/users/${userId}/favorites`, { favorites })
  ).data;
};
export const logoutUser = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userId");
};
