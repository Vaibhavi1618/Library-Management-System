import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Lock, Search, Settings2, Trash2, User } from "lucide-react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const addUser = async () => {
    if (!username || !password || !role) {
      return alert("All fields are required.");
    }
    try {
      await axios.post("http://localhost:5000/api/users/add", {
        username,
        password,
        role,
      });
      setUsername("");
      setPassword("");
      setRole("");
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const deleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${username}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#f0f4f8",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            mb: 3,
          }}
        >
          🔐 User Management Dashboard
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
            ➕ Add New User
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="admin or user"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Settings2 />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton
                onClick={addUser}
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  height: "56px",
                  width: "80px",
                  "&:hover": { bgcolor: "#1565c0" },
                  borderRadius: 2,
                }}
              >
                <Search size={20} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
        >
          👥 Existing Users
        </Typography>

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <List>
            {users.length === 0 ? (
              <Typography variant="body1" sx={{ pl: 2 }}>
                No users found.
              </Typography>
            ) : (
              users.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => deleteUser(user.username)}
                        edge="end"
                        color="error"
                      >
                        <Trash2 />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={user.username}
                      secondary={`Role: ${user.role}`}
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Paper>
    </Container>
  );
};

export default UserManagement;
