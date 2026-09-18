const express = require("express");

const {
  updatePreferences,
  getPreferences
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/preferences", protect, updatePreferences);

router.get("/preferences", protect, getPreferences);

module.exports = router;