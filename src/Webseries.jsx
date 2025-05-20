import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// We’ll define CSS below

const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Replace with your API key

const genres = [
  // { id: 10759, name: "Action & Adventure" },
  // { id: 35, name: "Comedy" },
  // { id: 18, name: "Drama" },
  // { id: 10765, name: "Sci-Fi & Fantasy" },
  // { id: 80, name: "Crime" },
  // { id: 10751, name: "Family" },
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

const Webseries = (props) => {
  const [seriesByGenre, setSeriesByGenre] = useState({});

  useEffect(() => {
    genres.forEach(async (genre) => {
      try {
        const res = await axios.get(`
https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre.id}&language=hi-IN&sort_by=popularity.desc   `);
        setSeriesByGenre((prev) => ({
          ...prev,
          [genre.name]: res.data.results,
        }));
      } catch (err) {
        console.error(`Error fetching ${genre.name} series`, err);
      }
    });
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  function handleTvShowsImageClick(tvshow) {
    props.onTvShowsImageClick(tvshow)
    
  }

  return (
    <div className="series-page bg-dark text-white p-4 my-5">
      {/* <h1 className="mb-5 text-center">📺 TV Series by Genre</h1> */}
      {Object.keys(seriesByGenre).map((genre) => (
        <div key={genre} className="mb-5">
          <h2 className="mb-3 my-2">{genre}</h2>
          <Slider {...sliderSettings}>
            {seriesByGenre[genre].filter((show) => show.poster_path).map((show) => (
              <div key={show.id} className="p-2 series-card">
                <div className="image-container">
                  <img onClick={()=>handleTvShowsImageClick(show)}
                    src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                    alt={show.name}
                    className="img-fluid rounded series-image"
                  />
                  <div className="series-overlay">
                    <div className="series-title">{show.name}</div>
                    <div className="series-info">
                      {show.first_air_date
                        ? show.first_air_date.split("-")[0]
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default Webseries;
