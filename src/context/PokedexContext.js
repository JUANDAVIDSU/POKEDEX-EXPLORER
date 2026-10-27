import { Alert } from "react-native";
import { createContext, useEffect, useState } from "react";
import { getPokemonList, searchPokemon, PAGE_SIZE } from "../services/pokemonApi";

export const PokedexContext = createContext(null);

export function PokedexProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState(""); // lo que buso en verdad, queda vacio hasta que se escriba
  const [loading, setLoading] = useState(true); // true hasta que llegue al principio de la lista
  const [loadingMore, setLoadingMore] = useState(false); // carga hasta que carguen los otros 20 pokemons 
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Concepto de clase fetch con async/await. aca uso los 3 estados , carga error y exito IMPORTANTE ACORDARME NO VAYA SER ME CORCHEN
  const cargar = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      if (query === "") {
        const result = await getPokemonList(PAGE_SIZE, 0, signal);
        setPokemons(result.pokemons);
        setHasMore(result.hasMore);
      } else {
        const result = await searchPokemon(query, signal);
        setPokemons(result);
        setHasMore(false); // LA BUSQUEDA SOLO TRAE UNO
      }
    } catch (err) {
      // abort no es error, soy yo dejando de buscar 
      if (err.name !== "AbortError") {
        setError("No se pudo conectar con la API. Revisa tu internet.");
      }
    } finally {
      // si se reintenta la busqueda no quede en loading para siempre 
      if (!signal || !signal.aborted) setLoading(false);
    }
  };

  // Concepto de clase: array de dependencias del useEffect.
  // importanticimo: dajar el query en el array hace que si cambio algo la busqueda se quede en bucle
  useEffect(() => {
    const controller = new AbortController();
    cargar(controller.signal);
    return () => controller.abort();
  }, [query]);

  // la api solo busca en minusculas y sin espacio, pa eso uso el trim y el tolowercase
  const search = (text) => {
    setQuery(text.trim().toLowerCase());
  };

  // vuelve a pedir lo mismo
  const retry = () => {
    cargar();
  };

  // Concepto de clase: scroll infinito. pido 20 mas y se agrega a la lista 
  const loadMore = async () => {
    if (loading || loadingMore || !hasMore || query !== "") return;

    setLoadingMore(true);
    try {
      const result = await getPokemonList(PAGE_SIZE, pokemons.length);
      setPokemons([...pokemons, ...result.pokemons]);
      setHasMore(result.hasMore);
    } catch (err) {
      Alert.alert("Error", "No se pudieron cargar más Pokémon.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <PokedexContext.Provider
      value={{ pokemons, query, loading, loadingMore, error, search, retry, loadMore }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
