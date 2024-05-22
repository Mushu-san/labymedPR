import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeConsumoService {
  constructor(private http: HttpClient) {}

  getPokemones(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100');
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get(url);
  }

  getTranslation(abName: string): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/ability/'.concat(abName));
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'.concat(name));
  }
}
