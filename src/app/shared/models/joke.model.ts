export class JokeModel {
  id: string;
  value: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  iconUrl?: string;
  categories: Array<CategoryModel>;
  favorite: boolean;
}

export class CategoryModel {
  id: number | string;
  title: string;
}
