import { StyleSheet } from "react-native";
import { theme } from "./index";

// Create a shared description style
const descriptionStyle = {
  ...theme.typography.body,
  lineHeight: 24,
};

export const createProfileStyles = (colors: any) =>
  StyleSheet.create({
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.md,
    },
    avatarText: {
      color: "white",
      fontSize: 36,
      fontWeight: "bold",
    },
    name: {
      ...theme.typography.h2,
      color: colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      ...theme.typography.body,
      color: colors.text,
      opacity: 0.8,
    },
    section: {
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sectionTitle: {
      ...theme.typography.h2,
      color: colors.text,
      marginBottom: theme.spacing.md,
    },
    preferenceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.sm,
    },
    preferenceValue: {
      color: colors.primary,
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: theme.spacing.sm,
    },
    header: {
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    description: {
      ...descriptionStyle,
      color: colors.text,
    },
    preferenceLabel: {
      ...theme.typography.body,
      color: colors.text,
    },
    questionnaireText: {
      ...theme.typography.body,
      color: colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },
    inputContainer: {
      padding: 16,
      gap: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    buttonContainer: {
      padding: 16,
      gap: 12,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    changePhotoText: {
      color: colors.primary,
      fontSize: 16,
    },
  });

export const globalStyles = StyleSheet.create({
  // Common container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.background,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.light.surface,
  },
  darkSafeArea: {
    flex: 1,
    backgroundColor: theme.colors.dark.surface,
  },

  // Common content styles
  content: {
    padding: theme.spacing.lg,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  // Common header styles
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.border,
    ...theme.shadows.small,
  },
  headerTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.md,
  },

  // Common text styles
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.light.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...descriptionStyle,
    color: theme.colors.light.text,
  },

  // Common list styles
  listContent: {
    padding: theme.spacing.md,
  },

  // Common loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Common image styles
  fullWidthImage: {
    width: "100%",
    height: 200,
  },

  // Common button container styles
  buttonContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.light.border,
    ...theme.shadows.small,
  },
});

export const createAuthStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      backgroundColor: colors.background,
      justifyContent: "center",
    },
    title: {
      ...theme.typography.h1,
      marginBottom: theme.spacing.xl,
      textAlign: "center",
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: theme.borderRadius.small,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      color: colors.text,
    },
    button: {
      marginTop: theme.spacing.md,
    },
    link: {
      color: colors.primary,
      textAlign: "center",
      marginTop: theme.spacing.lg,
    },
  });

export const createHomeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: theme.spacing.lg,
      backgroundColor: colors.primary,
    },
    headerTitle: {
      ...theme.typography.h2,
      color: "white",
    },
    listContent: {
      padding: theme.spacing.md,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      ...theme.typography.errorText,
      color: colors.error,
    },
    indicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    enableButton: {
      backgroundColor: colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
    },
    enableButtonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
  });

export const createSettingsStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingTop: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
      paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
      ...theme.typography.caption,
      color: colors.textSecondary,
      textTransform: "uppercase",
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    sectionContent: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.medium,
      ...theme.shadows.small,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: theme.spacing.md,
    },
    settingInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      marginRight: theme.spacing.md,
    },
    textContainer: {
      flex: 1,
      marginRight: theme.spacing.md,
    },
    settingIcon: {
      marginRight: theme.spacing.md,
      color: colors.textSecondary,
    },
    settingTitle: {
      ...theme.typography.body,
      color: colors.text,
    },
    settingDescription: {
      ...theme.typography.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    darkBackground: {
      backgroundColor: colors.dark,
    },
    linkItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing.md,
    },
    chevron: {
      color: colors.textSecondary,
    },
  });

export const createWelcomeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: theme.spacing.lg,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: theme.spacing.xxl * 3.2,
    },
    title: {
      ...theme.typography.h1,
      textAlign: "center",
      marginBottom: theme.spacing.md,
      color: "#fff",
    },
    subtitle: {
      ...theme.typography.body,
      textAlign: "center",
      color: "#fff",
      opacity: 0.8,
    },
    buttonContainer: {
      paddingBottom: theme.spacing.xl,
    },
  });

