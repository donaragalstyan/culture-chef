const express = require("express");
const router = express.Router();
const History = require("../models/historyModels");
const authenticateToken = require("../middlewares/authenticateUser");


router.post("/history", authenticateToken, async (req, res) => {
  try {
    const { action, recipeId, query } = req.body;
    const userId = req.user.id;

    const history = new History({ userId, action, recipeId, query });
    await history.save();
    res.status(201).json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user history
router.get("/history", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await History.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
