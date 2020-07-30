import { CategoryModel } from './../models/joke.model';
import { ImageModel } from './image.model';

export class JokeApiModel {
  id: string;
  value: string;
  url: string;
  imageUrls: Array<ImageModel>;
  imageNames?: Array<string>;
  categories: Array<CategoryModel>;
  createdAt: Date;
  updatedAt: Date;
}
