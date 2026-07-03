export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  back_default: string | null;
}

export interface PokemonReq {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  sprites: PokemonSprites;
}
