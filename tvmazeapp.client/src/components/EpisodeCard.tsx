import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import EpisodeData from "../entities/EpisodeData";

interface EpisodeCardProps {
    episodeProp: EpisodeData
}


export default function EpisodeCard({ episodeProp: episode }: EpisodeCardProps) {
    return (
      <Card sx={{ m: 2, maxWidth: 320, borderRadius: 3, boxShadow: 3 }}>
        {/* Episode Image */}
        {episode.image && (
          <CardMedia
            component="img"
            image={episode.image.medium}
            alt={episode.name}
            sx={{ height: 180 }}
          />
        )}
  
        {/* Episode Info */}
        <CardHeader
          title={`S${episode.season}E${episode.number}: ${episode.name}`}
          subheader={`Aired on: ${new Date(episode.airdate).toLocaleDateString()}`}
          titleTypographyProps={{ fontWeight: "bold", fontSize: "1rem" }}
          subheaderTypographyProps={{ color: "text.secondary" }}
        />
  
        {/* Additional Info */}
        <CardContent>
          {/* Summary */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {episode.summary ? episode.summary.replace(/<[^>]+>/g, "") : "No summary available."}
          </Typography>
  
          {/* Rating */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" color="primary">
              Runtime: {episode.runtime} mins
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ⭐ {episode.rating.average ? `${episode.rating.average}/10` : "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }