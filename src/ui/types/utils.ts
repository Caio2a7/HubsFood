export interface Address {
    street: string;
    number: number;
    city: string;
    state: string;
    cep: string;
}

export type Dictionary<T> = {[key: string]: T}
