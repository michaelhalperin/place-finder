import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button } from "../components/Button";
import { useTheme } from "@/theme/ThemeContext";
import { createAuthStyles } from "@/theme/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { loginUser, registerUser } from "../api/backApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createAuthStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (isLogin) {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
    } else {
      if (!email || !password || !name) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
    }

    try {
      setIsLoading(true);
      if (isLogin) {
        const response = await loginUser({ email, password });
        await AsyncStorage.setItem("userToken", response.token);
        await AsyncStorage.setItem("userId", response.userId);
      } else {
        const response = await registerUser({
          email,
          password,
          name,
        });
        await AsyncStorage.setItem("userToken", response.token);
        await AsyncStorage.setItem("userId", response.userId);
      }
      navigation.navigate("Profile", {});
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.error ||
          `An error occurred during ${isLogin ? "login" : "registration"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{isLogin ? "Sign In" : "Register"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)} 
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </>
        )}
        <Button
          title={
            isLoading
              ? `${isLogin ? "Signing In..." : "Registering..."}`
              : isLogin
              ? "Sign In"
              : "Register"
          }
          onPress={handleAuth}
          variant="primary"
          style={styles.button}
          disabled={isLoading}
        />
        <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
