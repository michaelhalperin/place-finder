import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { SortProvider } from "./src/context/SortContext";
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SortProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </SortProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
