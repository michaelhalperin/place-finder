import { StyleProp, ViewStyle } from "react-native";

// Base interfaces for common properties
interface BasePlace {
  id: string;
  name: string;
  rating: number;
  image: string;
  description: string;
  distance?: string;
  website?: string | null;
}

// Common location interface (replaces both Location and LocationProps)
interface Location {
  latitude: number;
  longitude: number;
}

// Base navigation params interface
interface BaseParams {
  userAnswers?: UserSettings;
}

// Consolidated types and interfaces
export type RootStackParamList = {
  Welcome: undefined;
  Home: BaseParams;
  HomeTab: BaseParams;
  Questionnaire: undefined;
  Profile: BaseParams;
  Settings: undefined;
  User: BaseParams;
  Map:
    | {
        latitude?: number;
        longitude?: number;
      }
    | undefined;
  PlaceDetails: {
    placeId: string;
    placeData: Activity;
  };
  Auth: undefined;
  EditProfile: undefined;
};

export type TabStackParamList = Pick<
  RootStackParamList,
  "Home" | "Map" | "Profile"
>;

export interface PlaceCardProps {
  place: BasePlace;
  onPress: () => void;
}

export interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
  nextQuestions?: Record<string, Question>;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface QuestionCardProps {
  question: string;
  options: Pick<QuestionOption, "id" | "label" | "icon">[];
  onSelect: (optionId: string) => void;
  selectedOption?: string;
  isActive?: boolean;
}

export type Activity = BasePlace & {
  address: string;
  openingHours: string;
  features: string[];
  tags: string[];
  difficulty: string;
  duration: string;
  timeOfDay: string;
  phone: string | null;
};

// API related types
export interface Geometry {
  location: Location;
  viewport?: {
    northeast: Location;
    southwest: Location;
  };
}

export interface NearbyPlace {
  place_id: string;
  name: string;
  geometry: Geometry;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
  types: string[];
  website?: string;
}

export interface PlaceDetails extends NearbyPlace {
  formatted_address: string;
  formatted_phone_number?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  price_level?: number;
  international_phone_number?: string;
}

export interface UserSettings {
  name?: string;
  email?: string;
  foodTypes?: string[];
  activities?: string[];
  [key: string]: string | string[] | undefined;
}

export interface Description {
  interests: string[];
  specifics: string[];
  text: string;
  needsQuestionnaire?: boolean;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "medium" | "large";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface GPTResponse {
  questions: Question[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  phone?: string;
  preferences?: {
    foodTypes?: string[];
    activities?: string[];
  };
  favorites?: string[];
  createdAt?: string;
  updatedAt?: string;
  friends?: Array<{
    id: string;
    name: string;
  }>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  address?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  user: User;
}
