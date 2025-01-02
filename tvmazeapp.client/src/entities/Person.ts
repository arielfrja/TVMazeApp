import { Country, Image, Links } from "./HelperInterfaces";

export default interface Person {
    id: number;
    url: string;
    name: string;
    country: Country;
    birthday?: Date;
    deathday?: Date;
    gender: string;
    image: Image;
    updated: number;
    links: Links;
}
