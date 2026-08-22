const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const books = require("./routes/books");
const membershipRoutes = require("./routes/membership");
const userRoutes = require("./routes/user");
const issueBookRouter = require("./routes/issueBook");
const finesRoutes = require("./routes/fines");
const returnBookRoutes = require("./routes/returnBook");
const loginRoute = require("./routes/login");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/books", books);
app.use("/api/users", userRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/userlogin", loginRoute);
app.use("/api/issueBook", issueBookRouter);
app.use("/api/fines", finesRoutes);
app.use("/api/returnBook", returnBookRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
