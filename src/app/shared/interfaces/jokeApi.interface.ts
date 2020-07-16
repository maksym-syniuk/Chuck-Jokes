export interface JokeApi {
    id: string;
    value: string;
    url: string;
    iconUrl: string;
    categories: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}
