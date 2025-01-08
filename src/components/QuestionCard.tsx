import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { QuestionCardProps } from '@/types/types';
import { theme } from '../theme';

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onSelect,
  selectedOption
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option) => (
        <Animated.View 
          key={option.id}
          style={styles.optionContainer}
        >
          <Text 
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption
            ]}
            onPress={() => onSelect(option.id)}
          >
            {option.label}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  question: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.lg,
  },
  optionContainer: {
    marginBottom: theme.spacing.md,
  },
  option: {
    ...theme.typography.body,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
});