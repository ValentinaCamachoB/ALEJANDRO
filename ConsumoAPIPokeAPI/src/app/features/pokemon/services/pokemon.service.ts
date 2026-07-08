import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { PokemonListReq } from '../models/pokemon-list-req.model';
import { PokemonReq } from '../models/pokemon-req.model';
import { Pokemon } from '../models/pokemon.model';
import { PokemonPageRes } from '../models/pokemon-page-res.model';
import { TypeReq } from '../models/type-req.model';
import { TypeDetail } from '../models/type-detail.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number, page: number): Observable<PokemonPageRes> {
    const skip = limit * page;
    const queryParams = `?limit=${limit}&offset=${skip}`;

    return this.http.get<PokemonListReq>(`${this.API_URL}/pokemon${queryParams}`).pipe(
      switchMap((response: PokemonListReq) => {
        const detailRequests = response.results.map((item) =>
          this.getPokemonDetail(item.url),
        );

        return forkJoin(detailRequests).pipe(
          map((pokemons: Pokemon[]) => {
            return {
              pokemons: pokemons,
              total: response.count,
            };
          }),
        );
      }),
    );
  }

  getPokemonDetail(url: string): Observable<Pokemon> {
    return this.http
      .get<PokemonReq>(url)
      .pipe(map((pokemonReq: PokemonReq) => this.mapPokemon(pokemonReq)));
  }

  // Opcional: busca un pokémon por nombre (lo usa el buscador con debounce).
  searchPokemonByName(name: string): Observable<Pokemon> {
    const normalizedName = name.trim().toLowerCase();

    return this.http
      .get<PokemonReq>(`${this.API_URL}/pokemon/${normalizedName}`)
      .pipe(map((pokemonReq: PokemonReq) => this.mapPokemon(pokemonReq)));
  }

  // Opcional: trae el detalle de un tipo (debilidades y resistencias).
  getTypeDetail(typeName: string): Observable<TypeDetail> {
    return this.http
      .get<TypeReq>(`${this.API_URL}/type/${typeName}`)
      .pipe(map((typeReq: TypeReq) => this.mapTypeDetail(typeReq)));
  }

  private mapPokemon(pokemonReq: PokemonReq): Pokemon {
    return {
      id: pokemonReq.id,
      name: pokemonReq.name,
      image: pokemonReq.sprites.front_default ?? '',
      height: pokemonReq.height,
      weight: pokemonReq.weight,
      baseExperience: pokemonReq.base_experience,
      types: pokemonReq.types.map((t) => t.type.name),
      abilities: pokemonReq.abilities.map((a) => a.ability.name),
    };
  }

  private mapTypeDetail(typeReq: TypeReq): TypeDetail {
    return {
      name: typeReq.name,
      weaknesses: typeReq.damage_relations.double_damage_from.map((t) => t.name),
      resistances: typeReq.damage_relations.double_damage_to.map((t) => t.name),
      totalPokemon: typeReq.pokemon.length,
    };
  }
}
