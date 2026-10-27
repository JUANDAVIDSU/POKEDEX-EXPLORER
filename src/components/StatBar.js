import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme";
import { statNames, MAX_STAT } from "../data/labels";

export default function StatBar({ name, value }) {
  // valor en 255 es el maximo 
  const width = `${(value / MAX_STAT) * 100}%`;

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{statNames[name] || name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  name: {
    width: 100,
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    width: 36,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
});
