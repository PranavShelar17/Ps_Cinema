import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import Navbar from "./Navbar";
import MovieProduct from "./MovieProduct";

import { RingLoader } from "react-spinners";
import axios from "axios";
import MoviePage from "./MoviePage";
import MovieDetail from "./MovieDetail";
import WishList from "./WishList";

import SignUpPage from "./SignUpPage";
import TrendingMoviesSlider from "./TrendingMoviesSlider";
import HorrorMoviesSlider from "./HorrorMoviesSlider";
import DramaMoviesSlider from "./DramaMoviesSlider";
import KidsMoviesSlider from "./KidsMoviesSlider";
import BollywoodMoviesSlider from "./BollywoodMoviesSlider";
import WarMoviesSlider from "./WarMoviesSlider";
import Webseries from "./Webseries";

export default function App() {
  let [moviedata, setMovieData] = useState([]);
  let [view, setView] = useState("Allmovies");
  let [previousView, setPreviousView] = useState("Allmovies");

  let [flagLoader, setFlagLoader] = useState(false);
  // let [movieDataTrending, setMovieDataTrending] = useState([]);
  let [searchMovieData, SetSearchData] = useState("");
  let [moviedetail, setMovieDetail] = useState([]);
  let [wishlist, setWishList] = useState([]);
  // let [favourites, setFavourites] = useState([]);
  const apiKey = "685e2f09bfed147ad18e97893e8a01ff";
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  //const auth = getAuth();
  //1e84da90

  useEffect(() => {
    async function fetchMovies(searchMovieData) {
      if (!searchMovieData) return;

      setFlagLoader(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovieData}`
        );

        if (response.data.results?.length > 0) {
          setMovieData(response.data.results);
          setView("moviepage");
        } else {
          setMovieData([]);
          setView("error");
        }
      } catch (err) {
        console.error("Search failed:", err);
        setView("error");
      }

      setFlagLoader(false);
    }

    fetchMovies(searchMovieData);
  }, [searchMovieData]);

  // useEffect(() => {
  //   async function mainMoviedata(movieDataStart) {
  //      setFlagLoader(true);
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
  //     );
  //     const data = await response.json();
  //    setMovieDataStart(data)
  //     //`https://www.omdbapi.com/?s=${searchMovieData}&apikey=${apiKey}`

  //      setFlagLoader(false);
  //   }
  //   mainMoviedata(movieDataStart)

  // }, )

  function handleImageClick(data) {
    setMovieDetail([data]);
    setPreviousView(view); 
    setView("detail");
  }
  if (flagLoader) {
    return (
      <div className="  text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} className="" />
      </div>
    );
  }

  function handleWishListClick() {
    setView("wishlist");
        setPreviousView(view); 

  }
  function handleSubmit(e) {
    SetSearchData(e);
    //console.log(e);
  }
  function handleLogoClick(name) {
    setView(name);
  }

  // function handleFavourite(movieId) {
  //   console.log(movieId);
  //   setWishList((prevFavourites) => {
  //     if (!prevFavourites.includes(movieId)) {
  //       return [...prevFavourites, movieId];
  //     }
  //     return prevFavourites;
  //   });

  //   // setWishList(ID);

  //   setView("wishlist");
  // }
  function handleFavourite(item, mediatype) {
  console.log(item, mediatype);

  setWishList((prevFavourites) => {
    const exists = prevFavourites.some((fav) => fav.id === item.id);
    if (!exists) {
      return [...prevFavourites, { ...item, media_type: mediatype }];
    }
    return prevFavourites;
  });

  // setView("wishlist");
}


  function handleTrendingImageClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleHorrorImageClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleDramaImageClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleKidsImageClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleBollywoodClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleMovieClick(movie) {
    setMovieDetail([movie]);
    setPreviousView(view); 
    setView("detail");
  }
  function handleBackSpace() {
    setView(previousView);
    // if (view === "") {
    //   setView("Allmovies");
    // } else {
    //   setView("webseries");
    // }
  }
  function handleWebSeriesClick() {
    setView("webseries");
  }
  function handleWishListImgClick(WishM) {
    setMovieDetail([WishM]);
    setView("detail");
  }
  function handleTvShowsImageClick(show, media_type) {
    //console.log(show, media_type);

    setMovieDetail([show], media_type);
    setPreviousView(view); 
    setView("detail");
  }

  return (
    <>
      <div className="  ">
        <div>
          <Navbar
            view={view}
            onSearch={handleSubmit}
            onLogoClick={handleLogoClick}
            onWishListClick={handleWishListClick}
            onBackSpace={handleBackSpace}
            // onRegisterClick={handleRegisterClick}
            onWebSeriesClick={handleWebSeriesClick}
            // onFormButtonClick={handleFormButtonClick}
            // onSignUpLogin={handleSignUpLogin}
            // onPopular={handlePopular}
            // onTop={handleTop}
            // onUpcoming={handleUpcoming}
          />
        </div>
        {view == "Allmovies" && (
          <>
            <div
              className="     text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <TrendingMoviesSlider
                onTrendingImageClick={handleTrendingImageClick}
              />
            </div>
            <div
              className="    text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <HorrorMoviesSlider onHorrorImageClick={handleHorrorImageClick} />
            </div>
            <div
              className="    text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <BollywoodMoviesSlider
                onBollywoodImageClick={handleBollywoodClick}
              />
            </div>
            <div
              className="    text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <WarMoviesSlider onMovieClick={handleMovieClick} />
            </div>
            <div
              className="    text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <DramaMoviesSlider onDramaImageClick={handleDramaImageClick} />
            </div>
            <div
              className="    text-white"
              style={{
                background: "linear-gradient(to right, #434343, #000000)",
              }}
            >
              <KidsMoviesSlider onKidsImageClick={handleKidsImageClick} />
            </div>
          </>
        )}
        {view == "moviepage" && (
          <>
            {" "}
            <div className="">
              <MoviePage
                moviedata={moviedata}
                onImageClick={handleImageClick}
              />
            </div>
          </>
        )}
      </div>
      {view == "error" && (
        <div style={{ textAlign: "center", padding: "310px" }}>
          <img
            className=" img-fluid"
            src="/3737258.jpg"
            alt="Error"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
          <h1>Oops! Something went wrong.</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      )}
      {view == "webseries" && (
        <div
          className="    text-white"
          style={{
            background: "linear-gradient(to right, #434343, #000000)",
          }}
        >
          <Webseries onTvShowsImageClick={handleTvShowsImageClick} />
        </div>
      )}
      {view == "detail" && (
        <div>
          <MovieDetail
            moviedetail={moviedetail}
            // movieDataTrending={movieDataTrending}
            onFavourite={handleFavourite}
          />
        </div>
      )}

      {view == "wishlist" && (
        <WishList
          wishlist={wishlist}
          onWishListImgClick={handleWishListImgClick}
        />
      )}
      {/* {view == "SignUp" && (
              <div className="productbg">
                <SignUpPage
                  view={view}
                  signupstatus={signupstatus}
                  onFormButtonClick={handleFormButtonClick}
                  onSignUpFormSubmit={handleSignUpFormSubmit}
                  onLoginClick={handleLoginClick}
                />
              </div>
            )} */}
      {/* {view == "Login" && (
                    <div className=" text-white productbg">
                      <Login

                        user={user}
                        view={view}
                        loginStatus={loginStatus}
                        onClick={handleFormButtonClick}
                        onLoginFormSubmit={handleLoginFormSubmit}
                        onLoginClick={handleLoginClick}
                      />
                    </div>
                  )} */}
    </>
  );
}
{
  /* <MovieProduct moviedata={moviedata}/> */
  //`https://www.omdbapi.com/?s=${searchMovieData}&apikey=${apiKey}`
  //`https://api.themoviedb.org/3/movie/${searchMovieData}/credits?api_key=685e2f09bfed147ad18e97893e8a01ff&language=en-US`
}
