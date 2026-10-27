// la API manda cosas en ingles aqui las traduzco para la gente que no tiene b1
export const typeNames = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
};

export const statNames = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. especial",
  "special-defense": "Def. especial",
  speed: "Velocidad",
};

// lo máximo que puede tener una stat, lo uso para el porcentaje de la barrita
export const MAX_STAT = 255;

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const formatNumber = (id) => "#" + String(id).padStart(3, "0");
