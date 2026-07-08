import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [PokemonCardComponent, PokemonListComponent],
  imports: [CommonModule, FormsModule],
  exports: [PokemonListComponent],
})
export class PokemonModule {}