export const createPlaceCardStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.medium,
      overflow: "hidden",
      marginBottom: theme.spacing.lg,
      marginHorizontal: theme.spacing.sm,
      shadowColor: colors.shadow || "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },
    image: {
      width: "100%",
      height: 180,
      resizeMode: "cover",
    },
    content: {
      padding: theme.spacing.lg,
    },
    name: {
      ...theme.typography.h2,
      fontSize: 20,
      fontWeight: "700",
      marginBottom: theme.spacing.xs,
      color: colors.text,
    },
    rating: {
      ...theme.typography.body,
      fontSize: 15,
      color: colors.text,
      marginBottom: theme.spacing.sm,
      opacity: 0.9,
    },
    description: {
      ...theme.typography.body,
      color: colors.text,
      opacity: 0.7,
      lineHeight: 20,
      marginBottom: theme.spacing.md,
    },
    distance: {
      ...theme.typography.caption,
      color: colors.primary,
      fontWeight: "600",
      marginBottom: theme.spacing.sm,
    },
    website: {
      ...theme.typography.caption,
      color: colors.text,
      opacity: 0.8,
    },
    link: {
      color: colors.primary,
      fontWeight: "600",
      textDecorationLine: "none",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.sm,
    },
  });

export const createPlaceDetailsStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    image: {
      width: "100%",
      height: 300,
      resizeMode: "cover",
    },
    content: {
      padding: theme.spacing.lg,
      marginTop: -30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.background,
    },
    name: {
      ...theme.typography.h1,
      color: colors.text,
      marginBottom: theme.spacing.md,
      fontSize: 28,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.xl,
    },
    rating: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.rating,
      marginRight: theme.spacing.md,
    },
    distance: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
    },
    section: {
      marginBottom: theme.spacing.xl,
      padding: theme.spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.large,
      ...theme.shadows.small,
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: "solid",
    },
    sectionTitle: {
      ...theme.typography.h2,
      color: colors.primary,
      marginBottom: theme.spacing.md,
      fontSize: 20,
    },
    sectionText: {
      ...theme.typography.body,
      color: colors.text,
      opacity: 0.9,
      lineHeight: 24,
      fontSize: 16,
    },
    feature: {
      ...theme.typography.body,
      color: colors.text,
      marginBottom: theme.spacing.sm,
      paddingLeft: theme.spacing.sm,
      fontSize: 16,
      opacity: 0.9,
    },
    featuresList: {
      gap: theme.spacing.sm,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    featureDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
      opacity: 0.8,
    },
  });

export const createQuestionnaireStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.md,
      color: colors.primary,
    },
    progressContainer: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      marginBottom: theme.spacing.sm,
    },
    progressBar: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    progressText: {
      ...theme.typography.caption,
      color: colors.text,
      opacity: 0.7,
    },
    scrollView: {
      flex: 1,
      padding: theme.spacing.md,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },
    buttonContainer: {
      padding: theme.spacing.lg,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    button: {
      borderRadius: theme.borderRadius.medium,
    },
    questionContainer: {
      marginBottom: theme.spacing.md,
    },
  });

export const createQuestionCardStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.large,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.medium,
    },
    question: {
      ...theme.typography.h2,
      color: colors.text,
      marginBottom: theme.spacing.lg,
    },
    optionContainer: {
      marginBottom: theme.spacing.sm,
      transform: [{ scale: 1 }],
    },
    option: {
      ...theme.typography.body,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1.5,
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    selectedOption: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      color: colors.surface,
    },
  });

export const createSortDropdownStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      padding: 8,
      marginRight: 8,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    dropdown: {
      position: "absolute",
      top: 50,
      right: 10,
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.sm,
      minWidth: 180,
      ...theme.shadows.medium,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.small,
    },
    icon: {
      marginRight: theme.spacing.md,
    },
    optionText: {
      ...theme.typography.body,
      color: colors.text,
    },
  });

export const createSkeletonStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      borderRadius: 8,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 12,
      elevation: 2,
    },
    image: {
      height: 200,
      backgroundColor: colors.border,
      borderRadius: 8,
      marginBottom: 12,
    },
    title: {
      height: 24,
      backgroundColor: colors.border,
      borderRadius: 4,
      marginBottom: 8,
      width: "70%" as const,
    },
    description: {
      height: 16,
      backgroundColor: colors.border,
      borderRadius: 4,
      marginBottom: 8,
      width: "90%" as const,
    },
    shortLine: {
      height: 16,
      backgroundColor: colors.border,
      borderRadius: 4,
      width: "40%" as const,
    },
  });

export const createMapStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    fab: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: colors.primary,
    },
    searchBar: {
      position: "absolute",
      top: 10,
      left: 10,
      right: 10,
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.small,
      marginTop: theme.spacing.xxl,
    },
    card: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.xxl,
    },
    indicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      ...theme.typography.errorText,
      color: colors.error,
    },
    enableButton: {
      backgroundColor: colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
    },
    enableButtonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
  });
