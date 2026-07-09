# ConsumoAPIPokeAPI

Aplicación en Angular que consume la [PokeAPI](https://pokeapi.co/) para mostrar un listado paginado de pokémon, buscar por nombre y ver el detalle de fortalezas y debilidades de cada tipo.

## Tecnologías

- Angular 21
- RxJS (Observables, `forkJoin`, `switchMap`, `debounceTime`)
- TypeScript
- HttpClient (módulo de Angular para consumir APIs)

## Requisitos previos

- Node.js instalado
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)

## Instalación

```bash
npm install
```

## Levantar el proyecto en desarrollo

```bash
npm start
```

Esto ejecuta `ng serve` y abre la app en `http://localhost:4200/`.

## Otros comandos

```bash
npm run build   
npm run watch   
npm test        


```
src/app/
├── app.module.ts          # módulo raíz, arranca la aplicación
├── app.component.ts/html  # componente raíz, solo renderiza <app-pokemon-list>
├── core/                  # cosas globales que se cargan una sola vez (guards, interceptores)
├── shared/                # cosas reutilizables entre varias pantallas (pipes, componentes genéricos)
└── features/pokemon/      # toda la lógica de negocio relacionada a pokémon
    ├── pokemon.module.ts
    ├── models/             # interfaces con la forma de los datos
    ├── services/           # comunicación con la PokeAPI
    ├── pages/pokemon-list/ # pantalla principal (lista, buscador, paginación)
    └── components/pokemon-card/ # tarjeta reutilizable de un pokémon
```

### `models/`

Solo definen la forma de los datos, sin lógica. Hay dos familias:

| Archivo | Descripción |
|---|---|
| `pokemon-req.model.ts` | Forma de un pokémon tal cual lo entrega la API (datos anidados) |
| `pokemon.model.ts` | Forma de un pokémon ya simplificada para la pantalla |
| `pokemon-list-req.model.ts` | Forma de la lista resumida que entrega la API (`name` y `url`) |
| `pokemon-page-res.model.ts` | Forma del resultado final de una página (`pokemons` + `total`) |
| `type-req.model.ts` | Forma de un tipo (fuego, agua, etc.) tal cual lo entrega la API |
| `type-detail.model.ts` | Forma de un tipo ya simplificada (debilidades y resistencias) |

### `services/pokemon.service.ts`

Es el único lugar que se comunica con la PokeAPI mediante `HttpClient`. Expone:

- **`getPokemons(limit, page)`**: pide la lista resumida de pokémon, dispara una petición de detalle por cada uno con `getPokemonDetail`, y combina todas las respuestas con `forkJoin`.
- **`getPokemonDetail(url)`**: pide el detalle de un pokémon y lo transforma con `mapPokemon`.
- **`searchPokemonByName(name)`**: busca un pokémon por nombre exacto.
- **`getTypeDetail(typeName)`**: pide el detalle de un tipo y lo transforma con `mapTypeDetail`.
- **`mapPokemon` / `mapTypeDetail`** *(privados)*: convierten los datos crudos de la API en los modelos simplificados que usa la pantalla.

### `pages/pokemon-list/`

Componente principal de la pantalla. Carga la lista al iniciar, maneja la paginación y el buscador (con `debounceTime` de 400ms para no disparar una petición por cada tecla presionada).

### `components/pokemon-card/`

Componente reutilizable que solo recibe un pokémon por `@Input()` y lo muestra. No hace peticiones a la API.

## API utilizada

- `GET https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}` — lista paginada
- `GET https://pokeapi.co/api/v2/pokemon/{nombre}` — detalle de un pokémon
- `GET https://pokeapi.co/api/v2/type/{nombre}` — detalle de un tipo