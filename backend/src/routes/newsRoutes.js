const express = require("express");

const {
  getPersonalizedNews
} = require("../controllers/newsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/personalized", protect, getPersonalizedNews);

module.exports = router;