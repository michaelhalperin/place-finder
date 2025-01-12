import React from 'react';
import { SafeAreaView, ViewProps } from 'react-native';
import { globalStyles } from '@/theme/constants';
import { useTheme } from '../../theme/ThemeContext';

interface SafeAreaContainerProps extends ViewProps {
  children: React.ReactNode;
}

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({ 
  children, 
  style, 
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <SafeAreaView 
      style={[
        isDarkMode ? globalStyles.darkSafeArea : globalStyles.safeArea,
        style
      ]} 
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}; 