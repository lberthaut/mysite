import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/datas.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-poke',
  templateUrl: './poke.component.html',
  styleUrls: ['./poke.component.scss'],
})
export class PokeComponent {
  datasTypes: any;
  datasGen: any;
  genArray: any;
  dataLoaded: boolean = false;
  selectedGen: number | null = null;
  selectedType: string | null = null;
  genDatas: any;
  pokemonsDatas: any;
  selectedTypeObject: any;
  allPokemonsDatas: any;

  constructor(private dataService: DataService) {
    this.datasTypes = [];
    this.datasGen = 0;
    this.genArray = [];
  }

  async ngOnInit() {
    this.getTypes();
    this.getGenArray();
  }

  getGenArray() {
    this.dataService.getDatas('pokemon/generation').subscribe({
      next: (data) => {
        this.datasGen = data;
        console.log(this.datasGen);

        this.genArray = Array.from(
          { length: this.datasGen.count },
          (_, i) => i + 1
        );
        this.dataLoaded = true;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des générations', error);
      },
    });
  }

  getTypes() {
    this.dataService.getPokemonTypesSprites().subscribe({
      next: (data) => {
        this.datasTypes = data;
        console.log(this.datasTypes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types', error);
      },
    });
  }

  getPoke(generationName: string) {
    // Appel à ton API backend pour obtenir les espèces de Pokémon d'une génération spécifique
    this.dataService
      .getDatas(`pokemon/generation/${generationName}`)
      .subscribe({
        next: (data) => {
          // Supposons que 'data.pokemon_species' est un tableau d'espèces de Pokémon
          const pokemonSpecies = data.pokemon_species;

          // Création d'un tableau d'observables pour obtenir les détails de chaque Pokémon
          const pokemonsDetailsObservables = pokemonSpecies.map(
            (species: any) => {
              const pokemonId = species.url.split('/').filter(Boolean).pop();
              // Appel à ton API backend pour obtenir les détails d'un Pokémon spécifique
              return this.dataService.getDatas(`pokemon/${pokemonId}`);
            }
          );

          // Utilisation de forkJoin pour attendre que tous les observables soient complétés
          forkJoin(pokemonsDetailsObservables).subscribe({
            next: (pokemonsDetailsArray: any) => {
              // Traitement des données reçues pour chaque Pokémon
              const pokemonsDetails = pokemonsDetailsArray.map(
                (details: any) => {
                  return {
                    name: details.name,
                    sprite: details.sprites,
                    height: details.height,
                    id: details.id,
                    stats: details.stats,
                    types: details.types.map((type: any) => type.type.name), // Transforme les types en un tableau de noms de types
                  };
                }
              );

              // Tri des Pokémon par leur ID
              pokemonsDetails.sort((a: any, b: any) => a.id - b.id);
              this.allPokemonsDatas = pokemonsDetails;
              this.pokemonsDatas = pokemonsDetails;
              console.log(pokemonsDetails);
            },
            error: (error) => {
              console.error(
                'Erreur lors de la récupération des détails des Pokémon',
                error
              );
            },
          });
        },
        error: (error) => {
          console.error(
            'Erreur lors de la récupération des espèces de Pokémon',
            error
          );
        },
      });
  }

  selectGen(index: number) {
    this.selectedType = null;
    if (this.selectedGen === index) {
      this.selectedGen = null;
      this.pokemonsDatas = null;
    } else {
      this.selectedGen = index;
      this.getPoke(`${this.datasGen.results[this.selectedGen].name}`);
    }
  }

  selectType(typeName: string) {
    if (this.selectedType === typeName) {
      this.selectedType = null;
      this.selectedTypeObject = null;
      this.pokemonsDatas = [...this.allPokemonsDatas];
    } else {
      this.selectedType = typeName;
      this.selectedTypeObject = this.datasTypes.find(
        (type: any) => type.name.fr === this.selectedType
      );

      console.log(this.selectedTypeObject.name.en);
      console.log(this.pokemonsDatas);

      if (!this.selectedTypeObject) {
        console.error('Type sélectionné non trouvé dans datasTypes');
        return;
      }

      const selectedTypeName = this.selectedTypeObject.name.en.toLowerCase();
      const filteredPokemons = this.allPokemonsDatas.filter((pokemon: any) => {
        return pokemon.types.some(
          (type: any) => type.toLowerCase() === selectedTypeName
        );
      });
      this.pokemonsDatas = filteredPokemons;
    }
  }
}
