import { JokeApiArr } from '../interfaces/JokeApiArr';
import { Joke } from '../interfaces/Joke';
import { JokeApi } from '../interfaces/JokeApi';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesMapperService {

  constructor() { }

  mapJokeApiForJokes(jokes: JokeApi[]): Joke[] {
    return jokes.map((joke: JokeApi) => {
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

  mapJokeApiArrForJokes(jokes: JokeApiArr): Joke[] {
    return this.mapJokeApiForJokes(jokes.result);
  }
}
