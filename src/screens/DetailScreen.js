import { useState, useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemonDetail } from "../services/pokemonApi";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { colors, spacing, radius, shadow } from "../theme";
import { capitalize, formatNumber } from "../data/labels";

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const insets = useSafeAreaInsets();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPokemonDetail(id, signal);
      setPokemon(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("No se pudo cargar la ficha. Revisa tu internet.");
      }
    } finally {
      // si se reintenta la busqueda no queda en bucle (como en otras 20 partes joaaaa)
      if (!signal || !signal.aborted) setLoading(false);
    }
  };

  // Concepto de clase: array de dependencias del useEffect.
  // vuelve a pedirlo si se cambia el id 
  useEffect(() => {
    const controller = new AbortController();
    cargar(controller.signal);
    return () => controller.abort();
  }, [id]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {loading ? (
        <LoadingState message="Cargando ficha..." />
      ) : error ? (
        <ErrorState message={error} onRetry={() => cargar()} />
      ) : !pokemon ? (
        <EmptyState
          title="Pokémon no encontrado"
          message="No pudimos encontrar la ficha de este Pokémon."
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: pokemon.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>

          <View style={styles.measures}>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{pokemon.height} m</Text>
              <Text style={styles.measureLabel}>Altura</Text>
            </View>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{pokemon.weight} kg</Text>
              <Text style={styles.measureLabel}>Peso</Text>
            </View>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.sectionTitle}>Estadísticas base</Text>
            {pokemon.stats.map((stat) => (
              <StatBar key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </View>
        </ScrollView>
      )}

      <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.backButtonText}>Volver a la lista</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: "center",
    padding: spacing.lg,
  },
  image: {
    width: 240,
    height: 240,
  },
  number: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.md,
  },
  types: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  measures: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow,
  },
  measure: {
    alignItems: "center",
  },
  measureValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  measureLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statsBox: {
    alignSelf: "stretch",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
    marginBottom: spacing.md,
  },
  bar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
