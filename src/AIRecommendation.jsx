import React, { useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

const moodPills = [
  { label: "🚀 Sci-Fi Adventure", genres: [878, 12], keywords: "space" },
  { label: "👻 Spooky Night", genres: [27, 53], keywords: "horror" },
  { label: "😂 Laugh Out Loud", genres: [35], keywords: "comedy" },
  { label: "💖 Romantic Date", genres: [10749, 35], keywords: "romance" },
  { label: "🔥 Action Packed", genres: [28, 53], keywords: "action" },
  { label: "🧠 Mind Bending", genres: [9648, 878, 53], keywords: "mystery" },
  { label: "🪄 Kids & Family", genres: [10751, 16], keywords: "family" },
];

export default function AIRecommendation({ onImageClick }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [activeMood, setActiveMood] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function getRecommendations(promptText, moodObj = null) {
    setLoading(true);
    setErrorMsg("");
    setRecommendations([]);

    try {
      // Step 1: Check if there's a movie title pattern (e.g. "like Inception", "similar to Avatar")
      let movieTitle = "";
      if (moodObj) {
        setActiveMood(moodObj.label);
      } else {
        setActiveMood("");
        // Simple regex to look for "like [title]", "similar to [title]" or direct search if it's short
        const cleanPrompt = promptText.trim();
        const match = cleanPrompt.match(/(?:like|similar to|similar\s+to|watch|about)\s+([^,.]+)/i);
        movieTitle = match ? match[1].trim() : cleanPrompt;
      }

      // If we are looking for a movie reference:
      if (movieTitle && !moodObj) {
        // Search TMDB for this movie
        const searchRes = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`
        );

        if (searchRes.data.results && searchRes.data.results.length > 0) {
          const matchedMovie = searchRes.data.results[0];
          // Fetch recommendations for this movie
          const recRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${matchedMovie.id}/recommendations?api_key=${apiKey}`
          );
          
          if (recRes.data.results && recRes.data.results.length > 0) {
            setRecommendations(recRes.data.results);
            setLoading(false);
            return;
          }
        }
      }

      // Step 2: Fallback to Discover by genres
      let genreIds = [];
      if (moodObj) {
        genreIds = moodObj.genres;
      } else {
        // Keyword mapping fallback
        const promptLower = promptText.toLowerCase();
        moodPills.forEach((pill) => {
          if (promptLower.includes(pill.keywords)) {
            genreIds = [...genreIds, ...pill.genres];
          }
        });
        // Default to a mix if nothing matches
        if (genreIds.length === 0) {
          genreIds = [28, 12, 35, 18]; // Action, Adventure, Comedy, Drama
        }
      }

      const discoverRes = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIds.join(",")}&sort_by=popularity.desc`
      );
      setRecommendations(discoverRes.data.results || []);

    } catch (err) {
      console.error("AI recommendation search failed:", err);
      setErrorMsg("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handlePillClick(mood) {
    setInputText("");
    getRecommendations("", mood);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputText.trim()) return;
    getRecommendations(inputText);
  }

  return (
    <>
      <div className="my-lg-0 my-5 p-lg-0 p-4">f</div>
      <div
        className="p-4 p-md-5 my-md-5 text-white text-center"
        style={{
          background: "linear-gradient(to right, #24243e, #300030, #0f0c1b)",
          minHeight: "95vh",
        }}
      >
        <div className="container" style={{ maxWidth: "850px" }}>
          <h1 className="display-4 mb-3 font-weight-bold" style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
            🤖 AI Movie Assistant
          </h1>
          <p className="lead text-white-50 mb-5">
            Tell the AI assistant what you're in the mood to watch, or click one of the quick mood tags to get curated recommendations instantly!
          </p>

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group input-group-lg shadow-lg" style={{ borderRadius: "40px", overflow: "hidden" }}>
              <input
                type="text"
                className="form-control border-0 px-4 bg-dark text-white"
                style={{ height: "60px", fontSize: "1.1rem" }}
                placeholder="Try: 'A mind-bending sci-fi like Inception' or 'A hilarious animated family movie'..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-warning px-5"
                style={{ fontWeight: "700", fontSize: "1.1rem" }}
                disabled={loading}
              >
                Find Movies
              </button>
            </div>
          </form>

          {/* Mood Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {moodPills.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handlePillClick(mood)}
                className={`btn border-0 py-2 px-3 rounded-pill text-white transition shadow-sm ${
                  activeMood === mood.label
                    ? "btn-warning text-dark font-weight-bold"
                    : "bg-secondary bg-opacity-25 hover-bg-opacity-50"
                }`}
                style={{ transition: "all 0.2s" }}
              >
                {mood.label}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="alert alert-danger rounded-4 my-4" role="alert">
              {errorMsg}
            </div>
          )}

          {loading && (
            <div className="my-5 d-flex justify-content-center align-items-center">
              <RingLoader size={60} color={"#f5a623"} />
            </div>
          )}

          {/* Recommendations Grid */}
          {!loading && recommendations.length > 0 && (
            <div className="mt-5 text-start">
              <h3 className="mb-4 text-warning border-bottom border-secondary pb-2" style={{ fontWeight: "600" }}>
                🎯 Recommendations for You
              </h3>
              <div className="row g-4">
                {recommendations
                  .filter((m) => m.poster_path)
                  .slice(0, 12)
                  .map((movie) => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 movie-card">
                      <div className="image-container" style={{ cursor: "pointer" }} onClick={() => onImageClick(movie)}>
                        <img
                          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                          alt={movie.title}
                          className="img-fluid rounded movie-image"
                        />
                        <div className="movie-overlay">
                          <div className="movie-title">{movie.title}</div>
                          {movie.vote_average > 0 && (
                            <div className="movie-info text-warning">
                              ⭐ {movie.vote_average.toFixed(1)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {!loading && recommendations.length === 0 && !errorMsg && activeMood && (
            <div className="my-5 text-muted">
              <h4>No movies found for this filter. Try another tag!</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
