const testRoutes = require("./routes/testRoutes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.json({ message: "MyUniLife backend is running 🚀" });
});

module.exports = app;
