## Juan David Silva Uribe

# PokéDex Explorer
App hecha con Expo y React Native que consume la PokéAPI (https://pokeapi.co/api/v2/). Muestra una lista de Pokémon en 2 columnas con scroll infinito, busca por nombre o número y abre la ficha con imagen, tipos y estadísticas.



## Carpetas y qué hace cada archivo
```

App.js                        Arranca la app: PokedexProvider, SafeAreaProvider y NavigationContainer
src/
├── theme/index.js            Colores, espaciado, radios, sombra y el color de cada tipo
├── data/labels.js            Nombres en español de tipos y estadísticas, y funciones para formatear
├── services/pokemonApi.js    Todos los fetch a la PokéAPI y el mapeo de la respuesta
├── context/PokedexContext.js Estado de la lista (cargando, error, búsqueda, scroll infinito)
├── navigation/PokedexStack.js  Las dos vistas: List y Detail
├── screens/
│   ├── ListScreen.js         Título, búsqueda y cuadrícula de Pokémon
│   └── DetailScreen.js       Ficha del Pokémon y botón "Volver a la lista"
└── components/
    ├── PokemonCard.js        Tarjeta de la lista
    ├── TypeBadge.js          Distintivo de tipo con su color
    ├── StatBar.js            Estadística con su barra
    ├── LoadingState.js       Estado cargando
    ├── ErrorState.js         Estado error con botón "Reintentar"
    └── EmptyState.js         Estado sin resultados
```

## Por qué se organizo asi 
principalmente es siguiendo el orden ya tomado de otro proyecto que es reservasclasesingles

pokemonApi.js: trae los datos y no depende de ninguna otra parte del proyecto.

labels.js y theme: son lo compartido (textos, colores) que usan los demás.

PokedexContext.js: usa el servicio y guarda el estado de la lista.

PokedexStack.js y App.js: unen las pantallas con el Context.

ListScreen y DetailScreen: usan el Context, el servicio y los componentes.


## preguntas de reflexion 

1. Problema con la api y como traia los datos

- El id no viene en la lista, solo la url. Se saca del final de la url.
- La altura viene en decimetros y el peso en hectogramos. Se dividen entre 10 para
  mostrar metros y kilogramos.
- Los nombres de tipos y estadisticas vienen en ingles. Se traducen con los
  diccionarios de labels.js.
- Los nombres deben ir en minuscula y sin espacios. Por eso la busqueda hace
  trim() y toLowerCase().

2. cosas mas dificiles de entender en mi caso 
 - La parte que más me costó entender fue el useEffect y cómo funciona el scroll infinito, porque tuve que comprender cómo cargar información automáticamente y actualizar la pantalla sin tener que hacerlo manualmente.

 -Al probar la aplicación con Expo Go, me apareció un error con el código 500. Para solucionarlo,lo intente buscar muchas veces hasta que me di cuenta primero que el emulador no tenia wifi (por algun casual) y que solo tenia que esperar a que funcionara solo 

3. Uso de ia 
- se hizo uso de ia en una seccion de chatgpt donde me indicaba errores me ayudo un poco a tener un control de que hacer y explicandome cosas que no entendia bien, asi igual que aprendiendo a usar algunas nuevas como eñ scroll infinito y que era un hectogramo 
# POKEDEX-EXPLORER
