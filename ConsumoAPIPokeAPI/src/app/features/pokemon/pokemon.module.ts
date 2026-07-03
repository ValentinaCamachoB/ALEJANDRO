import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [PokemonCardComponent, PokemonListComponent],
  imports: [CommonModule],
  exports: [PokemonListComponent],
})
export class PokemonModule {}