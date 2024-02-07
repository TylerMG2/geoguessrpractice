import countriesJson from './countries.json'

// Enum for continents
export enum Continent {
    Africa = "Africa",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania",
    Americas = "Americas"
};

// Enum for regions
export enum Region {
    NorthernAfrica = "Northern Africa",
    SubSaharanAfrica = "Sub-Saharan Africa",
    WesternAsia = "Western Asia",
    CentralAsia = "Central Asia",
    EasternAsia = "Eastern Asia",
    SouthernAsia = "Southern Asia",
    SoutheasternAsia = "Southeastern Asia",
    WesternEurope = "Western Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SouthernEurope = "Southern Europe",
    Australia = "Australia",
    Melanesia = "Melanesia",
    Micronesia = "Micronesia",
    Polynesia = "Polynesia",
    NorthernAmerica = "Northern America",
    CentralAmerica = "Central America",
    Caribbean = "Caribbean",
    SouthAmerica = "South America"
};

export enum Drives {
    Right = 1,
    Left = 2
};


// Country interface
export interface Country {
    title: string;
    d: string;
    drives: Drives;
    coverage: number;
    id: string;
    continent: Continent;
    region: Region
};

export const countries: Country[] = countriesJson.map(country => ({
    ...country,
    drives: country.drives_left ? Drives.Left : Drives.Right,
    continent: Continent[country.continent as keyof typeof Continent],
    region: Region[country.region as keyof typeof Region]
}));