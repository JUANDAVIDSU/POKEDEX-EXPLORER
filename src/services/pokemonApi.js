// todos los fetch a la PokéAPI van aquí, las pantallas no deben hacer fetch
const BASE_URL = "https://pokeapi.co/api/v2";
const IMAGE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export const PAGE_SIZE = 20;

const getImageUrl = (id) => `${IMAGE_URL}/${id}.png`;

// la lista no trae el id me toca sacarlo a mi de la url bruh)
const getIdFromUrl = (url) => {
  const partes = url.split("/");
  return Number(partes[partes.length - 2]);
};

// de la lista solo me quedo con id, nombre e imagen, que es lo que usa la tarjeta
const mapListItem = (row) => {
  const id = getIdFromUrl(row.url);
  return { id, name: row.name, image: getImageUrl(id) };
};

// de la ficha dejo solo lo que muestro en el detalle
const mapDetail = (data) => ({
  id: data.id,
  name: data.name,
  image: data.sprites.other["official-artwork"].front_default || getImageUrl(data.id),
  types: data.types.map((t) => t.type.name),
  height: data.height / 10, // lo manda decímetros, entre 10 son metros
  weight: data.weight / 10, // aquí lo paso de hectogramos a kilos (ni diea que era un hectogramo la verdad) , (trabajo extra)
  stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
});

export const getPokemonList = async (limit, offset, signal) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Error http ${response.status}`);
  }

  const data = await response.json();
  return {
    pokemons: data.results.map(mapListItem),
    hasMore: data.next !== null, // cuando next es null no hay nada mas
  };
};

// importante chaval si no encuentro nada me manda un 404 
// siempre revisar el status antes de llamar a response.json() o se rompe
const fetchPokemon = async (term, signal) => {
  const response = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(term)}`, {
    signal,
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Error http ${response.status}`);
  }

  return response.json();
};

// esto devuelve una lista con 0 o 1 pokemon (vacía si no existe), así uso la misma FlatList
export const searchPokemon = async (text, signal) => {
  const data = await fetchPokemon(text, signal);
  if (data === null) return [];
  return [{ id: data.id, name: data.name, image: getImageUrl(data.id) }];
};

export const getPokemonDetail = async (idOrName, signal) => {
  const data = await fetchPokemon(idOrName, signal);
  return data === null ? null : mapDetail(data);
};
