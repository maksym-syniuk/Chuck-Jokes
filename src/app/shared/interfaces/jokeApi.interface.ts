import { CategoryInterface } from './joke.interface';

export interface JokeApi {
    id: string;
    value: string;
    url: string;
    iconUrl: string;
    categories: Array<CategoryInterface>;
    createdAt: Date;
    updatedAt: Date;
}
