import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import NewsSkeleton from "../components/NewsSkeleton";

// Personalized News Home — shows live articles filtered by the
// logged-in user's interests/profession (fetched from the backend).
// Clicking "▶ Play News" opens the article detail view.
function News() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news/personalized");
        setNews(response.data.articles || []);
        setInterests(response.data.interests || []);
      } catch (err) {
        // Invalid / expired token → back to login.
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        setError("Unable to load personalized news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePlay = (article) => {
    // Articles are fetched live (not stored in MongoDB), so we stash
    // them in sessionStorage for the detail page to read by id.
    sessionStorage.setItem("news", JSON.stringify(news));
    navigate(`/news/${article.id}`);
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "";

  return (
    <main className="news-page">
      <header className="news-header">
        <div>
          <p className="eyebrow">YOUR FEED</p>
          <h1>Personalized News</h1>
          {interests.length > 0 ? (
            <p>Based on: {interests.join(", ")}</p>
          ) : (
            <p>News selected based on your interests.</p>
          )}
        </div>
        <div className="header-actions">
          <button
            className="edit-button"
            onClick={() => navigate("/onboarding")}
          >
            Edit Interests
          </button>
          <button className="edit-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {loading ? (
        <NewsSkeleton />
      ) : error ? (
        <div className="empty-state">
          <h2>{error}</h2>
          <button
            className="edit-button"
            onClick={() => navigate("/onboarding")}
          >
            Edit Interests
          </button>
        </div>
      ) : news.length === 0 ? (
        <div className="empty-state">
          <h2>No news available</h2>
          <p>
            Try selecting some interests to personalize your feed.
          </p>
          <button
            className="edit-button"
            onClick={() => navigate("/onboarding")}
          >
            Edit Interests
          </button>
        </div>
      ) : (
        <section className="news-grid">
          {news.map((article) => (
            <article className="news-card" key={article.id}>
              <div className="news-image">
                {article.image ? (
                  <img src={article.image} alt={article.title} />
                ) : (
                  <div className="news-image-placeholder">News</div>
                )}
              </div>

              <div className="news-content">
                <div className="news-meta">
                  <span className="news-source">
                    {article.source || "News"}
                  </span>
                  {article.publishedAt && (
                    <span className="news-date">
                      {formatDate(article.publishedAt)}
                    </span>
                  )}
                </div>

                <h2>{article.title}</h2>

                <p className="description">{article.description}</p>

                <button
                  className="play-button"
                  onClick={() => handlePlay(article)}
                >
                  ▶ Play News
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default News;