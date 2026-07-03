import { Pokemon } from './pokemon.model';

export interface PokemonPageRes {
  pokemons: Pokemon[];
  total: number;
}
