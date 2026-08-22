import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import axios from "axios";
import { RefreshCw } from "lucide-react"; // Import Lucide icon

const UpdateMembership = () => {
  const [form, setForm] = useState({
    membership_id: "",
    type: "",
    start_date: "",
    end_date: "",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { membership_id, type, start_date, end_date } = form;

    if (!membership_id || !type || !start_date || !end_date) {
      setFeedback({ type: "error", message: "All fields are required." });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/memberships/update/${membership_id}`,
        { type, start_date, end_date }
      );

      setFeedback({
        type: "success",
        message: response.data.message || "Membership updated successfully!",
      });

      setForm({
        membership_id: "",
        type: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to update membership. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "#f4f6f8",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          <RefreshCw size={24} style={{ marginRight: 8 }} /> {/* Lucide icon */}
          Update Membership Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Membership ID"
              name="membership_id"
              value={form.membership_id}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="New Membership Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {feedback.message && (
            <Grid item xs={12}>
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                height: "56px",
                borderRadius: 2,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={handleUpdate}
            >
              Update Membership
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateMembership;
