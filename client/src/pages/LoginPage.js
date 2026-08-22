import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
      }}
    >
      {/* Left Side Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url("https://source.unsplash.com/800x1000/?library,books")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Side Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 450,
            borderRadius: 5,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login to Library
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Please enter your credentials to continue
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    borderColor: "#fff",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    borderColor: "#fff",
                  },
                }}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  background: "#00c9ff",
                  backgroundImage: "linear-gradient(45deg, #00c9ff, #92fe9d)",
                  color: "#000",
                  "&:hover": {
                    backgroundImage: "linear-gradient(45deg, #92fe9d, #00c9ff)",
                  },
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
