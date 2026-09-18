function NewsSkeleton() {
  return (
    <div className="news-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="news-card skeleton-card" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line small"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsSkeleton;