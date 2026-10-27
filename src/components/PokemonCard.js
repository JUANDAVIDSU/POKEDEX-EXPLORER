import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors, spacing, radius, shadow } from "../theme";
import { capitalize, formatNumber } from "../data/labels";

export default function PokemonCard({ pokemon, onPress }) {
  return (
    // width en 50% para que solo tenga 2 filas y no se vea muy lleno 
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        // meramente visual pa que si la toco se ponga oscura
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {/* muy importante,  una imagen de internet sin width y height no se ve, por eso se los pongo, duros 30 minutos de mi vida */}
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {capitalize(pokemon.name)}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
    padding: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    ...shadow,
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    width: 120,
    height: 120,
  },
  number: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
});
