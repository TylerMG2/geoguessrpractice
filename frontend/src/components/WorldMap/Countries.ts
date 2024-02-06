import countriesJson from './countries.json'

export interface Country {
    title: string;
    d: string;
    drives_left: boolean;
    coverage: number;
    id: string;
};

export const countries: Country[] = countriesJson;