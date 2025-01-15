import React, { useEffect } from "react";
import { View, Text, Image, Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@/theme/ThemeContext";
import { createWelcomeStyles } from "@/theme/constants";
import { RootStackParamList } from "../types/types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createWelcomeStyles(colors);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    // Wait 5 seconds before starting any animations
    const timer = setTimeout(() => {
      // Start fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // Only navigate after fade out is complete
        navigation.navigate("Home", {});
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim, flex: 1 }]}>
        <Image
          source={require("../../assets/background.jpeg")}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to PlaceFinder</Text>
            <Text style={styles.subtitle}>
              Discover amazing places tailored just for you
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
