import { CategoryModel } from './../models/joke.model';

export class JokeApiModel {
  id: string;
  value: string;
  url: string;
  iconUrl: string;
  categories: Array<CategoryModel>;
  createdAt: Date;
  updatedAt: Date;
}
