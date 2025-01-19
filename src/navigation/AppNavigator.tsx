import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { QuestionnaireScreen } from "../screens/QuestionnaireScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { MapScreen } from "../screens/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { PlaceDetailsScreen } from "../screens/PlaceDetails";
import { SettingsScreen } from "../screens/SettingsScreen";
import { RootStackParamList } from "../types/types";
import { useTheme } from "../theme/ThemeContext";
import { SortDropdown } from "../components/SortDropdown";
import { EditProfileScreen } from "@/screens/EditProfileScreen";
import { SortDirectionButton } from "@/components/SortDirectionButton";
import { View, StyleSheet, StatusBar } from "react-native";
import { AuthScreen } from "../screens/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return null;
      return !!token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Map":
                iconName = focused ? "map" : "map-outline";
                break;
              case "Profile":
                iconName = focused ? "person" : "person-outline";
                break;
              case "Settings":
                iconName = focused ? "settings" : "settings-outline";
                break;
              default:
                iconName = "home";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerRight: () => (
              <View style={styles.headerRight}>
                <SortDropdown />
                <SortDirectionButton />
              </View>
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: async (e) => {
              e.preventDefault();
              const isAuth = await checkAuthStatus();
              if (!isAuth) {
                navigation.navigate("Auth");
              } else {
                navigation.navigate("Profile");
              }
            },
          })}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: "Settings",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 16,
  },
});

export const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: "Edit Profile", headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
