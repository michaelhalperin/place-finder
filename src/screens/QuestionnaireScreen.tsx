import React, { useState, useRef } from "react";
import { View, Text, ScrollView, SafeAreaView, Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestionCard } from "../components/QuestionCard";
import { Button } from "../components/Button";
import { useTheme } from "../theme/ThemeContext";
import { createQuestionnaireStyles } from "@/theme/constants";
import { RootStackParamList } from "@/types/types";
// import { INITIAL_QUESTIONS } from "@/utils/questions";
import { NEW_INITIAL_QUESTIONS } from "@/utils/newQuestions";

type Props = NativeStackScreenProps<RootStackParamList, "Questionnaire">;

export const QuestionnaireScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createQuestionnaireStyles(colors);
  const [currentQuestionId, setCurrentQuestionId] = useState("groupSize");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState([
    NEW_INITIAL_QUESTIONS["groupSize"],
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = (questionId: string, optionId: string) => {
    // Update the answer
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const currentQuestion = NEW_INITIAL_QUESTIONS[questionId];
    if (!currentQuestion) return;

    // Get next question ID using the nextQuestion function
    const nextQuestionId = currentQuestion.nextQuestion(optionId);

    if (nextQuestionId) {
      const nextQuestion = NEW_INITIAL_QUESTIONS[nextQuestionId];

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
        if (!updatedQuestions.find((q) => q.id === nextQuestionId)) {
          updatedQuestions.push(nextQuestion);
        }

        return updatedQuestions;
      });

      setCurrentQuestionId(nextQuestionId);

      // Scroll to new question
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({
          animated: true,
        });
      }, 100);
    }
  };

  const totalQuestions = Object.keys(answers).length;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Customize Your Experience</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Object.keys(answers).length} of {totalQuestions} answered
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
                question={
                  typeof q.question === "function"
                    ? q.question(
                        answers[questions[questions.length - 2]?.id] || ""
                      )
                    : q.question
                }
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
              navigation.navigate("Profile", {
                userAnswers: answers,
              })
            }
            disabled={Object.keys(answers).length !== totalQuestions}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
