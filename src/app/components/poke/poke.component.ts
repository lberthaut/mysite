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

  constructor(private dataService: DataService) {
    this.datasTypes = [];
    this.datasGen = 0;
    this.genArray = [];
  }

  async ngOnInit() {
    this.getTypes();
    this.getGenArray('generation');
  }

  getGenArray(endpoints: string) {
    this.dataService.getPokemonData(endpoints).subscribe({
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

  getPoke(endpoint: string) {
    this.dataService.getPokemonData(endpoint).subscribe({
      next: (data) => {
        const pokemonSpecies = data.pokemon_species;

        const pokemonDetailsObservables = pokemonSpecies.map((species: any) => {
          const pokemonId = species.url.split('/').filter(Boolean).pop();
          return this.dataService.getPokemonData(`pokemon/${pokemonId}`);
        });

        forkJoin(pokemonDetailsObservables).subscribe(
          (pokemonDetailsArray: any) => {
            const pokemonSpritesAndNames = pokemonDetailsArray.map(
              (details: any) => {
                return {
                  name: details.name,
                  sprite: details.sprites,
                  height: details.height,
                  id: details.id,
                  stats: details.stats,
                  types: details.types,
                };
              }
            );
            pokemonSpritesAndNames.sort((a: any, b: any) => a.id - b.id);
            this.pokemonsDatas = pokemonSpritesAndNames;
            console.log(pokemonSpritesAndNames);
          }
        );
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des détails des Pokémon',
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
      this.getPoke(
        `generation/${this.datasGen.results[this.selectedGen].name}`
      );
    }
  }

  selectType(typeName: string) {
    if (this.selectedType === typeName) {
      this.selectedType = null;
      this.selectedTypeObject = null;
    } else {
      this.selectedType = typeName;
      this.selectedTypeObject = this.datasTypes.find(
        (type: any) => type.name.fr === this.selectedType
      );

      if (!this.selectedTypeObject) {
        console.error('Type sélectionné non trouvé dans datasTypes');
        return;
      }

      const selectedTypeName = this.selectedTypeObject.name.en;
      const filteredPokemons = this.pokemonsDatas.filter((pokemon: any) => {
        return pokemon.types.some(
          (typeContainer: any) => typeContainer.type.name === selectedTypeName
        );
      });

      console.log('Nom du type sélectionné:', selectedTypeName);
      console.log(
        'Premier Pokémon pour vérifier les types:',
        this.pokemonsDatas[0].types
      );
      console.log('Pokémons filtrés:', filteredPokemons);
    }
  }
}
