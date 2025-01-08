export const theme = {
  colors: {
    primary: '#4A90E2',
    secondary: '#50E3C2',
    background: '#F8F9FA',
    text: '#2C3E50',
    accent: '#FF6B6B',
    error: '#E74C3C',
    success: '#2ECC71',
    border: '#E1E8ED',
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
      fontWeight: 'bold' as const,
      color: '#2C3E50',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: '#2C3E50',
    },
    body: {
      fontSize: 16,
      color: '#2C3E50',
    },
    caption: {
      fontSize: 14,
      color: '#7F8C8D',
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;