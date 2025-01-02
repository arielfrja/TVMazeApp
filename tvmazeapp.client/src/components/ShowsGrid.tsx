import { Show } from "../entities/Show";
import ShowBasic from "../entities/showBasic";
import ShowCard from "./ShowCard";
import Grid from '@mui/material/Grid2';

interface ShowsGridProps {
    
    shows: ShowBasic[];
    onClickShow: (show: Show | ShowBasic) => void;
}

export default function ShowsGrid({shows: filteredResults, onClickShow}: ShowsGridProps) {
    return <Grid container spacing={2}>
        {filteredResults.map((show) => (
            <Grid size={{xs: 12, sm: 6, md: 4}} key={show.id}>
                <ShowCard
                    showResult={show}
                    onClick={(_event: React.MouseEvent<HTMLDivElement>) => onClickShow(show)} />
            </Grid>
        ))}
    </Grid>;
}