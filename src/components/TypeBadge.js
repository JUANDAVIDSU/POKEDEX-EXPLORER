import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typeColors } from "../theme";
import { typeNames, capitalize } from "../data/labels";

export default function TypeBadge({ type }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: typeColors[type] || colors.textMuted },
      ]}
    >
      <Text style={styles.text}>{typeNames[type] || capitalize(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
