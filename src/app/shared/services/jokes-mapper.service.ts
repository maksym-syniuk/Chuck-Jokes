import { JokeInterface } from '../interfaces/joke.interface';
import { JokeApiInterface } from '../interfaces/joke-api.interface';
import { Injectable } from '@angular/core';

@Injectable()

export class JokesMapperService {

  constructor() { }

  public mapJokeApiForJokes(jokes: JokeApiInterface[]): JokeInterface[] {
    return jokes.map((joke: JokeApiInterface) => {
      return {
        id: joke.id,
        value: joke.value,
        url: joke.url,
        iconUrl: joke.iconUrl,
        categories: [...joke.categories],
        createdAt: joke.createdAt,
        updatedAt: joke.updatedAt,
        favorite: false
      };
    });
  }
}
