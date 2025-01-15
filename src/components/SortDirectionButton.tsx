import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeContext";
import { useSortContext } from "@/context/SortContext";

export const SortDirectionButton = () => {
  const { colors } = useTheme();
  const { isAscending, setIsAscending } = useSortContext();

  return (
    <TouchableOpacity onPress={() => setIsAscending(!isAscending)}>
      <MaterialCommunityIcons
        name={isAscending ? "sort-ascending" : "sort-descending"}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};
