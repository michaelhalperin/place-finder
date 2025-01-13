import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { SortProvider } from "./src/context/SortContext";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <LocationProvider>
          <SortProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </SortProvider>
        </LocationProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
