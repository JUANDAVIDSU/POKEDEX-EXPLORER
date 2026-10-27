import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";

// aqui 2 cositas la lista y el detalle, el detalle es la carta de los pokemons 
const Stack = createNativeStackNavigator();

export default function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
