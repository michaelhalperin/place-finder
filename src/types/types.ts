import { StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
  Welcome: undefined;
  Questionnaire: undefined;
  MainTabs: {
    screen: string;
    params: {
      userAnswers: Record<string, string>;
    };
  };
  Profile: {
    userAnswers?: Record<string, string>;
  };
  Settings: undefined;
  Home: {
    userAnswers?: UserSettings;
  };
  Map: undefined;
  PlaceDetails: {
    placeId: string;
    placeData: Activity;
  };
  Auth: undefined;
};

export interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    rating: number;
    image: string;
    description: string;
    distance?: string;
  };
  onPress: () => void;
}

interface Option {
  id: string;
  label: string;
  icon?: string;
}

export interface QuestionCardProps {
  question: string;
  options: Option[];
  onSelect: (optionId: string) => void;
  selectedOption?: string;
  isActive?: boolean;
}

export interface LocationProps {
  latitude: number;
  longitude: number;
}

export type TabStackParamList = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
};

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface GPTResponse {
  questions: Question[];
}

export interface UserPreferences {
  interests: string[];
  ageRange?: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  nextQuestions?: {
    [key: string]: Question;
  };
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  size?: "medium" | "large";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export type Activity = {
  id: string;
  name: string;
  rating: number;
  image: string;
  description: string;
  distance?: string;
  address: string;
  openingHours: string;
  features: string[];
  tags: string[];
  difficulty: string;
  duration: string;
  timeOfDay: string;
};

export type UserSettings = {
  [key: string]: string;
};

export type Description = {
  interests: string[];
  specifics: string[];
  text: string;
};