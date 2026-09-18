const User = require("../models/User");

const updatePreferences = async (req, res) => {
  try {
    const { profession, interests } = req.body;

    if (!profession) {
      return res.status(400).json({
        message: "Profession is required"
      });
    }

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        message: "Interests must be an array"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        profession,
        interests,
        onboardingCompleted: true
      },
      {
        new: true
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Preferences saved successfully",
      user
    });
  } catch (error) {
    console.error("Update preferences error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "profession interests onboardingCompleted"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      profession: user.profession,
      interests: user.interests,
      onboardingCompleted: user.onboardingCompleted
    });
  } catch (error) {
    console.error("Get preferences error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  updatePreferences,
  getPreferences
};