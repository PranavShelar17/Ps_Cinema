import React from "react";

export default function Sidebar({ wishlist, onSelectMovie }) {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <h2 style={{ color: "#0d6efd" }}>Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {wishlist.map((movie, index) => (
            <li
              key={movie.id || index}
              style={{
                marginBottom: "15px",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#333",
                transition: "background-color 0.2s",
              }}
              onClick={() => onSelectMovie(movie.id)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "50px", height: "75px", objectFit: "cover", marginRight: "10px", verticalAlign: "middle", borderRadius: "4px" }}
              />
              <span style={{ verticalAlign: "middle" }}>{movie.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in wishlist</p>
      )}
    </div>
  );
}
