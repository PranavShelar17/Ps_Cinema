import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function HorrorMoviesSlider(props) {
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [flagLoader, setFlagLoader] = useState(true);

  const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Replace with your TMDB API key

  useEffect(() => {
    async function fetchHorrorMovies() {
      setFlagLoader(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`
        );
        setHorrorMovies(res.data.results);
        console.log(res.data.results);
      } catch (err) {
        console.error("Failed to fetch horror movies", err);
      } finally {
        setFlagLoader(false);
      }
    }

    fetchHorrorMovies();
  }, []);

  function handleHorrorImageClick(movie) {
    props.onHorrorImageClick(movie);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (flagLoader) {
    return (
      <div className="text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color={"crimson"} />
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
        👻 Popular Horror Movies
      </h2>
      <Slider {...settings}>
        {horrorMovies.map((movie) => (
          <div key={movie.id} className="p-2 m-0 movie-card">
            <div className="image-container">
              <img
                onClick={() => handleHorrorImageClick(movie)}
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
