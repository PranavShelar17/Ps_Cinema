import React from "react";
import MovieProduct from "./MovieProduct";

export default function MoviePage(props) {
  let { moviedata } = props;
 // console.log(moviedata);

  return (
    <>
    <div className=" my-5 my-lg-4"></div>
    <div
      className='row radius d-flex justify-content-center
       p-2 m-lg-3  m-2   text-center' style={{background:"#444444"}}
    >
      {moviedata.map((e, index) => (
        <MovieProduct M={e} key={index} />
      ))}
    </div>
    </>
  );
}
