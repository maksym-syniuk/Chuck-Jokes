import { IJokeApiArr } from './../interfaces/IJokeApiArr';
import { IJoke } from './../interfaces/IJoke';
import { IJokeApi } from '../interfaces/IJokeApi';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesMapperService {

  constructor() { }

  mapJokeApiForJokes(jokes: IJokeApi[]): IJoke[] {
    return jokes.map( (joke: IJokeApi) => {
      return {
            categories: joke.categories,
            dateCreated: joke.created_at,
            iconUrl: joke.icon_url,
            id: joke.id,
            dateUpdated: joke.updated_at,
            url: joke.url,
            value: joke.value,
            favourite: false
          };
    });
  }

  mapJokeApiArrForJokes (jokes: IJokeApiArr): IJoke[]{
    return this.mapJokeApiForJokes(jokes.result);
  }
}

