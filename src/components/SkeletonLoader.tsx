import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createSkeletonStyles } from "@/theme/constants";

export const SkeletonLoader = () => {
  const { colors } = useTheme();
  const styles = createSkeletonStyles(colors);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0.6],
  });

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View style={styles.card}>
      <AnimatedView style={[styles.image, { opacity }]} />
      <AnimatedView style={[styles.title, { opacity }]} />
      <AnimatedView style={[styles.description, { opacity }]} />
      <AnimatedView style={[styles.shortLine, { opacity }]} />
    </View>
  );
};
