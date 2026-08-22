import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";

const calculateFine = (dueDate, actualReturnDate, finePerDay = 5) => {
  const due = new Date(dueDate);
  const actual = new Date(actualReturnDate);
  const timeDiff = actual - due;
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff > 0 ? dayDiff * finePerDay : 0;
};

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const ReturnBook = () => {
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [actualReturnDate, setActualReturnDate] = useState(getToday());
  const [fine, setFine] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchIssuedBook = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/returnBook/${id}`);
      const data = res.data;
      setBookId(data.book_id);
      setBookTitle(data.title);
      setReturnDate(data.return_date.split("T")[0]);
      setError("");
    } catch (err) {
      setError("No issued book found or invalid User ID.");
      setBookId("");
      setBookTitle("");
      setReturnDate("");
    }
  };

  useEffect(() => {
    if (returnDate && actualReturnDate) {
      const fineAmount = calculateFine(returnDate, actualReturnDate);
      setFine(fineAmount);
    }
  }, [actualReturnDate, returnDate]);

  const handleReturn = async () => {
    if (!bookId || !userId || !returnDate || !actualReturnDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/returnBook",
        {
          book_id: bookId,
          user_id: userId,
          return_date: returnDate,
          actual_return_date: actualReturnDate,
          fine,
        }
      );

      setSuccess(response.data.message);
      setError("");
      setBookId("");
      setBookTitle("");
      setUserId("");
      setReturnDate("");
      setActualReturnDate(getToday());
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Return error:", error);
      setError("Failed to return book. Please try again.");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        📘 Return Book
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onBlur={() => fetchIssuedBook(userId)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Book Title"
              variant="outlined"
              fullWidth
              value={bookTitle}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Return Date (Due)"
              variant="outlined"
              fullWidth
              value={returnDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Actual Return Date"
              variant="outlined"
              fullWidth
              type="date"
              value={actualReturnDate}
              onChange={(e) => setActualReturnDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color={fine > 0 ? "error" : "green"}>
              Total Fine: ₹{fine}
            </Typography>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleReturn}
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              Return Book
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ReturnBook;
