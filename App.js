import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PokedexProvider } from "./src/context/PokedexContext";
import PokedexStack from "./src/navigation/PokedexStack";
import { colors } from "./src/theme";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <PokedexProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="dark" />
          <PokedexStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </PokedexProvider>
  );
}
