import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { SortProvider } from "./src/context/SortContext";
import { LocationProvider } from "./src/context/LocationContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { LanguageProvider } from "./src/context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
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
      </FavoritesProvider>
    </LanguageProvider>
  );
}
