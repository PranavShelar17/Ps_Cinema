import React from "react";
import MovieProduct from "./MovieProduct";

export default function MoviePage(props) {
  let { moviedata } = props;
  // console.log(moviedata);
  function handleImageClick(data) {
    props.onImageClick(data);
  }

  return (
    <>
      {/* <div className=" my-5 my-lg-4"></div> */}
      <div
        className="row radius d-flex         p-2     text-center"
        style={{ background: "linear-gradient(to right, #434343, #000000)" }}
      >
        {moviedata
          .filter((e) => e && e.poster_path)
          .map((e, index) => (
            <MovieProduct M={e} key={index} onImageClick={handleImageClick} />
          ))}
      </div>
    </>
  );
}
