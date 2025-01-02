export default interface ShowBasic {
    id: number;
    name: string;
    genres: string[];
    rating: number;
    language: string;
    image: {
        medium: string;
        original: string;
    };
    summary: string;
}