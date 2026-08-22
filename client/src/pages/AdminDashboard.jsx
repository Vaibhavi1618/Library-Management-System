import React from "react";
import { Button, Container, Typography, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 4,
    textAlign: "center",
    borderRadius: 4,
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#fff",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  };

  const buttonStyle = {
    mt: 2,
    backgroundColor: "#00c6ff",
    backgroundImage: "linear-gradient(45deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #0072ff, #00c6ff)",
    },
  };

  const options = [
    { title: "Add Book", path: "/add-book" },
    { title: "User Management", path: "/user-management" },
    { title: "Add Membership", path: "/add-membership" },
    { title: "Update Membership", path: "/update-membership" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #141e30, #243b55)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            mb: 6,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          🛠️ Admin Dashboard
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {options.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={cardStyle}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ minHeight: "60px" }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={() => navigate(item.path)}
                >
                  Go
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
