const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

async function login(user) {
  user.lastLogin = new Date();

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.username,
      status: user.status,
    },
    "your_secret_key",
    {
      expiresIn: "1h",
    }
  );

  user.save();
  return {
    token,
    userId: user._id,
  };
}

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      status: "active",
    });

    await newUser.save();

    const result = await login(newUser);
    res.status(200).json({
      token: result.token,
      userId: result.userId,
    });
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const result = await login(user);

    res.status(200).json({
      token: result.token,
      userId: result.userId,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
