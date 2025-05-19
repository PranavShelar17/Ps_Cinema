import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function WarMoviesSlider(props) {
  const [warMovies, setWarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Your TMDB API key

  useEffect(() => {
    async function fetchWarMovies() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10752&sort_by=popularity.desc&vote_count.gte=100`
        );
        setWarMovies(res.data.results);
      } catch (err) {
        console.error("Failed to fetch war movies", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWarMovies();
  }, []);

  function handleMovieClick(movie) {
    if (props.onMovieClick) props.onMovieClick(movie);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color="orange" />
      </div>
    );
  }

  return (
    <div className="my-lg-0 p-4">
      <h2
        className="text-2xl text-white my-lg-1 my-5"
        style={{
          fontSize: "36px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: "41px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        🪖 Military & War Movies
      </h2>
      <Slider {...settings}>
        {warMovies.map((movie) => (
          <div key={movie.id} className="p-2 m-0 movie-card">
            <div className="image-container">
              <img
                onClick={() => handleMovieClick(movie)}
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded movie-image"
              />
              <div className="movie-overlay">
                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

