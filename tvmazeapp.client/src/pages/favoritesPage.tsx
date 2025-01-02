import { useEffect, useState } from "react";
import ShowBasic from "../entities/showBasic";
import { getFavorites } from "../managers/favoritesManager";
import axios from "axios";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import qs from 'qs';
import ShowsGrid from "../components/ShowsGrid";
import { useNavigate } from "react-router";
import { Show } from "../entities/Show";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showsResults, setShowResults] = useState<ShowBasic[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        if (favorites.length > 0) {
            axios.get(`/api/BulkSGetShows`, {
                params: {
                    showsIds: favorites, // favorites, // Axios automatically formats this as showsIds=1&showsIds=2&showsIds=3
                    includeEpisodes: false,
                    includeCast: false,
                    includeCrew: false,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params, { arrayFormat: "repeat" }); // axios format by default is array[]=1&array[]=2, which not parsed well for me in .NET
                },
                headers: { 'Accept': 'application/json' }
            }).then(
                (response) => {
                    setShowResults(response.data)
                    setLoading(false);
                    setError(null);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                    setError("Failed to fetch shows data.");
                });
        }
        else {
            setError("No favorites found");
            setShowResults([]);
            setLoading(false);
        }
    }, [favorites]);

    useEffect(() => {
        setFavorites(getFavorites());
        console.log('FavoritesPage mounted');
        return () => {
            console.log('FavoritesPage unmounted');
        }
    }, []);
    return (
        <>
            {error &&
                <Snackbar
                    open={Boolean(error)}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            {loading && <CircularProgress sx={{ m: "auto" }} />}
            {!loading
                && <ShowsGrid shows={showsResults} onClickShow={(show: ShowBasic | Show) => navigate(`/show/${show.id}`)} />
            }

        </>
    )
}