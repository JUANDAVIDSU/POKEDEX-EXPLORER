import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokedexContext } from "../context/PokedexContext";
import PokemonCard from "../components/PokemonCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { colors, spacing, radius } from "../theme";

export default function ListScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { pokemons, query, loading, loadingMore, error, search, retry, loadMore } =
    useContext(PokedexContext);

  const [searchText, setSearchText] = useState(""); // lo que voy escribiendo en el buscador

  const handleSearch = () => {
    search(searchText); // le paso el texto al context, y el lo usa para buscar 
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>PokéDex Explorer</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Busca por nombre o número..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // para que también busque con el Enter del teclado
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>

      {loading ? (
        <LoadingState message="Cargando Pokémon..." />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <View style={styles.listBox}>
          {/* Concepto de clase: FlatList. numColumns = 2 columnas, keyExtractor = id de cada tarjeta, onEndReached = scroll infinito */}
          <FlatList
            data={pokemons}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={item}
                onPress={() => navigation.navigate("Detail", { id: item.id })}
              />
            )}
            onEndReached={loadMore}
            ListEmptyComponent={
              <EmptyState
                title="No encontramos ese Pokémon"
                message={`No existe ningún Pokémon con el nombre o número "${query}".`}
              />
            }
            contentContainerStyle={{
              paddingHorizontal: spacing.sm,
              paddingBottom: spacing.lg,
              flexGrow: 1,
            }}
          />

          {/*pa que cuando muestre la carga de mas cartas queden abajito de to */}
          {loadingMore ? (
            <ActivityIndicator size="small" color={colors.primary} style={styles.footer} />
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    padding: spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listBox: {
    flex: 1,
  },
  footer: {
    marginVertical: spacing.lg,
  },
});
