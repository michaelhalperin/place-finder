import axios from "axios";
import { BACKEND_URL } from "@env";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/types";

// Authentication endpoints
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  return (await axios.post(`${BACKEND_URL}/auth/login`, credentials)).data;
};

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  return (await axios.post(`${BACKEND_URL}/auth/register`, data)).data;
};

// User data endpoints
export const getUserProfile = async (userId: string): Promise<User> => {
  return (await axios.get(`${BACKEND_URL}/users/${userId}`)).data;
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
