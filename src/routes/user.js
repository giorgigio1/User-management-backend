const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/fetch-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json(users);
  } catch (error) {
    console.error("User data fetch error:", error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

router.post("/block-users", async (req, res) => {
  const ids = req.body;

  try {
    const users = await User.updateMany(
      { _id: { $in: ids } },
      { status: "blocked" }
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("User data fetch error:", error);
    res.status(500).json({ message: "Failed to update user data" });
  }
});

router.post("/unblock-users", async (req, res) => {
  const ids = req.body;
  try {
    const users = await User.updateMany(
      { _id: { $in: ids } },
      { status: "active" }
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("User data fetch error:", error);
    res.status(500).json({ message: "Failed to update user data" });
  }
});

router.post("/delete-users", async (req, res) => {
  const ids = req.body;
  try {
    const users = await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json(users);
  } catch (error) {
    console.error("User data delete error:", error);
    res.status(500).json({ message: "Failed to delete user data" });
  }
});

module.exports = router;
