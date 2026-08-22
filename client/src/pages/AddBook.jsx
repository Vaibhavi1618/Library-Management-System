import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [available, setAvailable] = useState(""); // New state for available pieces
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!title || !author || !category || !serialNo || !available) {
      setError("All fields are required.");
      setSuccess("");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/books/add",
          {
            title,
            author,
            serial_no: serialNo,
            type: category,
            available: available, // Send the available pieces value
          }
        );

        if (response.status === 200) {
          setSuccess("Book added successfully!");
          setError("");
          setTitle("");
          setAuthor("");
          setCategory("");
          setSerialNo("");
          setAvailable(""); // Clear the available pieces field
        }
      } catch (err) {
        console.error("Error while adding book:", err);
        setError("Error adding book. Please try again.");
        setSuccess("");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#f9fafc",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", textAlign: "center", mb: 3 }}
        >
          📚 Add New Book
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Serial Number"
                variant="outlined"
                fullWidth
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Available Pieces"
                variant="outlined"
                fullWidth
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                sx={{ mb: 2 }}
                type="number" // Ensure it accepts only numbers
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Typography color="primary">{success}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  height: "56px",
                  "&:hover": { bgcolor: "#1565c0" },
                  borderRadius: 2,
                }}
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Container>
  );
};

export default AddBook;
