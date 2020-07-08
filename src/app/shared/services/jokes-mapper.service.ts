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
        id: joke.id,
        value: joke.value,
        url: joke.url,
        iconUrl: joke.iconUrl,
        categories: joke.categories,
        favourite: false
      };
    });
  }
}
