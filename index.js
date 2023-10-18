const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const authMiddleware = require("./src/middleware/auth");

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb+srv://giorgi:giorgi@cluster0.p2orfkr.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/", "<div> hello world </div>");
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);


