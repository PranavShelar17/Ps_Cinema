import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function BollywoodMoviesSlider(props) {
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Your TMDB API key

  useEffect(() => {
    async function fetchBollywoodMovies() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=IN&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=100`
        );
        setBollywoodMovies(response.data.results);
      } catch (err) {
        console.error("Failed to fetch Bollywood movies", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBollywoodMovies();
  }, []);

  function handleBollywoodClick(movie) {
    if (props.onBollywoodImageClick) props.onBollywoodImageClick(movie);
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
        <RingLoader size={50} color="gold" />
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
        Top Rated Bollywood Movies
      </h2>
      <Slider {...settings}>
        {bollywoodMovies.map((movie) => (
          <div key={movie.id} className="p-2 m-0 movie-card">
            <div className="image-container">
              <img
                onClick={() => handleBollywoodClick(movie)}
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
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import { RingLoader } from "react-spinners";

// export default function BollywoodMoviesSlider(props) {
//   const [bollywoodMovies, setBollywoodMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

//   useEffect(() => {
//     async function fetchBollywoodMovies() {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi&region=IN&sort_by=vote_average.desc&vote_count.gte=100`
//         );

//         const movies = res.data.results;

//         const moviesWithRuntime = await Promise.all(
//           movies.map(async (movie) => {
//             try {
//               const detailRes = await axios.get(
//                 `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
//               );
//               return {
//                 ...movie,
//                 runtime: detailRes.data.runtime,
//               };
//             } catch (err) {
//               console.warn("Error fetching movie runtime", err);
//               return { ...movie, runtime: null };
//             }
//           })
//         );

//         setBollywoodMovies(moviesWithRuntime);
//       } catch (err) {
//         console.error("Failed to fetch Bollywood movies", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBollywoodMovies();
//   }, []);

//   function handleMovieClick(movie) {
//     if (props.onMovieClick) props.onMovieClick(movie);
//   }

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 4 } },
//       { breakpoint: 768, settings: { slidesToShow: 3 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-5 d-flex justify-content-center">
//         <RingLoader size={50} color="purple" />
//       </div>
//     );
//   }

//   return (
//     <div className="my-lg-0 p-4">
//       <h2
//         className="text-2xl text-white my-lg-1 my-5"
//         style={{
//           fontSize: "36px",
//           fontWeight: 700,
//           letterSpacing: "0.02em",
//           lineHeight: "41px",
//           paddingTop: "24px",
//           paddingBottom: "24px",
//         }}
//       >
//         🎬 Top Rated Bollywood Movies
//       </h2>
//       <Slider {...settings}>
//         {bollywoodMovies.map((movie) => {
//           const year = movie.release_date
//             ? new Date(movie.release_date).getFullYear()
//             : "N/A";
//           const time = movie.runtime ? `${movie.runtime} min` : "Unknown";

//           return (
//             <div key={movie.id} className="p-2 m-0 movie-card">
//               <div className="image-container">
//                 <img
//                   onClick={() => handleMovieClick(movie)}
//                   src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
//                   alt={movie.title}
//                   className="img-fluid rounded movie-image"
//                 />
//                 <div className="movie-overlay">
//                   <div className="movie-title">{movie.title}</div>
//                   <div className="movie-info">
//                     <small>{year} &middot; {time}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// }
