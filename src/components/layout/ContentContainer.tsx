import React from 'react';
import { View, ScrollView, ViewProps } from 'react-native';
import { globalStyles } from '@/theme/constants';

interface ContentContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  scrollable = false, 
  style, 
  ...props 
}) => {
  if (scrollable) {
    return (
      <ScrollView 
        style={[globalStyles.content, style]} 
        contentContainerStyle={globalStyles.scrollContent}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[globalStyles.content, style]} {...props}>
      {children}
    </View>
  );
}; 