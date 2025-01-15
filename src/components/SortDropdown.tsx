import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createSortDropdownStyles } from "../theme/constants";
import { useSortContext, type SortType } from "../context/SortContext";

const sortOptions = [
  { id: "distance", label: "Distance", icon: "map-marker" },
  { id: "rating", label: "Rating", icon: "star" },
  { id: "name", label: "Name", icon: "sort-alphabetical-ascending" },
  { id: "popularity", label: "Popularity", icon: "trending-up" },
];

export const SortDropdown = () => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const { setSortType } = useSortContext();
  const styles = createSortDropdownStyles(colors);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <Icon name="sort-variant" size={24} color={colors.text} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.dropdown}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => {
                  setSortType(option.id as SortType);
                  setVisible(false);
                }}
              >
                <Icon
                  name={option.icon}
                  size={20}
                  color={colors.text}
                  style={styles.icon}
                />
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
