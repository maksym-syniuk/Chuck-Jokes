import { UserModel } from './../models/user.model';
import { AuthInterface } from './../interfaces/auth.interface';
import { JokeApiModel } from '../models/joke-api.model';
import { JokeModel } from '../models/joke.model';
import { Injectable } from '@angular/core';

@Injectable()
export class JokesMapperService {
  constructor() {}

  public mapJokeApiForJokes(jokes: JokeApiModel[]): JokeModel[] {
    return jokes.map((joke: JokeApiModel) => {
      return {
        id: joke.id,
        value: joke.value,
        url: joke.url,
        iconUrl: joke.iconUrl,
        categories: [...joke.categories],
        createdAt: joke.createdAt,
        updatedAt: joke.updatedAt,
        favorite: false,
      };
    });
  }
}
