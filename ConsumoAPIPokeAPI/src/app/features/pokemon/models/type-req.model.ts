export interface TypeRelationReq {
  name: string;
  url: string;
}

export interface TypeDamageRelationsReq {
  double_damage_from: TypeRelationReq[];
  double_damage_to: TypeRelationReq[];
}

export interface TypePokemonSlotReq {
  slot: number;
  pokemon: TypeRelationReq;
}

export interface TypeReq {
  id: number;
  name: string;
  damage_relations: TypeDamageRelationsReq;
  pokemon: TypePokemonSlotReq[];
}
