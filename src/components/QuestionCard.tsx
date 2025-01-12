import React from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { QuestionCardProps } from '@/types/types';
import { useTheme } from '@/theme/ThemeContext';
import { createQuestionCardStyles } from '@/theme/constants';

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onSelect,
  selectedOption,
}) => {
  const { colors } = useTheme();
  const styles = createQuestionCardStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option) => (
        <Animated.View 
          key={option.id}
          style={styles.optionContainer}
        >
          <Pressable
            onPress={() => onSelect(option.id)}
            android_ripple={{ color: colors.primary + '20' }}
          >
            <Text 
              style={[
                styles.option,
                selectedOption === option.id && styles.selectedOption
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
};