import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function TrendingMoviesSlider(props) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [flagLoader, setFlagLoader] = useState(true);

  const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Replace with your TMDB API key

  useEffect(() => {
    async function fetchTrending() {
      setFlagLoader(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        setTrendingMovies(res.data.results);
        console.log(res.data.results);
      } catch (err) {
        console.error("Failed to fetch trending movies", err);
      } finally {
        setFlagLoader(false);
      }
    }

    fetchTrending();
  }, []);
  function handleTrendingImageClick(movie) {
    props.onTrendingImageClick(movie);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2} },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (flagLoader) {
    return (
      <div className="  text-center my-5 my-lg-2 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} className="" />
      </div>
    );
  }

  return (
     <>
    <div className=" my-lg-0 my-5 p-lg-0 ">f</div>
    <div className="my-lg-0 p-4 p-lg-4      mt-lg-0 mt-5 ">
      <h2
        className="text-2xl   text-white my-lg-5 mb-lg-0 my-5"
        style={{
          fontSize: "36px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: "41px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        🔥 Trending Movies This Week
      </h2>
      <Slider {...settings}>
        {trendingMovies.map((movie) => (
          // <div key={movie.id} className="p-0 m-0 myb ">
           
          //     <img
          //       onClick={() => handleTrendingImageClick(movie)}
          //       src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
          //       alt={movie.title}
          //       className="  rounded"
          //     />
          //     <h3
          //       className="text-white"
          //       style={{
          //         "--expanded-max-height": "unset",
          //         color: "white",
          //         fontSize: "18px",
          //         fontWeight: 500,
          //         letterSpacing: "0.02em",
          //         lineHeight: "28px",
                 
          //         borderRadius: "12px",
          //         maxWidth: "600px",
          //         margin: "20px auto",
          //       }}
          //     >
          //       {movie.title}
          //     </h3>
            
          // </div>
          <div key={movie.id} className="p-2 m-0 movie-card">
  <div className="image-container">
    <img
      onClick={() => handleTrendingImageClick(movie)}
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
    </>
  );
}
