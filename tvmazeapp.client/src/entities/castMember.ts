import Character from "./Character";
import Person from "./Person";

export interface CastMember {
    person: Person;
    character: Character;
    self: boolean;
    voice: boolean;
}

