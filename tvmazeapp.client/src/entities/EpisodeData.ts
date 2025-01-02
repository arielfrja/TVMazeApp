import { Image, Links } from "./HelperInterfaces";
export default interface EpisodeData {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: Date;
    airtime: Date;
    airstamp: Date;
    runtime: number;
    rating: {average: number;}
    image: Image; 
    summary: string;
    links: Links;
  }


