import { JokeApiArr } from '../interfaces/JokeApiArr';
import { JokeApi } from '../interfaces/JokeApi';
import { ApiService } from './api.service';
import { FormMapperService } from './form-mapper.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/Joke';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private jokes: Joke[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private formMapperService: FormMapperService
  ) { }

  setJokes(jokesArr: Joke[]): void {
    jokesArr.map((joke: Joke) => this.jokes.unshift(joke));
  }

  getJokesArr(): Joke[] {
    return this.jokes;
  }

  getJokes(value: object): Observable<JokeApi> {
    return this.http.get<JokeApi>(this.formMapperService.mapFormDataForApiResponse(value));
  }

  searchJoke(value: object): Observable<JokeApiArr> {
    return this.http.get<JokeApiArr>(this.formMapperService.mapFormDataForApiResponse(value));
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }
}
