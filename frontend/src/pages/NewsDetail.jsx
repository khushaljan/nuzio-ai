import { useNavigate, useParams } from "react-router-dom";

// Article detail — reads the selected article from sessionStorage
// (the News page stores the live-fetched list there on Play click).
function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  let article = null;

  try {
    const stored = JSON.parse(
      sessionStorage.getItem("news") || "[]"
    );
    article = stored.find((a) => String(a.id) === String(id));
  } catch {
    article = null;
  }

  if (!article) {
    return (
      <main className="page">
        <div className="empty-state">
          <h2>Article not found</h2>
          <button
            className="edit-button"
            onClick={() => navigate("/news")}
          >
            Back to News
          </button>
        </div>
      </main>
    );
  }

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : "";

  return (
    <main className="news-page detail-page">
      <button
        className="back-button"
        onClick={() => navigate("/news")}
      >
        ← Back to News
      </button>

      <article className="detail-card">
        <div className="detail-image-wrap">
          {article.image ? (
            <img
              className="detail-image"
              src={article.image}
              alt={article.title}
            />
          ) : (
            <div className="news-image-placeholder">News</div>
          )}
        </div>

        <div className="detail-body">
          <div className="news-meta">
            <span className="news-source">
              {article.source || "News"}
            </span>
            {date && <span className="news-date">{date}</span>}
          </div>

          <h1 className="detail-title">{article.title}</h1>

          <p className="description">{article.description}</p>

          {article.content && (
            <p className="description">{article.content}</p>
          )}

          {article.url && article.url !== "#" && (
            <a
              className="read-more"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Article ↗
            </a>
          )}
        </div>
      </article>
    </main>
  );
}

export default NewsDetail;