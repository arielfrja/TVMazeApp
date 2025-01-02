import { useState } from "react";
import { MenuItem, Select, Typography, Box, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EpisodeCard from "./EpisodeCard"; // Use the updated EpisodeCard component
import EpisodeData from "../entities/EpisodeData";

interface EpisodeListProps {
  episodes: EpisodeData[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  // Group episodes by season
  const groupedBySeason = episodes.reduce((acc: { [key: number]: EpisodeData[] }, episode: EpisodeData) => {
    const key = episode.season;
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(episode);
    return acc;
}, {});

  const seasons = Object.keys(groupedBySeason).map((season) => parseInt(season));

  // State for selected season
  const [selectedSeason, setSelectedSeason] = useState(seasons[0] || 1);

  const handleSeasonChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setSelectedSeason(typeof event.target.value === "string" ? parseInt(event.target.value) : -1);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography variant="h4" component="h2" gutterBottom>
        Episodes by Season
      </Typography>

      {/* Season Selector */}
      <Box sx={{ mb: 3, width: 200 }}>
        <Select
          value={{value:selectedSeason }}
          onChange={handleSeasonChange}
          fullWidth
          displayEmpty
        >
          {seasons.map((season) => (
            <MenuItem key={season} value={season}>
              Season {season}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Episode Cards */}
      <Grid container spacing={2}>
        {groupedBySeason[selectedSeason]?.map((episode) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={episode.id}>
            <EpisodeCard episodeProp={episode} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
