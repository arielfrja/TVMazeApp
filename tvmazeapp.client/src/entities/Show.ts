import { Schedule, Rating, Network, Externals, Image, Links, Embedded } from "./HelperInterfaces";

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime?: number;
    averageRuntime: number;
    premiered?: Date;
    ended?: Date;
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network;
    webChannel: any;
    dvdCountry: any;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    links: Links;
    _embedded: Embedded;
}


