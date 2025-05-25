// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// // We’ll define CSS below

// const apiKey = "685e2f09bfed147ad18e97893e8a01ff"; // Replace with your API key

// const genres = [
//   // { id: 10759, name: "Action & Adventure" },
//   // { id: 35, name: "Comedy" },
//   // { id: 18, name: "Drama" },
//   // { id: 10765, name: "Sci-Fi & Fantasy" },
//   // { id: 80, name: "Crime" },
//   // { id: 10751, name: "Family" },
//   { id: 10759, name: "Action & Adventure" },
//   { id: 16, name: "Animation" },
//   { id: 35, name: "Comedy" },
//   { id: 80, name: "Crime" },
//   { id: 99, name: "Documentary" },
//   { id: 18, name: "Drama" },
//   { id: 10751, name: "Family" },
//   { id: 10762, name: "Kids" },
//   { id: 9648, name: "Mystery" },
//   { id: 10763, name: "News" },
//   { id: 10764, name: "Reality" },
//   { id: 10765, name: "Sci-Fi & Fantasy" },
//   { id: 10766, name: "Soap" },
//   { id: 10767, name: "Talk" },
//   { id: 10768, name: "War & Politics" },
//   { id: 37, name: "Western" },
// ];

// const Webseries = (props) => {
//   const [seriesByGenre, setSeriesByGenre] = useState({});

//   useEffect(() => {
//     genres.forEach(async (genre) => {
//       try {
//         const res = await axios.get(`
// https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre.id}&language=hi-IN`);
//         setSeriesByGenre((prev) => ({
//           ...prev,
//           [genre.name]: res.data.results,
//         }));

//       } catch (err) {
//         console.error(`Error fetching ${genre.name} series`, err);
//       }
//     });
//   }, []);

//   const sliderSettings = {
//     dots: false,
//     infinite: false,
//     speed: 600,
//     slidesToShow: 8,
//     slidesToScroll: 2,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 4 } },
//       { breakpoint: 768, settings: { slidesToShow: 3 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };
//   function handleTvShowsImageClick(show,media_type) {
//   //  console.log(show,media_type);

//     props.onTvShowsImageClick(show,media_type);
//   }

//   return (
//     <div className="series-page bg-dark text-white p-4 my-5">
//       {/* <h1 className="mb-5 text-center">📺 TV Series by Genre</h1> */}
//       {Object.keys(seriesByGenre).map((genre) => (
//         <div key={genre} className="mb-5">
//           <h2 className="mb-3 my-2">{genre}</h2>
//           <Slider {...sliderSettings}>
//             {seriesByGenre[genre]
//               .filter((show) => show.poster_path)
//               .map((show) => (
//                 <div key={show.id} className="p-2 series-card">
//                   <div className="image-container">
//                     <img
//                       onClick={() => handleTvShowsImageClick(show,"tv")}
//                       src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
//                       alt={show.name}
//                       className="img-fluid rounded series-image"
//                     />
//                     <div className="series-overlay">
//                       <div className="series-title">{show.name}</div>
//                       <div className="series-info">
//                         {show.first_air_date
//                           ? show.first_air_date.split("-")[0]
//                           : "N/A"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </Slider>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Webseries;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

const genres = [
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

export default function Webseries(props) {
  const [seriesByGenre, setSeriesByGenre] = useState({});

  useEffect(() => {
    genres.forEach(async ({ id, name }) => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id}&language=hi-IN`
        );
        setSeriesByGenre((prev) => ({ ...prev, [name]: res.data.results }));
        //console.log(seriesByGenre);
      } catch (err) {
        console.error(`Error fetching ${name} series`, err);
      }
    });
  }, []);
  function handleTvShowsImageClick(show, media_type) {
    props.onTvShowsImageClick(show, media_type);
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
    <div className=" my-lg-0 my-5 p-lg-0 p-1">f</div>
    <div className="bg-dark series-page text-white p-4   my-lg-0 my-5  ">
      {Object.entries(seriesByGenre).map(([genre, shows]) => (
        <div key={genre} className=" my-lg-5 my-5  ">
          <h2
        className="text-2xl text-white my-lg-0 my-5"
        style={{
          fontSize: "36px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: "41px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        {genre}
      </h2>
          <Slider {...settings}>
            {shows
              .filter((s) => s.poster_path)
              .map((show) => (
                <div className=" series-card">
                  <div className="p-2 image-container "
                    key={show.id}
                    onClick={() => handleTvShowsImageClick(show, "tv")}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                      alt={show.name}
                      className="img-fluid rounded series-image"
                    />
                    <div className=" series-overlay">
                      <div className=" text-center  series-title  ">{show.name}</div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ))}
    </div>
    </>
  );
}
