import { Platform } from "react-native";

export const colors = {
  background: "#F6F7FB",
  surface: "#FFFFFF",
  primary: "#DC0A2D",
  primaryDark: "#A30820",
  primarySoft: "#FDECEF",
  accent: "#F59E0B",
  success: "#0E9F6E",
  danger: "#E11D48",
  text: "#111827",
  textMuted: "#806b6b",
  border: "#E5E7EB",
};

// espacios en múltiplos de 4, lo hice igual que en reservas clases jajaja
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 999,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: "#102a0f",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

// un color para cada tipo como en el juego (pokemon red es mejor que pokemon zafiro, solo conocedores sabran )
export const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default { colors, spacing, radius, shadow, typeColors };
