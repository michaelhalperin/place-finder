import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { globalStyles } from '@/theme/constants';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  style, 
  ...props 
}) => {
  return (
    <View style={[globalStyles.header, style]} {...props}>
      <Text style={globalStyles.headerTitle}>{title}</Text>
      {subtitle && <Text style={globalStyles.subtitle}>{subtitle}</Text>}
    </View>
  );
}; 