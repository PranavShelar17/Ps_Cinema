import axios, { Axios } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { RingLoader } from "react-spinners";

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import RingLoader from "react-spinners/RingLoader";

export default function MovieDetail(props) {
  // let { movieDataTrending } = props;
  let { moviedetail } = props;
  let [cast, setCast] = useState([]);
  let [detail, setDetail] = useState(null);
  let [flagLoader, setFlagLoader] = useState(false);
  console.log(moviedetail);

  // useEffect(() => {
  //   async function fetchCast() {
  //     if (moviedetail && moviedetail.length > 0) {
  //       let movieId = moviedetail[0].id;
  //       if (!movieId) return;
  //       let apiKey = "685e2f09bfed147ad18e97893e8a01ff";
  //       setFlagLoader(true);
  //       try {
  //         let response = await axios.get(
  //           `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  //         );
  //         setCast(response.data.cast);
  //       } catch (error) {
  //         console.error("Failed to fetch cast:", error);
  //       }
  //       setFlagLoader(false);
  //     }
  //   }
  //   fetchCast();
  // }, [moviedetail]);
  // useEffect(() => {
  //   async function fetchCast() {
  //     if (!moviedetail || moviedetail.length === 0) return;

  //     const { id, media_type } = moviedetail[0];
  //     if (!id || !media_type) return;

  //     const apiKey = "685e2f09bfed147ad18e97893e8a01ff";
  //     setFlagLoader(true);

  //     try {
  //       const response = await axios.get(
  //         `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}`
  //       );
  //       setCast(response.data.cast);
  //     } catch (error) {
  //       console.error("Failed to fetch cast:", error);
  //     }

  //     setFlagLoader(false);
  //   }

  //   fetchCast();
  // }, [moviedetail]);
  useEffect(() => {
    async function fetchData() {
      if (!moviedetail || moviedetail.length === 0) return;

      const { id, release_date, title } = moviedetail[0];
      if (!id) return;

      // Determine media_type based on presence of release_date or title
      const media_type = release_date || title ? "movie" : "tv";

      const apiKey = "685e2f09bfed147ad18e97893e8a01ff";
      setFlagLoader(true);

      try {
        const [creditsRes, detailsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&append_to_response=videos,watch/providers`)
        ]);
        setCast(creditsRes.data.cast);
        setDetail(detailsRes.data);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }

      setFlagLoader(false);
    }

    fetchData();
  }, [moviedetail]);


  if (flagLoader) {
    return (
      <div className="text-center my-5 p-5 pt-lg-0 pt-5 my-lg-0">
        <RingLoader size={50} color={"green"} />
      </div>
    );
  }

  function handleFavourite(e, mediatype) {
    console.log(e, mediatype);

    if (!e || !e.id) return;
    props.onFavourite(e, mediatype);
  }

  const movieObj = moviedetail && moviedetail[0] ? moviedetail[0] : {};
  const mediaType = movieObj.release_date || movieObj.title ? "movie" : "tv";
  const watchUrl = detail?.homepage || `https://www.google.com/search?q=Watch+${encodeURIComponent(movieObj.title || movieObj.name)}+online`;
  
  const trailer = detail?.videos?.results?.find(
    (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
  );
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  
  const providers = detail?.["watch/providers"]?.results;
  const findUrl = providers?.IN?.link || providers?.US?.link || `https://www.justwatch.com/us/search?q=${encodeURIComponent(movieObj.title || movieObj.name)}`;

  return (
    <>
      <div className=" my-lg-0 my-5 p-lg-0 p-5"></div>
      <div className="my-5  my-lg-0"></div>
      <div className="container-fluid p-0 my-0   my-lg-0">
        {Array.isArray(moviedetail) &&
          moviedetail.map((e) => (
            <div
              className="movie-detail-section  my-lg-0"
              key={e.id}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${e.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                position: "relative",
                padding: "60px 30px",
                minHeight: "100vh",
              }}
            >
              <div
                className="movie-detail-overlay row align-items-center"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <div className="col-md-3 d-flex justify-content-end p-3 position-relative">
                  <button
                    className="position-absolute wishlist-btn  "
                    onClick={() => handleFavourite(e, mediaType)}
                  >
                    <i className="bi bi-suit-heart-fill"></i>
                  </button>

                  <img
                    className="img-fluid rounded shadow"
                    src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                    alt={e.title}
                  />
                </div>
                <div className="col-md-9">
                  <h1>{e.title||e.name}</h1>
                  {e.release_date?(<p>
                    <strong>Release Date:</strong> {e.release_date}
                  </p>):""}
                  <p>
                    <strong>Rating:</strong> {e.vote_average}
                  </p>
                  <p>{e.overview}</p>
                  
                  {/* Watch & Find Action Buttons */}
                  <div className="mt-4 d-flex flex-wrap gap-3">
                    {watchUrl && (
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning btn-lg d-flex align-items-center gap-2 text-dark shadow-sm"
                        style={{ borderRadius: "30px", fontWeight: "600" }}
                      >
                        <i className="bi bi-play-fill" style={{ fontSize: "1.3rem" }}></i>
                        Watch Now
                      </a>
                    )}
                    {trailerUrl && (
                      <a
                        href={trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-lg d-flex align-items-center gap-2 shadow-sm"
                        style={{ borderRadius: "30px", fontWeight: "600" }}
                      >
                        <i className="bi bi-youtube" style={{ fontSize: "1.3rem", color: "#ff0000" }}></i>
                        Play Trailer
                      </a>
                    )}
                    {findUrl && (
                      <a
                        href={findUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-info btn-lg d-flex align-items-center gap-2 text-white shadow-sm"
                        style={{ borderRadius: "30px", fontWeight: "600", borderColor: "#0dcaf0" }}
                      >
                        <i className="bi bi-search" style={{ fontSize: "1rem" }}></i>
                        Where to Watch
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div
        className="container-fluid    "
        style={{
          backgroundColor: "#2a2a2f",
          position: "relative",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          color: "#d1d1d1",
          padding: "20px",
        }}
      >
        {cast?.length === 0 && <p>No cast information available.</p>}

        {cast?.length > 0 && (
          <>
            <h3 className="  mb-4" style={{ color: "#e0e0e0" }}>
              Cast
            </h3>
            <div className="row">
              {cast
                .slice(0, 10)
                .filter((e) => e.profile_path)
                .map((e, index) => (
                  <div
                    key={index}
                    className="col-5 col-sm-4 mx-lg-4 col-md-3 col-lg-2 text-center mx-2 my-2 rounded-5"
                    style={{
                      backgroundColor: "#242429",
                      border: "1px solid #3a3a42",
                      color: "#d1d1d1",
                      paddingBottom: "1rem",
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${e.profile_path}`}
                      alt={e.name}
                      className="img-fluid rounded-top-4"
                    />
                    <p className="mt-2 mb-1" style={{ color: "#f0f0f0" }}>
                      <strong>{e.name}</strong>
                    </p>
                    {/* <p
                      style={{ fontSize: "14px", color: "#b0b0b0", marginBottom: 0 }}
                    >
                      {e.character}
                    </p> */}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

{
  /* <div>
      <dialog ref={dialogRef}>
        <p>This is a dialog</p>
        <button onClick={() => dialogRef.current.close(`e`)}>Close</button>
      </dialog>
      <button onClick={() => dialogRef.current.showModal(`s`)}>Open Dialog</button>
    </div> */
}
{
  /* <div className="container">
    <div className="row" key={moviedetail.id}>
      <div className="col-3">
        <img
          className="img-fluid"
          src={`https://image.tmdb.org/t/p/w500${moviedetail.poster_path}`}
          alt={moviedetail.title}
        />
      </div>
      <div className="col-5">
        <h2>{moviedetail.title}</h2>
        <p><strong>Release Date:</strong> {moviedetail.release_date}</p>
        <p><strong>Rating:</strong> {moviedetail.vote_average}</p>
      </div>
      <div className="col-4">
        <p>{moviedetail.overview}</p>
      </div>
    </div>
  </div> */
}

{
  /* <div className="container">
      {moviedetail.map((e)=>{
        return (
        <div className="row" key={e.id}>
        <div className="col-3">{`https://image.tmdb.org/t/p/w500${e.poster_path}`}</div>
        <div className="col-5"></div>
        <div className="col-4"></div>
      </div>
      )})}
       <img  className=" img-fluid" src={} alt="" /> 
      
      </div> */
}
