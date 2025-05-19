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
import { Navigate } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import TrendingMoviesSlider from "./TrendingMoviesSlider";
import HorrorMoviesSlider from "./HorrorMoviesSlider";
import DramaMoviesSlider from "./DramaMoviesSlider";
import KidsMoviesSlider from "./KidsMoviesSlider";
import BollywoodMoviesSlider from "./BollywoodMoviesSlider";
import WarMoviesSlider from "./WarMoviesSlider";
import Webseries from "./Webseries";
//import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ShoppingCart, Star } from "lucide-react";

export default function App() {
  let [moviedata, setMovieData] = useState([]);
  let [view, setView] = useState("Allmovies");
  let [flagLoader, setFlagLoader] = useState(false);
  // let [movieDataTrending, setMovieDataTrending] = useState([]);
  let [searchMovieData, SetSearchData] = useState("game");
  let [moviedetail, setMovieDetail] = useState([]);
  let [wishlist, setWishList] = useState([]);
  // let [favourites, setFavourites] = useState([]);
  const apiKey = "685e2f09bfed147ad18e97893e8a01ff";
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  //const auth = getAuth();
  //1e84da90

  // useEffect(() => {
  //   // Fetching popular movies from TMDb API
  //   setFlagLoader(true)

  //     let res=axios.get(`https://www.omdbapi.com/?s=Avengers&apikey=${apiKey}`)
  //     setMovieData(res)

  //   setFlagLoader(false)
  //   console.log(moviedata);

  // }, []);
  useEffect(() => {
    async function fetchMovies(searchMovieData) {
      setFlagLoader(true);

      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovieData}`
      );
      const Data = response.data;
      //`https://www.omdbapi.com/?s=${searchMovieData}&apikey=${apiKey}`

      if (Data.results && Data.results.length > 0) {
        setMovieData(Data.results);
        // console.log(data.results);
      } else {
        setMovieData([]);
        console.log("No movies found");
      }
      setFlagLoader(false);
    }

    // Call the function inside useEffect
    if (searchMovieData) {
      fetchMovies(searchMovieData);
      setView("moviepage");
    } else {
      setFlagLoader(true);
      setView("error");
      setFlagLoader(false);
    }

    // fetchMovies(searchMovieData);
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
    setView("detail");
  }
  if (flagLoader) {
    return (
      <div className="  text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} className="" />
      </div>
    );
  }
  function handleRegisterClick() {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     console.log(user);
    //     //  let usr = { user };
    //     // usr.name = user.displayName;
    //     // usr.emailid = user.email;
    //     // if (usr.emailid == "mankarsiddhesh732@gmail.com") {
    //     //   usr.role = "admin";
    //     //    setView("moviepage");
    //     //   // setLoginStatus("success");
    //     // } else {
    //     //   usr.role = "user";
    //     //   setView("moviedetail");
    //     //  // setLoginStatus("success");
    //     // }
    //     // setUser(usr);
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Logged in as:", user.displayName);

        // Optional: Save user info in localStorage
        //localStorage.setItem("user", JSON.stringify(user));

        // Navigate to dashboard or homepage
        Navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Google sign-in failed:", error.message);
        alert("Google sign-in failed. Please try again.");
      });
  }
  function handleWishListClick() {
    setView("wishlist");
  }
  function handleSubmit(e) {
    SetSearchData(e);
    //console.log(e);
  }
  function handleLogoClick(name) {
    setView(name);
  }

  // async function handleTop() {
  //   setFlagLoader(true);
  //   let res = await fetch(
  //     `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  //   );
  //   let list = res.data;
  //   console.log(list);
  //   setFlagLoader(false);
  // }
  // async function handleUpcoming() {

  // }
  // async function handlePopular() {

  // }
  function handleFavourite(movieId) {
    console.log(movieId);
    setWishList((prevFavourites) => {
      if (!prevFavourites.includes(movieId)) {
        return [...prevFavourites, movieId];
      }
      return prevFavourites;
    });

    // setWishList(ID);

    setView("wishlist");
  }
  function handleTrendingImageClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleHorrorImageClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleDramaImageClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleKidsImageClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleBollywoodClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleMovieClick(movie) {
    setMovieDetail([movie]);
    setView("detail");
  }
  function handleBackSpace() {
    setView("Allmovies");
  }
  function handleWebSeriesClick() {
    setView("webseries")
    
  }
  function handleWishListImgClick(WishM) {
    setMovieDetail([WishM]);
    setView("detail");
  }
  function handleTvShowsImageClick(tvshow) {
     setMovieDetail([tvshow]);
    setView("detail");
  }
  // function handleSignUpFormSubmit(event) {
  //   let formData = new FormData(event.target);
  //   let user = {};
  //   for (let data of formData) {
  //     user[data[0]] = data[1];
  //   }
  //   user["role"] = "user";
  //   console.log(user);
  //   checkUserExists(user);
  //   // setView("productPage");
  //   // if ((user["role"] = "admin")) {
  //   //   setView("adminPage");

  //   // }
  // }
  // async function checkUserExists(user) {
  //   // let response = await axios("http://localhost:3000/users");
  //   let userlist= await getUserFromBackend()
  //   let data =  userlist
  //   let filteredData = data.filter((e, index) => e.email == user.email);
  //   if (filteredData.length >= 1) {
  //     console.log("Already Exists");
  //     setTimeout(() => {
  //       setSignupStatus("");
  //       setView("productPage");
  //     }, 1000);
  //     setSignupStatus("failed");

  //     // setMessage("Sorry... This email-id is already registered.");
  //   } else {
  //     console.log("new user");
  //     addUser(user);
  //     // addDataToServer(user)
  //   }
  // }
  // async function addUser(user) {
  //   // let response = await axios.post("http://localhost:3000/users", user);
  //   let response=await addUserToBackend(user)
  //   setUser(response)
  //   setSignupStatus("success");
  // }
  //Login Operation
  // function handleLoginFormSubmit(event) {
  //   let formData = new FormData(event.target);
  //   let userData = {};
  //   for (let data of formData) {
  //     userData[data[0]] = data[1];
  //   }
  //   console.log("ok... logged in");
  //   console.log(userData);
  //   checkUser(userData);
  // }
  // async function checkUser(userData) {
  //   setFlagLoader(true);
  //   // let response = await axios("http://localhost:3000/users");
  //   let userdata= await getUserFromBackend()
  //   let data =  userdata;
  //   let filteredData = data.filter(
  //     (e, index) => e.email == userData.email && e.password == userData.password
  //   );
  //   setFlagLoader(false);
  //   if (filteredData.length == 1) {
  //     setUser(filteredData[0]);
  //     let u = filteredData[0];
  //     localStorage.setItem("user", JSON.stringify(filteredData[0]));
  //     localStorage.setItem("loginStatus", "success");
  //     if (u.role == "user") {
  //       setLoginStatus("success");
  //       setTimeout(() => {
  //         // name = u.name;
  //         setName(u.name);
  //         setView("productPage");
  //       }, 2000);
  //     } else if (u.role == "admin") {
  //       setLoginStatus("success");
  //       setTimeout(() => {
  //         // name=u.name
  //         setName(u.name);
  //         setView("admin");
  //       }, 2000);
  //     }
  //     // addDataToServer(user)
  //     // setSuccessMessage(true);

  //     // setTimeout(() => {
  //     //   setSuccessMessage(false);
  //     //   console.log("Login Successful");
  //     //   setTimeout(() => {
  //     //     setView("productPage");
  //     //   }, 1000);
  //     // }, 1000);
  //   } else {
  //     setLoginStatus("failed");
  //     setView("Login");
  //     setTimeout(() => {
  //       setLoginStatus("");
  //     }, 1000);
  //   }
  // }
  // function handleFormButtonClick(v) {
  //   setView(v)

  // }

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
            onRegisterClick={handleRegisterClick}
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
              className="    text-white"
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
