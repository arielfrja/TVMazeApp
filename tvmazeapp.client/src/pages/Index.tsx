import { useEffect, useRef, useState } from "react";
import ShowBasic from "../entities/showBasic";
import axios from "axios";
import ShowsGrid from "../components/ShowsGrid";
import { useNavigate } from "react-router";
import { Box, CircularProgress, Typography } from "@mui/material";
import Search from "../components/searchComponent";

export default function ShowsIndex() {
    const currentPage = useRef(0);
    const [shows, setShows] = useState<ShowBasic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetching = useRef(false); // Ensures only one fetch at a time
    const navigate = useNavigate();

    useEffect(() => {
        currentPage.current = 0;
        setShows([]);
        fetchShows();
    }, []);
    useEffect(() => {
        const handleInfiniteScroll = () => {



            const scrollableHeight = document.documentElement.scrollHeight;
            const currentScrollPosition = window.innerHeight + window.scrollY;

            // Check if the user is near the bottom of the page
            if (currentScrollPosition >= scrollableHeight - 30 && !isFetching.current) {
                fetchShows();
            }
        };

        window.addEventListener("scroll", handleInfiniteScroll);

        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);


    return (
        <>
        <Box  sx={{ p: 3, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <Typography variant="h4" component="h2" gutterBottom>Shows</Typography>
            <Search onSubmit={(_query) =>{return}} />
                
            </Box>
            <ShowsGrid shows={shows} onClickShow={(show) => navigate(`/show/${show.id}`)} />
            {loading && <CircularProgress />}
        </>
    );


    function fetchShows() {
        if (isFetching.current) return;
        isFetching.current = true; // Mark fetching as in progress
        setLoading(true); // Show loading indicator

        axios
            .get(`/api/shows?limit=10&offset=${currentPage.current * 10}`)
            .then((response) => {
                setShows((prevShows) => [...prevShows, ...response.data]);
                currentPage.current++; // Increment the page
                isFetching.current = false; // Fetching complete
                setLoading(false); // Hide loading indicator
            })
            .catch((error) => {
                console.error(error);
                isFetching.current = false; // Ensure fetching is reset
                setLoading(false);
            });
    }
}