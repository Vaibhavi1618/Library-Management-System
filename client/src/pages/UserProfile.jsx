import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId"); // get stored user ID
      if (!userId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/users/profile/${userId}`
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        👤 User Profile
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Username: {profile.username || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">User ID: {profile.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Role: {profile.role}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default UserProfile;
