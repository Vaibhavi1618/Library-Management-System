import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { BookOpen } from "lucide-react";
import axios from "axios";

const IssueBook = () => {
  const todayDate = new Date().toISOString().split("T")[0];

  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [issueDate, setIssueDate] = useState(todayDate);
  const [returnDate, setReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books/available"
        );
        setAvailableBooks(response.data);
      } catch (error) {
        console.error("Error fetching available books:", error);
        setError("Failed to load available books.");
      }
    };

    fetchAvailableBooks();
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!bookId || !userId || !issueDate || !returnDate) {
      setError("All fields are required.");
    } else if (new Date(returnDate) <= new Date(issueDate)) {
      setError("Return date must be greater than the issue date.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/issueBook/issue",
          {
            book_id: bookId,
            user_id: userId,
            issue_date: issueDate,
            return_date: returnDate,
            remarks,
          }
        );
        alert(response.data.message);
      } catch (error) {
        console.error("Issue error:", error);
        setError("Failed to issue the book. Please try again.");
      }
    }
  };

  return (
    <Container
      sx={{
        mt: 6,
        mb: 6,
        backgroundColor: "#f0f4f8",
        borderRadius: "10px",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#3f51b5",
        }}
      >
        <BookOpen size={30} style={{ marginRight: 10 }} /> Issue a Book
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Book ID</InputLabel>
              <Select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                label="Book ID"
              >
                {availableBooks.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title} - {book.author} (ID: {book.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Issue Date"
              variant="outlined"
              fullWidth
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Return Date"
              variant="outlined"
              fullWidth
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              variant="outlined"
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
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
              onClick={handleSubmit}
              sx={{
                borderRadius: "10px",
                fontWeight: "bold",
                padding: "14px",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              Issue Book
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default IssueBook;
