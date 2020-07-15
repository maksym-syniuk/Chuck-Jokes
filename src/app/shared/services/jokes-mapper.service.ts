import { Joke } from '../interfaces/joke.interface';
import { JokeApi } from '../interfaces/jokeApi.interface';
import { Injectable } from '@angular/core';

@Injectable()

export class JokesMapperService {

  constructor() { }

  public mapJokeApiForJokes(jokes: JokeApi[]): Joke[] {
    return jokes.map((joke: JokeApi) => {
      return {
        id: joke.id,
        value: joke.value,
        url: joke.url,
        iconUrl: joke.iconUrl,
        categories: joke.categories,
        favorite: false
      };
    });
  }
}
