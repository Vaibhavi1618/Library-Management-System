import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const AddMembership = () => {
  const [form, setForm] = useState({
    user_id: "",
    type: "",
    start_date: "",
    end_date: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.user_id || !form.type || !form.start_date || !form.end_date) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/memberships/add",
        form
      );
      setSuccess(res.data.message || "Membership added successfully!");
      setError("");
      setForm({ user_id: "", type: "", start_date: "", end_date: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error adding membership.");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 4, backgroundColor: "#f9fafc" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          📋 Add Membership
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User ID"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Membership Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
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
              fullWidth
              sx={{
                bgcolor: "#1976d2",
                color: "#fff",
                height: "56px",
                "&:hover": { bgcolor: "#1565c0" },
                borderRadius: 2,
              }}
              onClick={handleSubmit}
            >
              Add Membership
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddMembership;
