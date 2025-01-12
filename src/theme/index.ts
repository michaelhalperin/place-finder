export const theme = {
  colors: {
    light: {
      primary: "#4A90E2",
      secondary: "#50E3C2",
      background: "#F8F9FA",
      surface: "#FFFFFF",
      text: "#2C3E50",
      textSecondary: "#7F8C8D",
      accent: "#FF6B6B",
      error: "#E74C3C",
      success: "#2ECC71",
      border: "#E1E8ED",
      icon: "#666666",
    },
    dark: {
      primary: "#4A90E2",
      secondary: "#50E3C2",
      background: "#1a1a1a",
      surface: "#2C2C2C",
      text: "#E0E0E0",
      textSecondary: "#B0B0B0",
      accent: "#FF6B6B",
      error: "#E74C3C",
      success: "#2ECC71",
      border: "#404040",
      icon: "#2B2323FF",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 24,
    round: 50,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "bold" as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: "bold" as const,
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    errorText: {
      fontSize: 16,
    },
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;

export const getThemeColors = (isDarkMode: boolean) => {
  return isDarkMode ? theme.colors.dark : theme.colors.light;
};
