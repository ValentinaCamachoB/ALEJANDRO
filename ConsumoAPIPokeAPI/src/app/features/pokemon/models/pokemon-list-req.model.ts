export interface PokemonListItemReq {
  name: string;
  url: string;
}

export interface PokemonListReq {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemReq[];
}
