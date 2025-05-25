
import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";

export default function WishList(props) {
  let [flagLoader, setFlagLoader] = useState(false);
  let [wishlistdata, setWishListData] = useState([]);

  let { wishlist } = props; // expecting array of movie IDs
  console.log(wishlist);

  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      setWishListData([]);
      return;
    }

    setFlagLoader(true);
    const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

    // Create an array of promises for each movie fetch
    const promises = wishlist.map(({ id, media_type }) =>
      axios
        .get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}`
        )

        .then((res) => res.data)
        .catch((err) => {
          console.error(`Failed to fetch movie ${media_type}${id}:`, err);
          return null; // skip this movie if error occurs
        })
    );

    Promise.all(promises).then((results) => {
      // Filter out any null responses (failed fetches)
      const filteredResults = results.filter((movie) => movie !== null);
      setWishListData(filteredResults);
      setFlagLoader(false);
    });
  }, [wishlist]);

  if (flagLoader) {
    return (
      <div className="text-center my-5 my-lg-3 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} />
      </div>
    );
  }

  if (wishlistdata.length === 0) {
    return (
      <div className="my-5 p-lg-5 p-5 text-center text-capitalize">
        <h1>Add wishlist movies first...</h1>
      </div>
    );
  }
  function handleWishListImgClick(WishM) {
    props.onWishListImgClick(WishM);
  }

  return (
    <>
    <div className=" my-lg-0 my-5 p-lg-0 p-4">f</div>
    <div
      style={{ minHeight: "100vh", background: "#2a2a2f" }}
      className="p-3  p-lg-0 my-lg-5 my-5 mx-lg-0 "
    >
      <div className="row">
        {wishlistdata.map((movie) => (
          <div
            key={movie.id}
            className="col-lg-2 col-md-4 col-sm-6 col-5 ps-lg-0   mx-lg-3 p-3 p-lg-3 mx-2 my-lg-5 my-3 mx-lg-2 text-center"
            style={{
              background: "#242429",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <img
              onClick={() => handleWishListImgClick(movie)}
              className="img-fluid mb-2 p-lg-2  p-2  m-0 m-lg-2 "
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}

            />
            <div className="title text-white">{movie.title||movie.name}</div>
            <div className="rating text-white">{movie.release_date}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
