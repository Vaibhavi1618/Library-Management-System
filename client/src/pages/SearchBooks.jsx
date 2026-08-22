import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { Search, BookOpenCheck } from "lucide-react";
import debounce from "lodash.debounce";

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books/available");
        const data = await res.json();
        setAvailableBooks(data);
      } catch (err) {
        console.error("Failed to fetch available books:", err);
      }
    };
    fetchAvailableBooks();
  }, []);

  const fetchSuggestions = debounce(async (query) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/books/search?keyword=${query}`
      );
      const data = await res.json();
      setSearchResults(data);
      setError("");
    } catch (err) {
      setError("Error fetching search results.");
      console.error(err);
    }
  }, 300);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a book title or author name.");
      return;
    }
    fetchSuggestions(searchQuery);
  };

  const cardStyle = {
    width: "100px",
    maxWidth: "300px",
    height: "160px",
    mx: "auto",
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        <Search size={30} style={{ verticalAlign: "middle", marginRight: 8 }} />
        Search & Explore Books
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Search by Title or Author"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              <Search style={{ marginRight: 8 }} />
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {searchQuery && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🔎 Search Results
          </Typography>
          <Grid container spacing={3}>
            {searchResults.length > 0 ? (
              searchResults.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={4}
                    sx={{ ...cardStyle, backgroundColor: "#f9f9f9" }}
                  >
                    <Typography variant="h6" noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      by {book.author}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No books found.</Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        <BookOpenCheck size={22} style={{ marginRight: 6 }} />
        Available Books
      </Typography>

      <Grid container spacing={3}>
        {availableBooks.length > 0 ? (
          availableBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  ...cardStyle,
                  borderLeft: "6px solid #4caf50",
                  backgroundColor: "#f5fff7",
                }}
              >
                <Typography variant="h6" noWrap>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  by {book.author}
                </Typography>
                {/* Display the number of available pieces */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  Available Pieces: {book.available}{" "}
                  {/* Add available pieces */}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No available books at the moment.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SearchBooks;
