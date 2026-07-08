import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  // Avisa al componente padre qué tipo se clickeó, para que él consulte el detalle.
  @Output() typeSelected = new EventEmitter<string>();

  onTypeClick(type: string): void {
    this.typeSelected.emit(type);
  }
}
