import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./Navbar";
import MovieProduct from "./MovieProduct";

import { RingLoader } from "react-spinners";
import axios from "axios";
import MoviePage from "./MoviePage";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ShoppingCart, Star } from "lucide-react";

export default function App() {
  let [moviedata, setMovieData] = useState([]);
  let [view, setView] = useState("moviepage");
  let [flagLoader, setFlagLoader] = useState(false);
  let [searchMovieData, SetSearchData] = useState("avengers");
  const apiKey = "1e84da90";

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
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchMovieData}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovieData(data.Search);
        console.log(data.Search);
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
  if (flagLoader) {
    return (
      <div className="  text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} className="" />
      </div>
    );
  }
  function handleSubmit(e) {
    SetSearchData(e);
    console.log(e);
  }

  return (
    <>
      <div className="clr ">
        <div>
          <Navbar onSearch={handleSubmit} />
        </div>
        {view == "moviepage" && (
          <div className="">
            <MoviePage moviedata={moviedata} />
          </div>
        )}
      </div>
      {view == "error" && (
        <div style={{ textAlign: "center", padding: "300px" }}>
          <img className=" img-fluid"
            src="public/3737258.jpg"
            alt="Error"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
          <h1>Oops! Something went wrong.</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      )}
    </>
  );
}
{
  /* <MovieProduct moviedata={moviedata}/> */
}
