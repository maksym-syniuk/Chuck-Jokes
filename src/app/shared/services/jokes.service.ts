import { IJokeApiArr } from './../interfaces/IJokeApiArr';
import { IJokeApi } from './../interfaces/IJokeApi';
import { ApiService } from './api.service';
import { FormMapperService } from './form-mapper.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJoke } from '../interfaces/IJoke';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private jokes: IJoke[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private formMapperService: FormMapperService
  ) { }

  setJokes(jokesArr: IJoke[]): void {
    jokesArr.map((joke: IJoke) => this.jokes.unshift(joke));
  }

  getJokesArr(): IJoke[]{
    return this.jokes;
  }

  getJokes(value: object): Observable<IJokeApi> {
    return this.http.get<IJokeApi>(this.formMapperService.mapFormDataForApiResponse(value));
  }

  searchJoke(value: object): Observable<IJokeApiArr> {
    return this.http.get<IJokeApiArr>(this.formMapperService.mapFormDataForApiResponse(value));
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }
}
