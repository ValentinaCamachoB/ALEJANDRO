import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonPageRes } from '../../models/pokemon-page-res.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  limit: number = 20;
  page: number = 0;
  total: number = 0;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pokemonService.getPokemons(this.limit, this.page).subscribe({
      next: (data: PokemonPageRes) => {
        this.pokemons = data.pokemons;
        this.total = data.total;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage =
          'Ocurrió un error al cargar los pokémon. Intenta de nuevo.';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error:', err);
      },
    });
  }

  goNextPage(): void {
    const totalPages = Math.ceil(this.total / this.limit);
    const newPage = this.page + 1;
    this.page = newPage < totalPages ? newPage : totalPages - 1;
    this.loadPokemons();
  }

  goPrevPage(): void {
    const newPage = this.page - 1;
    this.page = newPage < 0 ? 0 : newPage;
    this.loadPokemons();
  }
}