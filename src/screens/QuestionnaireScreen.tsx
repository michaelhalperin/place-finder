import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestionCard } from "../components/QuestionCard";
import { Button } from "../components/Button";
import { theme } from "../theme";
import { useTheme } from "../theme/ThemeContext";
import { RootStackParamList } from "@/types/types";
import { INITIAL_QUESTIONS } from "@/utils/questions";

type Props = NativeStackScreenProps<RootStackParamList, "Questionnaire">;

export const QuestionnaireScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState([INITIAL_QUESTIONS["q1"]]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = (questionId: string, optionId: string) => {
    // Update the answer
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const currentQuestion = questions.find((q) => q.id === questionId);
    const selectedOption = currentQuestion?.options.find(
      (o) => o.id === optionId
    );

    if (selectedOption?.nextQuestions) {
      const nextQuestionId = Object.keys(selectedOption.nextQuestions)[0];
      const nextQuestion = selectedOption.nextQuestions[nextQuestionId];

      // Animation
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
          speed: 20,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
        }),
      ]).start();

      // Remove all questions after the current question
      setQuestions((prev) => {
        const currentIndex = prev.findIndex((q) => q.id === questionId);
        const updatedQuestions = prev.slice(0, currentIndex + 1);

        // Add the new next question if it's not already there
        if (!updatedQuestions.find((q) => q.id === nextQuestion.id)) {
          updatedQuestions.push(nextQuestion);
        }

        return updatedQuestions;
      });

      setCurrentQuestionId(nextQuestion.id);

      // Remove answers for questions that were removed
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        Object.keys(newAnswers).forEach((key) => {
          if (key !== questionId && !questions.find((q) => q.id === key)) {
            delete newAnswers[key];
          }
        });
        return newAnswers;
      });

      // Scroll to new question
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({
          animated: true,
        });
      }, 100);
    }
  };

  const progress = (Object.keys(answers).length / 5) * 100;

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.md,
      color: colors.primary,
    },
    progressContainer: {
      height: 6,
      backgroundColor: "#E0E0E0",
      borderRadius: 3,
      marginBottom: theme.spacing.sm,
    },
    progressBar: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    progressText: {
      ...theme.typography.caption,
      color: colors.text,
      opacity: 0.7,
    },
    scrollView: {
      flex: 1,
      padding: theme.spacing.md,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },
    buttonContainer: {
      padding: theme.spacing.lg,
      backgroundColor: "white",
      borderTopWidth: 1,
      borderTopColor: colors.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    button: {
      borderRadius: theme.borderRadius.medium,
    },
    questionContainer: {
      marginBottom: theme.spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Customize Your Experience</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Object.keys(answers).length} of 5 answered
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {questions.map((q) => (
            <Animated.View
              key={q.id}
              style={[
                styles.questionContainer,
                {
                  transform: [
                    { scale: q.id === currentQuestionId ? scaleAnim : 1 },
                  ],
                },
              ]}
            >
              <QuestionCard
                question={q.question}
                options={q.options}
                selectedOption={answers[q.id]}
                onSelect={(optionId) => handleAnswer(q.id, optionId)}
                isActive={q.id === currentQuestionId}
              />
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={() =>
              navigation.navigate("Home", {
                userAnswers: answers,
              })
            }
            disabled={Object.keys(answers).length !== 5}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
