
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import ShowBasic from '../entities/showBasic';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from 'react';
import FavoritesManager, { AddToFavorites, RemoveFromFavorites } from '../managers/favoritesManager';
interface showCardProps {
    showResult: ShowBasic;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ShowCard({ showResult, onClick }: showCardProps) {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(FavoritesManager.isFavorite(showResult.id));
    }, [showResult.id]);
    const handleAddOrRemoveToFavorites = (isAdd: boolean) => {
        if (isAdd) {
            AddToFavorites(showResult.id);
            setIsFavorite(true);
        } else {
            RemoveFromFavorites(showResult.id);
            setIsFavorite(false);
        }
    }
    return (
        <Card
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if (onClick) onClick(e);
            }}
            sx={{
                maxWidth: 345,
                borderRadius: 4,
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                },
                cursor: onClick ? "pointer" : "default"
            }}
        >
            <CardHeader
                title={showResult.name}
                titleTypographyProps={{
                    variant: "h6",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
                sx={{
                    paddingBottom: 0,
                    paddingTop: 2,
                }}
            />
            {showResult.image && (
                <CardMedia
                    component="img"
                    image={showResult.image.medium || showResult.image.original}
                    alt={showResult.name}
                    sx={{
                        maxHeight: 200,
                        objectFit: "cover",
                        margin: "0 auto",
                        borderRadius: 2,
                    }}
                />
            )}
            <CardContent
                sx={{
                    padding: 2,
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Genres:</strong> {showResult.genres.join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Rating:</strong> {showResult.rating || "N/A"}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                        }}
                    >
                        <strong>Summary:</strong> {showResult.summary.replace(/<[^>]+>/g, "")}
                    </Typography>
                </Stack>
            </CardContent>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingX: 2,
                    paddingBottom: 2,
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                >
                    Language: {showResult.language}
                </Typography>
                <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleAddOrRemoveToFavorites(!isFavorite);
                    }}
                >
                    {isFavorite ? (
                        <FavoriteRoundedIcon color="error" />
                    ) : (
                        <FavoriteBorderRoundedIcon color="primary" />
                    )}
                </IconButton>
            </Box>
        </Card>
    );


}
