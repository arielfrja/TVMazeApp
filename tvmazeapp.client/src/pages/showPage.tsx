import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CardMedia, Chip, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EpisodeData from "../entities/EpisodeData";
import { Show } from "../entities/Show";
import EpisodesList from "../components/EpisodesList";

interface showPageProps {
    showProp?: Show;
    showIDProp?: number
}

export default function ShowPage({ showProp = undefined, showIDProp = 0 }: showPageProps) {
    const id = Number(useParams().id) | showIDProp;
    const [Show, setShow] = useState<Show | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [episodes, setEpisodes] = useState<EpisodeData[]>([]);
    useEffect(() => {
        setLoading(true);
        if (showProp !== undefined) {
            setShow(showProp);
            setLoading(false);
        }
        else if (id !== 0) {
            axios.get(`/api/GetShow?id=${id}&includeEpisodes=true`).then((response) => {
                setShow(response.data);
                setEpisodes(response.data._embedded.episodes);
                setLoading(false);
            })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id, showProp, showIDProp]);

    return (
        <>
            {loading && <CircularProgress />}
            {!loading && Show !== null &&
                <>
                    <Paper
                        elevation={3}
                        sx={{
                            maxWidth: 1200,
                            margin: "auto",
                            mt: 3,
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Grid container spacing={3}>
                            {/* Left Side - Image */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <CardMedia
                                    component="img"
                                    alt={Show.name}
                                    height="360"
                                    image={Show.image?.original || ""}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            </Grid>

                            {/* Right Side - Content */}
                            <Grid size={{ xs: 12, md: 9 }}>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {Show.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {Show.summary.replace(/<[^>]+>/g, "") /* Remove HTML tags */}
                                    </Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                        {Show.genres.map((genre) => (
                                            <Chip key={genre} label={genre} color="primary" variant="outlined" />
                                        ))}
                                    </Box>

                                    {/* Show Information */}
                                    <Grid container spacing={1}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Web Channel:</strong> {Show.webChannel?.name || "N/A"} (
                                                {Show.webChannel?.country?.name || "N/A"})
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Status:</strong> {Show.status}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Schedule:</strong> {Show.schedule.days.join(", ")} at{" "}
                                                {Show.schedule.time ? Show.schedule.time.toString() : "N/A"}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Type:</strong> {Show.type}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Language:</strong> {Show.language}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Rating:</strong>{" "}
                                                {Show.rating.average ? `${Show.rating.average}/10` : "N/A"}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="body2">
                                                <strong>Official Site:</strong>{" "}
                                                <a href={Show.officialSite} target="_blank" rel="noopener noreferrer">
                                                    Visit
                                                </a>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />
                        <EpisodesList episodes={episodes} />
                    </Paper>
                </>
            }
        </>
    )
}
