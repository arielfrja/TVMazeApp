import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import axios from "axios";
import ShowBasic from "../entities/showBasic";
import { useNavigate } from "react-router";

interface searchProps {
    onSubmit?: ((searchResult: Array<ShowBasic>) => void) | null;
    onLoading?: ((loading: boolean) => void) | null;
}

export default function Search({ onSubmit = null, onLoading = null }: searchProps) {

    const [query, setQuery] = useState('');
const navigate = useNavigate();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default form submission behavior
            performSearch();}
    }




    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        performSearch();
    }

    return (
        <Box>
            <TextField name="search" id="searchTextField" label="Search" variant="standard" onChange={handleChange} onKeyDown={handleKeyDown}/>
            <IconButton onClick={handleSubmit} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
    )

        function performSearch() {
            onLoading?.(true);
            navigate(`/search/${query}`);
            axios.get(`/api/GetShowsShort?name=${query}`).then((response) => {
                if (onSubmit)
                    onSubmit(response.data);
                onLoading?.(false);

            })
                .catch((error) => {
                    console.error(error);
                    onLoading?.(false);
                });
            console.log(query);
        }
}