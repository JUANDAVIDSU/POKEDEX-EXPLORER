import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";

export default function LoadingState({ message = "Cargando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
