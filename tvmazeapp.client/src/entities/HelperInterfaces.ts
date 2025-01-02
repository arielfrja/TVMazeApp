import { CastMember } from "./castMember";
import CrewMember from "./crewMember";
import EpisodeData from "./EpisodeData";

export interface Rating {
    average?: number;
}
export interface Schedule {
    time?: Date;
    days: string[];
}
export interface Network {
    id: number;
    name: string;
    country: Country;
    officialSite: string;
}
export interface Country {
    name: string;
    code: string;
    timezone: string;
}
export interface Externals {
    tvrage?: number;
    thetvdb?: number;
    imdb: string;
}

export interface Links {
    self: Link;
    previousepisode: Link;
}
interface Link {
    href: string;
    name: string;
}
export interface Embedded {
    episodes: EpisodeData[];
    cast: CastMember[];
    crew: CrewMember[];
}

export interface Image {
    medium: string;
    original: string;
}
