import { Image, Links } from "./HelperInterfaces";

export default interface Character {
    id: number;
    url: string;
    name: string;
    image: Image;
    links: Links;
}
