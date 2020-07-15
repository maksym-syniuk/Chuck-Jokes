export interface Joke {
    id: string;
    value: string;
    dateCreated?: Date;
    iconUrl?: string;
    dateUpdated?: Date;
    url?: string;
    categories: Array<string>;
    favorite: boolean;
}
