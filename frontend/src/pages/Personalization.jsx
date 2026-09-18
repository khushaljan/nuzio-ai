import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// Interest categories the user can pick from (saved as preferences).
const CATEGORIES = [
  "Artificial Intelligence",
  "Technology",
  "Sports",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Startups",
  "Finance",
  "Education",
];

// Phase 6/8 — Personalization screen (interest selection).
function Personalization() {
  const navigate = useNavigate();

  const [profession, setProfession] = useState("");
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (selected.length === 0) {
      setError("Please select at least one interest.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.put("/user/preferences", {
        profession,
        interests: selected,
      });

      navigate("/news");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save preferences"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <h1>Personalize Your News</h1>
        <p>Select your interests so we can tailor your feed.</p>

        <form onSubmit={handleSave}>
          <div>
            <label>Profession</label>
            <input
              type="text"
              placeholder="e.g. Software Developer"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Interests</label>
            <div className="chips">
              {CATEGORIES.map((category) => {
                const active = selected.includes(category);
                return (
                  <button
                    type="button"
                    key={category}
                    className={`chip${active ? " chip-active" : ""}`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {selected.length > 0 && (
            <p className="selected-count">
              Selected: {selected.join(", ")}
            </p>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Personalization;