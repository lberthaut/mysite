import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/datas.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

interface PokemonSpecies {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  sprites: any;
  height: number;
  id: number;
  stats: any[];
  types: { type: { name: string } }[];
}

interface GenerationData {
  count: number;
  results: { name: string }[];
}

@Component({
  selector: 'app-poke',
  templateUrl: './poke.component.html',
  styleUrls: ['./poke.component.scss'],
})
export class PokeComponent implements OnInit {
  generations: any[] = [];
  numberOfGenerations: number[] = [];
  isDataLoaded: boolean = false;
  selectedGenerationIndex: number | null = null;
  selectedType: string | null = null;
  pokemons: any[] = [];
  allPokemons: any[] = [];
  isLoadingPokemons: boolean = false;
  isNonePokemons: boolean = false;
  types: string[] = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  @ViewChild('pokemonTemplate') pokemonTemplateRef!: TemplateRef<any>;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadGenerations();
  }

  loadGenerations() {
    this.dataService.getDatas('pokemon/generation').subscribe({
      next: (data) => {
        this.generations = data.results;
        this.isDataLoaded = true;
        this.numberOfGenerations = Array.from(
          { length: this.generations.length },
          (_, i) => i + 1
        );
      },
      error: (error) => console.error('Error fetching generations', error),
    });
  }

  loadPokemonsByGeneration(generationName: string) {
    this.isLoadingPokemons = true;
    this.dataService
      .getDatas(`pokemon/generation/${generationName}`)
      .subscribe({
        next: (data: { pokemon_species: PokemonSpecies[] }) => {
          const pokemonSpecies = data.pokemon_species;
          const pokemonDetailsObservables = pokemonSpecies.map((species) => {
            const pokemonId = species.url.split('/').filter(Boolean).pop();
            return this.dataService.getDatas(`pokemon/${pokemonId}`);
          });

          forkJoin(pokemonDetailsObservables).subscribe({
            next: (detailsArray: PokemonDetails[]) => {
              this.allPokemons = detailsArray
                .map(this.mapPokemonDetails)
                .sort((a, b) => a.id - b.id);
              this.isLoadingPokemons = false;
              this.pokemons = [...this.allPokemons];
              console.log(this.pokemons);
            },
            error: (error) => {
              console.error('Error fetching pokemon details', error);
            },
          });
        },
        error: (error) => {
          console.error('Error fetching generation data', error);
          this.isLoadingPokemons = false;
        },
      });
  }

  mapPokemonDetails(details: any) {
    return {
      name: details.name,
      sprites: details.sprites,
      height: details.height,
      id: details.id,
      stats: details.stats,
      types: details.types.map((t: any) => t.type.name.toLowerCase()),
    };
  }

  selectGeneration(index: number) {
    this.selectedType = null;
    this.isNonePokemons = false;
    if (this.selectedGenerationIndex === index) {
      this.selectedGenerationIndex = null;
      this.pokemons = [];
    } else {
      this.selectedGenerationIndex = index;
      const generationName = this.generations[index].name;
      this.loadPokemonsByGeneration(generationName);
      if (window.scrollY == 0) {
        window.scrollTo({
          left: 0,
          top: 50 * window.outerHeight,
          behavior: 'smooth',
        });
      }
    }
  }

  selectType(typeName: string) {
    if (this.selectedType === typeName) {
      this.resetSelection();
    } else {
      this.selectedType = typeName;
      const typeObject = this.types.find((t) => t === typeName);
      if (!typeObject) {
        console.error('Selected type not found in types');
        return;
      }
      this.pokemons = this.allPokemons.filter((pokemon) =>
        pokemon.types.includes(typeObject)
      );
      if (this.pokemons.length == 0) {
        this.isNonePokemons = true;
        this.selectedGenerationIndex = null;
      }
    }
  }

  resetSelection() {
    this.selectedType = null;
    this.pokemons = [...this.allPokemons];
  }

  openPokemonModal(pokemon: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        templateRef: this.pokemonTemplateRef,
        content: pokemon,
      },
    });
  }
}
