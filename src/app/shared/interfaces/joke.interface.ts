export interface JokeInterface {
    id: string;
    value: string;
    url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    iconUrl?: string;
    categories: Array<CategoryInterface>;
    favorite: boolean;
}

export interface CategoryInterface {
    id: number | string;
    title: string;
}
