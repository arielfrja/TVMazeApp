import { Alert, Autocomplete, Box, CircularProgress, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Search from "../components/searchComponent";
import { useEffect, useState } from "react";
import ShowBasic from "../entities/showBasic";
import axios from "axios";
import { useNavigate, useOutletContext, useParams } from "react-router";
import ShowsGrid from "../components/ShowsGrid";

interface SearchPageProps {
  defaultQuery?: string | null;
}


/**
 * This is a component that displays the search page.
 * It is used to search for shows and display the results.
 * 
 * @param {SearchPageProps} { defaultQuery = null }  The default query can set the default query for the search.
 */
export default function SearchPage({ defaultQuery = null }: SearchPageProps) {
  const query = useParams().q; // default query arrived from the url
  const [result, setResult] = useState<Array<ShowBasic>>([]); // results returned from the search
  const [loading, setLoading] = useState<boolean>(false); // state to set the loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error message
  const [genres, setGenres] = useState<Array<string>>([]); // genres returned from the search, used for filtering
  const [languages, setLanguages] = useState<Array<string>>([]); // languages returned from the search, used for filtering

  // Filtering states
  const [filteredGenres, setFilteredGenres] = useState<Array<string>>([]); // selected genres to filter
  const [filteredLanguages, setFilteredLanguages] = useState<Array<string>>([]); // selected languages to filter
  const [minRating, setMinRating] = useState<number | null>(null); // min rating to filter
  const [maxRating, setMaxRating] = useState<number | null>(null); // max rating to filter
  const [filteredResults, setFilteredResults] = useState<Array<ShowBasic>>([]); //the results after a filtering

  const navigate = useNavigate();
  // get the function that set the children elements of the AppBar.
  const { setAppBarChildren } = useOutletContext<{ setAppBarChildren: React.Dispatch<React.SetStateAction<React.ReactNode[]>> }>();

  // add the search component to the AppBar
  useEffect(() => {
    setAppBarChildren([<Search onSubmit={handleSearch} onLoading={handleLoading} />]);
    return () => {
      setAppBarChildren([]);
    };
  }, [setAppBarChildren]);

  //handle the search if query got from url
  useEffect(() => {
    if (query) {
      handleLoading(true);
      axios
        .get(`/api/GetShowsShort?name=${query}`)
        .then((response) => {
          handleSearch(response.data);
          handleLoading(false);
        })
        .catch((error) => {
          console.error(error);
          handleLoading(false);
        });
    }
  }, [query]);

  //handle the search if query got from props
  useEffect(() => {
    if (defaultQuery) {
      handleLoading(true);
      axios
        .get(`/api/GetShowsShort?name=${defaultQuery}`)
        .then((response) => {
          handleSearch(response.data);
          handleLoading(false);
        })
        .catch((error) => {
          console.error(error);
          handleLoading(false);
        });
    }
  }, [defaultQuery]);

  // handle filtering, when any of the filtering states change
  useEffect(() => {
    const filtered = result.filter((show) => {
      if (filteredGenres.length > 0 && !filteredGenres.some((genre) => show.genres.includes(genre))) {
        return false;
      }
      if (filteredLanguages.length > 0 && !filteredLanguages.some((language) => show.language === language)) {
        return false;
      }
      if (minRating !== null && show.rating < minRating) {
        return false;
      }
      if (maxRating !== null && show.rating > maxRating) {
        return false;
      }
      return true;
    });
    setFilteredResults(filtered);
  }, [result, filteredGenres, filteredLanguages, minRating, maxRating]);

  
  function handleLoading(isLoading: boolean) {
    setLoading(isLoading);
  }


  //handle the search. and reset all filters  
  function handleSearch(searchResult: Array<ShowBasic>): void {
    if (searchResult.length > 0) {
      setResult(searchResult);
      const languagesSet = new Set(searchResult.map((show) => show.language).sort());
      const genresSet = new Set(searchResult.flatMap((show) => show.genres).sort());
      setLanguages([...languagesSet]);
      setFilteredLanguages([]);
      setGenres([...genresSet]);
      setFilteredGenres([]);
      setMinRating(null);
      setMaxRating(null);
      setErrorMessage(null);
    } else {
      setErrorMessage("No shows found matching the search criteria.");
      setResult([]);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {result.length === 0 && (
        <Typography variant="h4" gutterBottom>
          search Page
        </Typography>
      )}
      {result.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Stack spacing={2}>
            <Autocomplete
              multiple
              options={genres}
              renderInput={(params) => (
                <TextField {...params} label="Genres" placeholder="Select genres" />
              )}
              onChange={(_, value) => setFilteredGenres(value)}
            />
            <Autocomplete
              multiple
              options={languages}
              renderInput={(params) => (
                <TextField {...params} label="Languages" placeholder="Select languages" />
              )}
              onChange={(_, value) => setFilteredLanguages(value)}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Min Rating"
                type="number"
                onChange={(e) => setMinRating(parseInt(e.target.value, 10))}
              />
              <TextField
                label="Max Rating"
                type="number"
                onChange={(e) => setMaxRating(parseInt(e.target.value, 10))}
              />
            </Stack>
          </Stack>
        </Paper>
      )}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : <ShowsGrid shows={filteredResults} onClickShow={(show) => navigate(`/show/${show.id}`)} />
      }
    </Box>
  );
}


