const axios = require("axios");
const User = require("../models/User");

const getPersonalizedNews = async (req, res) => {
  try {
    // 1. Find logged-in user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2. Get user's personalization data
    const interests = user.interests || [];

    if (interests.length === 0) {
      return res.status(400).json({
        message: "Please select your interests first"
      });
    }

    // 3. Build search query from profession + interests
    const keywords = [
      ...(user.profession ? [user.profession] : []),
      ...interests
    ];

    const query = keywords.join(" OR ");

    // 4. Call GNews API
    const response = await axios.get(
      "https://gnews.io/api/v4/search",
      {
        params: {
          q: query,
          lang: "en",
          max: 10,
          apikey: process.env.NEWS_API_KEY
        }
      }
    );

    // 5. Return useful fields to frontend
    const articles = response.data.articles.map((article, index) => ({
      id: index + 1,
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source?.name
    }));

    res.json({
      interests,
      profession: user.profession,
      articles
    });
  } catch (error) {
    console.error(
      "News API error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to fetch personalized news"
    });
  }
};

module.exports = {
  getPersonalizedNews
};