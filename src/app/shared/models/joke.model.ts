import { ImageModel } from './image.model';

export class JokeModel {
  id: string;
  value: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: Array<ImageModel>;
  imageNames?: Array<string>;
  categories: Array<CategoryModel>;
  favorite: boolean;
}

export class CategoryModel {
  id: number | string;
  title: string;
}
