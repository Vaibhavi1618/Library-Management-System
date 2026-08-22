import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { CreditCard } from "lucide-react";
import axios from "axios";

const FinePay = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handlePayment = async () => {
    if (!userId || !amount || !reason) {
      setFeedback({ type: "error", message: "All fields are required." });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/fines/pay", {
        user_id: userId,
        amount,
        reason,
      });
      setFeedback({ type: "success", message: response.data.message });

      // Clear form after success
      setUserId("");
      setAmount("");
      setReason("");
    } catch (err) {
      console.error("Payment error:", err);
      setFeedback({
        type: "error",
        message: "Failed to process payment. Try again later.",
      });
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
        <CreditCard size={30} style={{ marginRight: 10 }} />
        Pay Fine
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
          <Grid item xs={12}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount to Pay"
              type="number"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason for Fine"
              variant="outlined"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{ backgroundColor: "#fafafa", borderRadius: "5px" }}
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
              fullWidth
              size="large"
              onClick={handlePayment}
              sx={{
                borderRadius: "10px",
                fontWeight: "bold",
                padding: "14px",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FinePay;
