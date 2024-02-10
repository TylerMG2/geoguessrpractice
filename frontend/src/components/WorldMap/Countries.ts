// Data types for the countries, regions and continents
enum DrivingSide {
    L = "Left",
    R = "Right"
};

export interface CountryData {
    id: string;
    iso_alpha3: string;
    flag_emoji: string;
    type: "country";
    name: string;
    coverage: number;
    driving_side: DrivingSide;
    path: string;
    bbox: string;
};

export interface RegionData {
    id: string;
    name: string;
    bbox: string;
    type: "region";
    countries: CountryData[];
};

export interface ContinentData {
    id: string;
    name: string;
    bbox: string;
    type: "continent";
    regions: RegionData[];
};

// Load countries data from countries_final.json
import worldDataJson from './countries_final.json';
export const worldData = worldDataJson as ContinentData[];