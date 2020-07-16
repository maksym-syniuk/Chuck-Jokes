import { CategoryInterface } from './joke.interface';

export interface JokeApiInterface {
    id: string;
    value: string;
    url: string;
    iconUrl: string;
    categories: Array<CategoryInterface>;
    createdAt: Date;
    updatedAt: Date;
}
