import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _pokemon: HttpClient) {
    this.getPokemon();
    this.getOvergrow();
  }

  getPokemon(){
    const bulbasaur = this._pokemon.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(res => {
      console.log("Bulbasaur's abilities are " + res.abilities[0].ability.name + " and " +
    res.abilities[1].ability.name + ".");
    });
  }

  // Retrieve pokemon that have the ability "overgrow."
  getOvergrow(){
    const overgrow = this._pokemon.get('https://pokeapi.co/api/v2/ability/65/'); // 65 is the ID for ability 'overgrow'
    overgrow.subscribe(res => {
      console.log('These pokemon also have the ability "overgrow" : ');
      for (var i=0; i<res.pokemon.length; i++){
        console.log((i+1) + ' - ' res.pokemon[i].pokemon.name);
      }
    })
  }
}
