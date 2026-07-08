import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, of, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonPageRes } from '../../models/pokemon-page-res.model';
import { TypeDetail } from '../../models/type-detail.model';
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

  // --- Opcional: buscador por nombre con debounce ---
  searchTerm: string = '';
  isSearching: boolean = false;
  searchError: string = '';
  searchResult: Pokemon | null = null;
  private searchTerms = new Subject<string>();

  // --- Opcional: detalle de tipo ---
  selectedType: TypeDetail | null = null;
  isLoadingType: boolean = false;
  typeError: string = '';

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.iniciarBuscador();
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

  // ---------- Opcional: buscador con debounce ----------

  // Cada letra que el usuario escribe entra por "searchTerms".
  // debounceTime(400) espera 400ms sin que se vuelva a escribir antes
  // de consultar. switchMap dispara la búsqueda y, si llega una letra
  // nueva antes de terminar, cancela la búsqueda anterior y usa la nueva.
  iniciarBuscador(): void {
    this.searchTerms
      .pipe(
        debounceTime(400),
        switchMap((term) => {
          const trimmedTerm = term.trim();

          if (!trimmedTerm) {
            this.searchResult = null;
            this.searchError = '';
            this.isSearching = false;
            return of(null);
          }

          this.isSearching = true;
          this.searchError = '';
          return this.pokemonService.searchPokemonByName(trimmedTerm);
        }),
      )
      .subscribe({
        next: (pokemon) => {
          this.isSearching = false;
          this.searchResult = pokemon;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isSearching = false;
          this.searchResult = null;
          this.searchError = `No se encontró ningún pokémon llamado "${this.searchTerm}".`;
          this.cdr.detectChanges();
          console.error('Error de búsqueda:', err);

          // Cuando el observable termina en error, deja de escuchar.
          // Por eso volvemos a llamar iniciarBuscador(), así el campo
          // de búsqueda sigue funcionando después de un error.
          this.iniciarBuscador();
        },
      });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchTerms.next(value);
  }

  // ---------- Opcional: detalle de tipo ----------

  // Se dispara con el evento (typeSelected) que emite app-pokemon-card
  // al hacer clic en el nombre de un tipo.
  onTypeSelected(typeName: string): void {
    this.isLoadingType = true;
    this.typeError = '';
    this.selectedType = null;

    this.pokemonService.getTypeDetail(typeName).subscribe({
      next: (detail) => {
        this.selectedType = detail;
        this.isLoadingType = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.typeError = `No se pudo cargar la información del tipo "${typeName}".`;
        this.isLoadingType = false;
        this.cdr.detectChanges();
        console.error('Error de tipo:', err);
      },
    });
  }

  closeTypeDetail(): void {
    this.selectedType = null;
    this.typeError = '';
  }
}
