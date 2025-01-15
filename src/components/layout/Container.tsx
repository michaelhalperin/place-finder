import React from 'react';
import { View, ViewProps } from 'react-native';
import { globalStyles } from '@/theme/constants';
import { useTheme } from '../../theme/ThemeContext';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <View 
      style={[
        isDarkMode ? globalStyles.darkContainer : globalStyles.container,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}; 